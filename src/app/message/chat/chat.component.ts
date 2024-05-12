import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScrollToBottomDirective } from 'src/app/directive/scroll-to-bottom.directive';
import {
  Conversation,
  Message,
  Participant,
} from 'src/app/models/conversation';
import { UserInfo } from 'src/app/models/profile';
import { ConversationService } from 'src/app/services/api/conversation.service';
import { MessageService } from 'src/app/services/api/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { StompService } from 'src/app/services/ws/stomp.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() markAsRead: EventEmitter<void> = new EventEmitter<void>();
  @Output() sendMessage: EventEmitter<void> = new EventEmitter<void>();
  @Input() conversationId!: string;
  friendInfo: UserInfo | undefined;
  listMessages: Message[] = [];
  currentUser: UserInfo | undefined;
  chatForm!: FormGroup;

  @ViewChild(ScrollToBottomDirective)
  scroll!: ScrollToBottomDirective;

  constructor(
    private showToast: ToastService,
    private authService: AuthService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private stompService: StompService
  ) {}

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      message: [''],
    });
    this.stompService.connect().then(() => {
      this.stompService.initializeTopicSubscription(
        '/topic/chat',
        (message: Message) => {
          if (message.conversationId === this.conversationId) {
            this.listMessages.push(message);
          }
          this.sendMessage.emit();
        }
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversationId'] && !changes['conversationId'].firstChange) {
      this.loadConversationById(this.conversationId);
    }
  }

  loadConversationById(id: string): void {
    this.conversationService.getConversationById(id).subscribe({
      next: (response: Conversation) => {
        // Get current user info
        const currentUser: UserInfo =
          this.authService.getUserData() as UserInfo;
        this.currentUser = currentUser;

        // Get friend info and list of messages
        const friend = response.participants.find(
          (participant: Participant) => participant.user.id !== currentUser.id
        );
        this.friendInfo = friend?.user;
        this.listMessages = response.messages;

        // Mark all messages as read
        const unRead = response.messages.filter(
          (message: Message) =>
            message.sender.id !== currentUser.id && !message.isRead
        );
        if (unRead.length > 0) {
          const listMessageIds = unRead.map((message) => message.id);

          this.messageService.markAsRead(listMessageIds).subscribe({
            next: () => {
              this.markAsRead.emit();
            },
            error: (response) => {
              this.showToast.showErrorMessage(
                'Error',
                response.error?.message ||
                  'Something went wrong. Please try again later'
              );
            },
          });
        }
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
    });
  }

  toggleMenu() {
    this.toggle.emit();
  }

  submit(): void {
    if (this.chatForm.value.message === '') {
      return;
    }

    this.messageService
      .sendMessage(this.conversationId, this.chatForm.value.message, null)
      .subscribe({
        next: () => {
          this.chatForm.reset();
        },
        error: (response) => {
          this.showToast.showErrorMessage(
            'Error',
            response.error?.message ||
              'Something went wrong. Please try again later'
          );
        },
      });
  }
}
