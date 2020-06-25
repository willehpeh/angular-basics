import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list/message-list.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { SharedModule } from '../shared/shared.module';
import { MessagesRoutingModule } from './messages-routing.module';



@NgModule({
  declarations: [
    MessageListComponent,
    NewMessageComponent],
  imports: [
    MessagesRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class MessagesModule { }
