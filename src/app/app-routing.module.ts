import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import {
  AuthenticationGuard,
  UnAuthenticationGuard,
} from './services/active.guard';

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
        path: 'friend-request',
        component: FriendRequestComponent,
        title: 'Friend Request',
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        title: 'Profile',
        canActivate: [AuthenticationGuard],
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
