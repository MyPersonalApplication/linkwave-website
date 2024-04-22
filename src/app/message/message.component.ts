import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { ConversationService } from '../services/api/conversation.service';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../models/profile';
import { Conversation, Message, Participant } from '../models/conversation';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  isMenuToggled: boolean = false;
  listConversations: any = [];
  conversationId: string = '';

  constructor(
    private showToast: ToastService,
    private conversationService: ConversationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.loadConversations(id);
    });
  }

  loadConversations(conversationId: string | undefined): void {
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
    });
  }

  toggleMenu(): void {
    this.isMenuToggled = !this.isMenuToggled;
  }

  handleChat(conversationId: string): void {
    this.conversationId = conversationId;
    this.isMenuToggled = false;
  }
}
