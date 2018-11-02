import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './home/post/post.component';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { AppRoutingModule } from './appRouting.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostService } from './home/services/post/post.service';
import { UserService } from './home/services/user/user.service';
import { StoreService } from './home/store/store.service';
import { HomeResolver } from './home/home.resolver';
import { PostResolver } from './home/post/post.resolver';
import { GetAuthorNamePipe } from '../pipe/getAuthorName.pipe';
import { PostFormComponent } from './home/post-form/post-form.component';
import { EditPostComponent } from './home/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    EditPostComponent,
    PostFormComponent,
    CreatePostComponent,
    GetAuthorNamePipe
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    PostService,
    UserService,
    StoreService,
    HomeResolver,
    PostResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
