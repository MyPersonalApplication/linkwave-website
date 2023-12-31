import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './mat-ui/mat-ui.module';
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { FullComponent } from './layouts/full/full.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    AuthenticationComponent,
    FullComponent,
    ProfileComponent,
    FriendRequestComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
