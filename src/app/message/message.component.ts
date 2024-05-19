import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { ConversationService } from '../services/api/conversation.service';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../models/profile';
import { Conversation, Message, Participant } from '../models/conversation';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageComponent } from '../component/dialog/new-message/new-message.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  isMenuToggled: boolean = false;
  listConversations: any = [];
  conversationId: string = '';
  isLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private showToast: ToastService,
    private conversationService: ConversationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.loadConversations(id);
    });
  }

  changeLoadingState() {
    this.isLoading = !this.isLoading;
  }

  loadConversations(conversationId: string | undefined): void {
    this.changeLoadingState();
    this.conversationService.getConversationList().subscribe({
      next: (response: Conversation[]) => {
        const currentUser: UserInfo =
          this.authService.getUserData() as UserInfo;

        response = response.filter(
          (conversation: any) => conversation.messages.length > 0
        );

        const conversations = response.map((conversation: any) => {
          const friend = conversation.participants.find(
            (participant: Participant) => participant.user.id !== currentUser.id
          );

          const lastMessage =
            conversation.messages[conversation.messages.length - 1] || {};

          return {
            id: conversation.id,
            name: friend.user.firstName + ' ' + friend.user.lastName,
            avatarUrl: friend.user.avatar?.imageUrl,
            lastMessage: lastMessage?.content,
            lastMessageTime: lastMessage.createdAt,
            unreadCount: conversation.messages.filter(
              (message: Message) =>
                message.sender.id !== currentUser.id && !message.isRead
            ),
          };
        });
        this.listConversations = conversations;

        if (conversationId) {
          this.conversationId = conversationId;
          return;
        }

        if (this.conversationId === '' && conversations.length > 0) {
          this.conversationId = conversations[0].id;
        }
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
      complete: () => {
        this.changeLoadingState();
      },
    });
  }

  toggleMenu(): void {
    this.isMenuToggled = !this.isMenuToggled;
  }

  handleChat(conversationId: string): void {
    this.conversationId = conversationId;
    this.isMenuToggled = false;
  }

  newMessage() {
    const dialogRef = this.dialog.open(NewMessageComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleMessage(result);
      }
    });
  }

  handleMessage(friendId: string | undefined) {
    if (!friendId) {
      return;
    }
    this.conversationService.createConversation(friendId).subscribe({
      next: (response) => {
        this.router.navigate(['/message'], {
          queryParams: { id: response.id },
        });
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
