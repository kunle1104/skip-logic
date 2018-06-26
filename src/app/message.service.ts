import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();
    private rules: any;

    sendMessage(message: any) {
        this.subject.next(message );
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    sendRules(rules:any){
       this.rules = rules;
       console.log("Gotten rules are :", rules);
       console.log("Rules in service are:", rules);
    }
    getRules():any{
       return this.rules;
    }
  }
