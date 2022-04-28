import {Component, ElementRef,Input,OnInit, Output, ViewChild,EventEmitter} from '@angular/core';

import { faStar } from '@fortawesome/free-solid-svg-icons';

import { BsModalService,BsModalRef  } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit{


  //icon
  faStar = faStar;
  playerSelected = -1;
  opponentSelected = -1;
   options = [
    'rock',
    'paper',
    'scissors'
  ];
  //clas name - for star
  className = 'icon1';
  className1 = 'icon2';

  // theResult -  0 winner
  //              1 lose
  //              2 tie
  theResult:any;
  loading= false;
  userScoreCount:any = 0 ;
  opponentScoreCount:any = 0 ;
  roundCount : number = 1;
  gamePoint : number = 0;
  isResultShow = false;

   bsModalRef!: BsModalRef;
  constructor(private modalService: BsModalService,
              private location : Location) { 
  }

  ngOnInit(): void {
    
  }

  selectOption(option:number){
    // return immediately when still loading.You don't want 
    // the user to spam the button
    if(this.loading) return;
    this.loading = true;
    this.playerSelected = option;

    //create a delay to simulate enemy's turn
    setTimeout( () =>{
      this.loading = false;
         // generate a number from 0 -2 
      const randomNum = Math.floor(Math.random() * 3);
      this.opponentSelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, 1000);
  }

  checkResult() : void{
    const playerSelection = this.playerSelected;
    const opponentSelection = this.opponentSelected;
  
    //1.player --> rock and auto --> paper 
    //2.player --> rock and auto --> Scissors 
    //3.player --> paper and auto --> rock 
    //4.player --> paper and auto --> scissors 
    //5.player --> scissors and auto --> rock 
    //6.player --> scissors and auto --> paper 
    //7.both equals
     if(playerSelection == this.options.indexOf("rock") && opponentSelection == this.options.indexOf("paper") ){
      
       this.theResult = 2;
       this.opponentScoreCount ++;
       this.roundCount ++;

     } else if(playerSelection == this.options.indexOf("rock") && opponentSelection == this.options.indexOf("scissors")){
        
        this.theResult = 1;
        this.userScoreCount ++;
         this.roundCount ++;

       
     } else if(playerSelection == this.options.indexOf("paper") && opponentSelection == this.options.indexOf("rock")){

       this.theResult = 1;
       this.userScoreCount++;
       this.roundCount ++;

     }else if(playerSelection == this.options.indexOf("paper") && opponentSelection == this.options.indexOf("scissors")){
      
       this.theResult = 2;
       this.opponentScoreCount ++;
        this.roundCount ++;

     }else if(playerSelection == this.options.indexOf("scissors") && opponentSelection == this.options.indexOf("rock")){
      
       this.theResult = 2;
       this.opponentScoreCount ++;
        this.roundCount ++;

     }else if(playerSelection == this.options.indexOf("scissors") && opponentSelection == this.options.indexOf("paper")){
  
       this.theResult = 1;
       this.userScoreCount++;
       this.roundCount ++;

        
     } else {
   
       this.theResult = 0;
       this.roundCount ++;
     }
     if(this.userScoreCount == 3 || this.opponentScoreCount == 3){
      this.openModalWithComponent();
      this.userScoreCount = 0;
      this.opponentScoreCount = 0;
     }
    
  }
  onStartAgain1(){
  window.location.reload();
  }
  openModalWithComponent() {
    const initialState = {
      userScore : this.userScoreCount,
      opponentScore : this.opponentScoreCount,
      title: 'Result',
      start:() => this.onStartAgain1() 
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.startBtnName = 'Start again';
    
  }
 
}


// AS A SEPARATE COMPONENT
@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left" style="    font-size: 1.6rem;
    font-family: 'Quintessential', cursive;
    color: #408AC4;">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" #div style="    font-size: 1.6rem;
    font-family: 'Quintessential', cursive;
    color: gold">
     <p *ngIf = "userScore === 3">You win</p>
     <p *ngIf = "opponentScore === 3">Opponent wins</p>
     
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-info" style="    font-size: 1rem;
    font-family: 'Quintessential', cursive;
    " (click)="bsModalRef.hide()">{{closeBtnName}}</button>
      <button type="button" class="btn btn-info" (click) ="start($event)" >{{startBtnName}}</button>
    </div>
  `
})

export class ModalContentComponent implements OnInit {
  title!: string;
  closeBtnName!: string;
  startBtnName!:string;
  list: any[] = [];
  @ViewChild('div') div!: ElementRef;
  @Input()
  userScore!:number;
  @Input()
  opponentScore!:number;
  @Output()
  startAgain = new EventEmitter;
  start(event:any){
     this.startAgain = event;
     console.log(this.startAgain);
  }
  constructor(public bsModalRef: BsModalRef,
              ) {}

  ngOnInit() {
    
  }


}








