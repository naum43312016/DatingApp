import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertyifyService } from '../_services/alertyify.service';
import { error } from 'protractor';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(private userService: UserService,private authService: AuthService,
    private route: ActivatedRoute,private alertify: AlertyifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages(){
    this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pagination.currentPage,this.pagination.itemsPerPage,this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        console.log(res);
        this.messages = res.result;
        this.pagination = res.pagination;
      },error => {
        this.alertify.error(error);
      });
  }

  deleteMesage(id:number){
    this.alertify.confirm('Are you sure?',() =>{
      this.userService.deleteMessage(id,this.authService.decodedToken.nameid)
      .subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id===id),1);
        this.alertify.success('Message has been deleted');
      },error => {
        this.alertify.error('Failed to delete message');
      });
    });
  }

  pageChanged(event: any) :void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
