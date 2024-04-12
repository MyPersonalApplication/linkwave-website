import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import {
  AuthenticationGuard,
  UnAuthenticationGuard,
} from './services/active.guard';
import { TimelineComponent } from './profile/timeline/timeline.component';
import { AboutComponent } from './profile/about/about.component';
import { PhotoComponent } from './profile/photo/photo.component';
import { FriendComponent } from './profile/friend/friend.component';
import { MoreComponent } from './profile/more/more.component';
import { RecommendComponent } from './friend/recommend/recommend.component';
import { RequestComponent } from './friend/request/request.component';
import { UserFriendComponent } from './friend/friend.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'friend',
        title: 'Friend Request',
        canActivate: [AuthenticationGuard],
        children: [
          {
            path: '',
            component: UserFriendComponent,
            title: 'Friends',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'request',
            component: RequestComponent,
            title: 'Friend Request',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'recommend',
            component: RecommendComponent,
            title: 'Recommend',
            canActivate: [AuthenticationGuard],
          },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthenticationGuard],
        children: [
          { path: '', redirectTo: 'timeline', pathMatch: 'full' },
          {
            path: 'timeline',
            component: TimelineComponent,
            title: 'Timeline',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'about',
            component: AboutComponent,
            title: 'About',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'photos',
            component: PhotoComponent,
            title: 'Photos',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'friends',
            component: FriendComponent,
            title: 'Friends',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'more',
            component: MoreComponent,
            title: 'More',
            canActivate: [AuthenticationGuard],
          },
        ],
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        title: 'Profile',
        canActivate: [AuthenticationGuard],
        children: [
          { path: '', redirectTo: 'timeline', pathMatch: 'full' },
          {
            path: 'timeline',
            component: TimelineComponent,
            title: 'Timeline',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'about',
            component: AboutComponent,
            title: 'About',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'photos',
            component: PhotoComponent,
            title: 'Photos',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'friends',
            component: FriendComponent,
            title: 'Friends',
            canActivate: [AuthenticationGuard],
          },
          {
            path: 'more',
            component: MoreComponent,
            title: 'More',
            canActivate: [AuthenticationGuard],
          },
        ],
      },
      {
        path: 'message',
        component: MessageComponent,
        title: 'Messager',
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'notification',
        component: NotificationComponent,
        title: 'Notification',
        canActivate: [AuthenticationGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
        canActivate: [UnAuthenticationGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
        canActivate: [UnAuthenticationGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
