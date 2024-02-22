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
import { NotificationComponent } from './notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiInterceptor } from './helpers/api-interceptor';
import { PageLikeComponent } from './component/card/page-like/page-like.component';
import { RecentNotificationsComponent } from './component/card/recent-notifications/recent-notifications.component';
import { FriendsZoneComponent } from './component/card/friends-zone/friends-zone.component';
import { CardProfileComponent } from './component/card/profile/profile.component';
import { CardPostComponent } from './component/card/post/post.component';
import { PostComponent } from './component/dialog/post/post.component';
import { VideoPlayerComponent } from './component/video-player/video-player.component';
import { TimelineComponent } from './profile/timeline/timeline.component';
import { AboutComponent } from './profile/about/about.component';
import { PhotoComponent } from './profile/photo/photo.component';
import { FriendComponent } from './profile/friend/friend.component';
import { MoreComponent } from './profile/more/more.component';
import { SettingComponent } from './profile/setting/setting.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AboutMeComponent } from './component/dialog/about-me/about-me.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    NotificationComponent,
    CardProfileComponent,
    CardPostComponent,
    PageLikeComponent,
    RecentNotificationsComponent,
    FriendsZoneComponent,
    PostComponent,
    VideoPlayerComponent,
    TimelineComponent,
    AboutComponent,
    PhotoComponent,
    FriendComponent,
    MoreComponent,
    SettingComponent,
    AboutMeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxSkeletonLoaderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
