import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons,  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../message.service';
import { RatingValidator} from './rating-validator';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  //providers: [ NgbActiveModal ]
})
export class QuestionsComponent implements OnInit {
  show = { //object to control display of questions 1=show, 0=hide
    q1 : 1,   //question1
    q2 : 0,   //question2
    q3 : 0,   //question3
    q4 : 0    // queston4
  };
  q1Form: FormGroup; //question 1 form
  q2Form: FormGroup; //question 2 form
  q3Form: FormGroup; //question 3 form
  q4Form: FormGroup; //question 4 form

  //ctrl = new FormControl(null, Validators.required);
  currentRate = 0;

  closeResult: string;
  modalReference: any | undefined;
  modalMessage = {
     body: "",
     close: "",
     route:""
  };
  rules:any;
  //message: any;
  //subscription: Subscription;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.rules = new Array(this.messageService.getRules());

    this.q1Form = this.formBuilder.group({ //question 1 formbuilder
        question1: ['', Validators.required]
    });
    this.q2Form = this.formBuilder.group({ //question 2 formbuilder
        question2: ['', Validators.required]
    });
    this.q3Form = this.formBuilder.group({ //question 3 formbuilder
        question3_1: ['', Validators.required],
        question3_2: ['', Validators.required],
        question3_3: ['', Validators.required],
        question3_4: ['', Validators.required]
    });
    this.q4Form = this.formBuilder.group({ //question 4 formbuilder
        question4: ['', [Validators.required]]
    });
  }

  open(content) { //open ngb modal dialog
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string { // get ngb modal dismiss reason
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  beforeDismiss(){ // before dismiss modal
    this.router.navigate([this.modalMessage.route]);
    return true;
  }
  onCloseModal(v){ //on close ngb modal
    this.modalReference.close();
    this.router.navigate([this.modalMessage.route]);
  }
  endSurvey(c){
     //console.log("You are 18 to 24 years old");
     this.modalMessage.body = "Your age group is not allowed to take this survey.";
     this.modalMessage.close = "This survey will now close. Thank you.";
     this.modalMessage.route = "/";
     this.open(c);
  }
  disqualified(c){
     //console.log("You are 25 to 34 years old");
     this.modalMessage.body = "Sorry, you are disqualified from taking this survey.";
     this.modalMessage.close = "You will be redirected to the disqualification page.";
     this.modalMessage.route = "/disqualified";
     this.open(c);
  }
  gotoQ2(){
     //console.log("You are 35 to 44 years old");
     this.show.q1 = 0;
     this.show.q2 = 1;
     this.show.q3 = 0;
     this.show.q4 = 0;
  }
  gotoQ3(){
     //console.log("You are 55 years old or older");
     this.show.q1 = 0;
     this.show.q2 = 0;
     this.show.q3 = 1;
     this.show.q4 = 0;
  }
  gotoQ4(){
     //console.log(this.q3Form.value);
     this.show.q1 = 0;
     this.show.q2 = 0;
     this.show.q3 = 0;
     this.show.q4 = 1;
  }
 onSubmitQ1(c){ // form 1 (Q1) handler, controls skip logic

      if(this.rules[0] == null){
         this.gotoQ2();
      }else {
      if(this.q1Form.value.question1 === "option1"){
          if(this.rules[0][0].option1 === "0"){ this.gotoQ2() }
          else if (this.rules[0][0].option1 === "1"){ this.gotoQ3() }
          else if (this.rules[0][0].option1 === "2"){ this.gotoQ4() }
          else if (this.rules[0][0].option1 === "3"){ this.endSurvey(c) }
          else { this.disqualified(c) }
      }else if(this.q1Form.value.question1 === "option2"){
        if(this.rules[0][0].option2 === "0"){ this.gotoQ2() }
        else if (this.rules[0][0].option2 === "1"){ this.gotoQ3() }
        else if (this.rules[0][0].option2 === "2"){ this.gotoQ4() }
        else if (this.rules[0][0].option2 === "3"){ this.endSurvey(c) }
        else  { this.disqualified(c) }
      }else if(this.q1Form.value.question1 === "option3"){
        if(this.rules[0][0].option3 === "0"){ this.gotoQ2() }
        else if (this.rules[0][0].option3 === "1"){ this.gotoQ3() }
        else if (this.rules[0][0].option3 === "2"){ this.gotoQ4() }
        else if (this.rules[0][0].option3 === "3"){ this.endSurvey(c) }
        else { this.disqualified(c) }
      }else if(this.q1Form.value.question1 === "option4"){
        if(this.rules[0][0].option4 === "0"){ this.gotoQ2() }
        else if (this.rules[0][0].option4 === "1"){ this.gotoQ3() }
        else if (this.rules[0][0].option4 === "2"){ this.gotoQ4() }
        else if (this.rules[0][0].option4 === "3"){ this.endSurvey(c) }
        else { this.disqualified(c) }
      }else { // goto question 3
        if(this.rules[0][0].option5 === "0"){ this.gotoQ2() }
        else if (this.rules[0][0].option5 === "1"){ this.gotoQ3() }
        else if (this.rules[0][0].option5 === "2"){ this.gotoQ4() }
        else if (this.rules[0][0].option5 === "3"){ this.endSurvey(c) }
        else { this.disqualified(c) }
      }
    }
  }
  onSubmitQ2(c){ // form 2 (Q2) handler, goto question 3
    if(this.rules[0] == null){
       this.gotoQ3();
    }else {
    if(this.q2Form.value.question2 === "option1"){
        if(this.rules[0][1].option1 === "0"){ this.gotoQ3() }
        else if (this.rules[0][1].option1 === "1"){ this.gotoQ4() }
        else if (this.rules[0][1].option1 === "2"){ this.endSurvey(c) }
        else { this.disqualified(c) }
    }else if(this.q2Form.value.question2 === "option2"){
        if(this.rules[0][1].option2 === "0"){ this.gotoQ3() }
        else if (this.rules[0][1].option2 === "1"){ this.gotoQ4() }
        else if (this.rules[0][1].option2 === "2"){ this.endSurvey(c) }
        else { this.disqualified(c) }
    }else{
        if(this.rules[0][1].option3 === "0"){ this.gotoQ3() }
        else if (this.rules[0][1].option3 === "1"){ this.gotoQ4() }
        else if (this.rules[0][1].option3 === "2"){ this.endSurvey(c) }
        else { this.disqualified(c) }
    }
   }    //this.gotoQ3();
  }
  onSubmitQ3(c){ // form 3 (Q3) handler, goto question 4
      this.gotoQ4();
  }
  onSubmitQ4(c){ // form 4 (Q4) handler, back home
      
      this.modalMessage.body = "You have come to the end of the survey.";
      this.modalMessage.close = "Thank you for participating.";
      this.modalMessage.route = "/";
      this.open(c);
  }

}
