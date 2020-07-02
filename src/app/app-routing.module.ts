import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  // { path: 'login', module: AuthModule },
  { path: 'posts', canActivate: [AuthGuard], loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) },
  { path: 'messages', canActivate: [AuthGuard], loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule) },
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  { path: '**', component: FourOhFourComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
