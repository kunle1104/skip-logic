import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons,  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-set-logic',
  templateUrl: './set-logic.component.html',
  styleUrls: ['./set-logic.component.css']
})
export class SetLogicComponent implements OnInit {
  show = { //object to control disabling and enabling of questions 1=show, 0=hide
    q1 : 1,   //question1
    q2 : 0,   //question2
    q3 : 0,   //question3
    q4 : 0    // queston4
  };
  q3Extended = false;
  display = { //object to control display of clicked questions
    q1 : 1,
    q2 : 0,
    q3 : 0,
    q3_1 : 0,
    q3_2 : 0,
    q3_3 : 0,
    q4 : 0
  };
  question1 = ["18 - 24", "25 - 34", "35 - 44", "45 - 54", "over 55"];
  values1 = ["", "0", "1", "2", "3", "4", "5"]; //values for question 1
  q1Progress = [0,0,0,0,0];
  submitted1 = { //submitted logic for question 1 -- initially empty
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
  };
  question2 = ["Social Worker 1", "Social Worker 2", "Social Worker 3"];
  values2 = ["", "0", "1", "2"]; //values for question 1
  q2Progress = [0,0,0];
  submitted2 = { //submitted logic for question 2 -- initially empty
    option1: "",
    option2: "",
    option3: "",
  };
  question3_1 = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
  values3_1 = ["", "0", "1", "2", "3", "4", "5"]; //values for question 1
  q3_1Progress = [0,0,0,0,0];
  submitted3_1 = { //submitted logic for question 3.1 -- initially empty
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
  }
  question3_2 = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
  values3_2 = ["", "0", "1", "2", "3", "4", "5"]; //values for question 1
  q3_2Progress = [0,0,0,0,0];
  submitted3_2 = { //submitted logic for question 3.1 -- initially empty
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
  }
  question3_3 = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
  values3_3 = ["", "0", "1", "2", "3", "4", "5"]; //values for question 1
  q3_3Progress = [0,0,0,0,0];
  submitted3_3 = { //submitted logic for question 3.1 -- initially empty
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
  }

  q1LogicForm: FormGroup; //question 1 form
  q2LogicForm: FormGroup; //question 2 form
  q3_1LogicForm: FormGroup; //question 3.1 form
  q3_2LogicForm: FormGroup; //question 3.2 form
  q3_3LogicForm: FormGroup; //question 3.3 form
  q4LogicForm: FormGroup; //question 4 form

  closeResult: string;
  modalReference: any;

  logicButton = "Set Skip Logic";
  allLogicEntered = false;

  constructor(public formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.q1LogicForm = this.formBuilder.group({ //skip logic for question 1 formbuilder
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        option5: ['', Validators.required]
    });
    this.q2LogicForm = this.formBuilder.group({ //skip logic for question 1 formbuilder
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
    });
    this.q3_1LogicForm = this.formBuilder.group({ //skip logic for question 1 formbuilder
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        option5: ['', Validators.required]
    });
    this.q3_2LogicForm = this.formBuilder.group({ //skip logic for question 1 formbuilder
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        option5: ['', Validators.required]
    });
    this.q3_3LogicForm = this.formBuilder.group({ //skip logic for question 1 formbuilder
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        option5: ['', Validators.required]
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
    this.router.navigate(['/']);
    return true;
  }
  onCloseModal(v){ //on close ngb modal
    this.modalReference.close();
    this.router.navigate(['/']);
  }
  setDisplay(s){
    if(s === "q1") {
      this.display.q1 = 1;
      this.display.q2 = 0;
      this.display.q3 = 0;
      this.display.q4 = 0;
    }else if (s === "q2"){
      this.display.q1 = 0;
      this.display.q2 = 1;
      this.display.q3 = 0;
      this.display.q4 = 0;
    }else if (s === "q3"){
      this.display.q1 = 0;
      this.display.q2 = 0;
      this.display.q3 = 1;
      this.display.q3_1 = 0;
      this.display.q3_2 = 0;
      this.display.q3_3 = 0;
      this.display.q4 = 0;
      this.q3Extended = !this.q3Extended;
    }else if (s === "q3_1"){
      this.display.q1 = 0;
      this.display.q2 = 0;
      this.display.q3 = 0;
      this.display.q3_1 = 1;
      this.display.q3_2 = 0;
      this.display.q3_3 = 0;
      this.display.q4 = 0;
    }
    else if (s === "q3_2"){
      this.display.q1 = 0;
      this.display.q2 = 0;
      this.display.q3 = 0;
      this.display.q3_1 = 0;
      this.display.q3_2 = 1;
      this.display.q4 = 0;
    }else if (s === "q3_3"){
      this.display.q1 = 0;
      this.display.q2 = 0;
      this.display.q3 = 0;
      this.display.q3_1 = 0;
      this.display.q3_2 = 0;
      this.display.q3_3 = 1;
      this.display.q4 = 0;
    }else{
      this.display.q1 = 0;
      this.display.q2 = 0;
      this.display.q3 = 0;
      this.display.q3 = 0;
      this.display.q3_1 = 0;
      this.display.q3_2 = 0;
      this.display.q3_3 = 0;
      this.display.q4 = 1;
    }

  }
  onSubmitQ1(){
     this.submitted1 = this.q1LogicForm.value;
     this.show.q2 = 1;
     this.show.q3 = 1;
     this.show.q4 = 1;
     this.setDisplay("q2");
  }
  onSubmitQ2(){
     this.submitted2 = this.q2LogicForm.value;
     this.show.q2 = 1;
     this.show.q3 = 1;
     this.show.q4 = 1;
     this.setDisplay("q3");
  }
  onSubmitQ3_1(){
     this.submitted3_1 = this.q3_1LogicForm.value;
     this.show.q2 = 1;
     this.show.q3 = 1;
     this.show.q4 = 1;
     this.setDisplay("q3_2");
  }
  onSubmitQ3_2(){
     this.submitted3_2 = this.q3_2LogicForm.value;
     this.show.q2 = 1;
     this.show.q3 = 1;
     this.show.q4 = 1;
     this.setDisplay("q3_3");
  }
  onSubmitQ3_3(){
     this.submitted3_3 = this.q3_3LogicForm.value;
     this.show.q2 = 1;
     this.show.q3 = 1;
     this.show.q4 = 1;
     this.setDisplay("q4");
  }
  upDateSkipProgress(q , i){//updates progress of logic, q = question no. & i = options index
                            //also checks to enable save button when all logic is filled
     let isQ2AllFilled = 0;         //is question 2 all filled?
     let isQ3_1AllFilled = 0;
     let isQ3_2AllFilled = 0;
     let isQ3_3AllFilled = 0;

     if( q === "1"){
        this.q1Progress[i] = 1;
     }else if( q === "2"){
        this.q2Progress[i] = 1;
     }else if( q === "3_1"){
        this.q3_1Progress[i] = 1;
     }else if( q === "3_2"){
        this.q3_2Progress[i] = 1;
     }else /*( q === "3_3")*/{
        this.q3_3Progress[i] = 1;
     }
     //check to enable save button
     for(let i = 0; i<this.q2Progress.length; i++){
        if(this.q2Progress[i]){
           ++isQ2AllFilled;
        }
     }
     if(isQ2AllFilled === 3){
       for(let i = 0; i<this.q3_1Progress.length; i++){
          if(this.q3_1Progress[i]){
             ++isQ3_1AllFilled;
          }
       }
       if(isQ3_1AllFilled === 5){
         for(let i = 0; i<this.q3_2Progress.length; i++){
            if(this.q3_2Progress[i]){
               ++isQ3_2AllFilled;
            }
         }
         if(isQ3_2AllFilled === 5){
           for(let i = 0; i<this.q3_3Progress.length; i++){
              if(this.q3_3Progress[i]){
                 ++isQ3_3AllFilled;
              }
           }
           if(isQ3_3AllFilled === 5){
              this.allLogicEntered = true;
           }
       }
     }
  }
}
  setProgressQ1(i) {// sets color of questions red or green accordingly
     let classes = {
       danger: !this.q1Progress[i],
       success: this.q1Progress[i]
     };
     return classes;
   }
   setProgressQ2(i) {// sets color of questions red or green accordingly
      let classes = {
        danger: !this.q2Progress[i],
        success: this.q2Progress[i]
      };
      return classes;
    }
    setProgressQ3_1(i) {// sets color of questions red or green accordingly
       let classes = {
         danger: !this.q3_1Progress[i],
         success: this.q3_1Progress[i]
       };
       return classes;
     }
     setProgressQ3_2(i) {// sets color of questions red or green accordingly
        let classes = {
          danger: !this.q3_2Progress[i],
          success: this.q3_2Progress[i]
        };
        return classes;
      }
      setProgressQ3_3(i) {// sets color of questions red or green accordingly
         let classes = {
           danger: !this.q3_3Progress[i],
           success: this.q3_3Progress[i]
         };
         return classes;
      }
      onSaveLogic(c){


         this.messageService.sendMessage([this.submitted1, this.submitted2, this.submitted3_1,
                                         this.submitted3_2, this.submitted3_3]);
         this.open(c);
         this.router.navigate(['/']);
      }
}
