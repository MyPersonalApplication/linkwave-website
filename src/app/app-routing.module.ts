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

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'friend-request',
        component: FriendRequestComponent,
        title: 'Friend Request',
      },
      { path: 'profile/:id', component: ProfileComponent, title: 'Profile' },
      { path: 'message', component: MessageComponent, title: 'Messager' },
    ],
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
