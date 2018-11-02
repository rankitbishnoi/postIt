import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { PostComponent } from './home/post/post.component';
import { HomeResolver } from './home/home.resolver';
import { PostResolver } from './home/post/post.resolver';
import { EditPostComponent } from './home/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { list: HomeResolver },
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'createPost', component: CreatePostComponent },
      {
        path: 'editPost/:id',
        component: EditPostComponent,
        resolve: { post: PostResolver },
        runGuardsAndResolvers: 'paramsChange'
      },
      {
        path: 'post/:id',
        component: PostComponent,
        resolve: { post: PostResolver },
        runGuardsAndResolvers: 'paramsChange'
      },
      { path: '', redirectTo: 'createPost', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
