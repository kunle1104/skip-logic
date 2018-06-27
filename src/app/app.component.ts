import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message: any;
  subscription: Subscription;

  constructor( private messageService: MessageService) { }

  ngOnInit() {
     this.subscription = this.messageService.getMessage()
       .subscribe(message => {
         this.message = message;
         this.messageService.sendRules(this.message);
     });
  }

  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();

  }
}
