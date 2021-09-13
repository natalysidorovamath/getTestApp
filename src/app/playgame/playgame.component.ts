import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.css']
})
export class PlaygameComponent implements OnInit {
  @ViewChild('row0') row0: ElementRef;
  @ViewChild('row1') row1: ElementRef;
  @ViewChild('row2') row2: ElementRef;
  @ViewChild('row3') row3: ElementRef;
  @ViewChild('row4') row4: ElementRef;
  @ViewChild('row5') row5: ElementRef;
  @ViewChild('row6') row6: ElementRef;
  @ViewChild('row7') row7: ElementRef;
  @ViewChild('row8') row8: ElementRef;
  isLoading : true;
  isDisable = false;
  constructor() { }
  rows:boolean[] = [];
  rowsSecond:boolean[] = [];
  arrWinSec:number[]=[];
  arrWin:number[]=[];
  resultGame: string="";
  countClick:number =0;
  ngOnInit(): void {
    this.fullFirstarr();
    this.fullSecondarr();
    this.setArrWin();
    this.setArrWinSec();
    this.isDisable = false;
  }
  clickTd(event: number){
    if(!this.validationValueCell(event)){
      console.log("Is it correct");
      return;
    }
    this.rows[event]= true;
    this.secondPlayer(event);
    this.countClick++;
    if(this.checkResult()){
      //alert('The game is over!')
    }
  }
  
  secondPlayer(index:number){
   
     var btRet= true;
     if(this.countClick===4){
       return;
      }
    while(btRet){
      var id = Math.floor(Math.random() * 9);
      if(!this.rowsSecond[id] && index !=id  && !this.rows[id] && id<9){
        this.rowsSecond[id]= true;
        return;
      }
    }
  }
checkResult():boolean{
  // var finGame =(this.checkFirstArr()==5);
  // if(finGame){
    var btRet=false;
    if(this.checkWinner()){
      this.resultGame="Крестики выиграли";
      btRet = true;
      this.isDisable = true;
      // alert('The game is over!');
       return true;
    }
    if(this.checkSecodWinner()){
      this.resultGame="Нолики  выиграли";
      if(btRet){this.isLoading= true;}
      btRet = true;
      this.isDisable = true;
      // alert('The game is over!');
       return true;
    }
    
    if(!this.resultGame && this.countClick==5){
      this.resultGame ="Никто не выиграл";
      this.isDisable = true;
     //  alert('The game is over!');
    }
   // this.isDisable = true;
    return false;
  
  //}
}

fullFirstarr(){
  for (let i = 0; i < 9; i++){
    this.rows[i]=false;
  }
}
fullSecondarr(){
  for (let i = 0; i < 9; i++){
    this.rowsSecond[i]=false;
  }
}
  checkEndGame(): boolean{
  var i=0;
   while(i<10){
    if(this.rows[i] === false){
     return false;
    }
    i= i+1;
   }
   while(i<10){
    if(this.rowsSecond[i] === false){
     return false;
    }
    i= i+1;
   }
    return true;
  }
  checkWin(rows:[]):boolean{
    var i: number =0, addInt:number=0;
    var btRes= false;
    //по строкам
    while(addInt<=6){
      if(rows[addInt] && rows[addInt+1] && rows[addInt+2]){
        return true;
      }
        addInt=addInt +3;
    }
    
    for(let i=0; i<3; i++){
      if(rows[i] && rows[i+3] && rows[i+6]){
        return true;
      }
    }
    if(this.rows[0] && this.rows[4] && this.rows[8]){
      return true;
    }
    if(this.rows[2] && this.rows[4] && this.rows[6]){
      return true;
    }
    return false;
  }
  checkWinner(): boolean{
    var  addInt:number=0;
    //по строкам
    while(addInt<=6){
      if(this.rows[addInt] && this.rows[addInt+1] && this.rows[addInt+2]){
        this.GetWinTh(addInt,addInt+1, addInt+2, true);
        console.log(this.arrWin);
        return true;
      }
        addInt=addInt +3;
    }
    
    for(let i=0; i<3; i++){
      if(this.rows[i] && this.rows[i+3] && this.rows[i+6]){
        this.GetWinTh(i,i+3,i+6, true);
         console.log(this.arrWin);
        return true;
      }
    }
    if(this.rows[0] && this.rows[4] && this.rows[8]){
      this.GetWinTh(0,4,8, true);
       console.log(this.arrWin);
      return true;
    }
    if(this.rows[2] && this.rows[4] && this.rows[6]){
      this.GetWinTh(2,4,6, true);
       console.log(this.arrWin);
      return true;
    }
    return false;
  }
  checkSecodWinner(): boolean{
    var i: number =0, addInt:number=0;
    var btRes= false;
    //по строкам
    while(addInt<=6){
      if(this.rowsSecond[addInt] && this.rowsSecond[addInt+1] && this.rowsSecond[addInt+2]){
        this.GetWin(addInt, false);
        console.log(this.arrWinSec);
        return true;
      }
        addInt=addInt +3;
    }
    
    for(let i=0; i<3; i++){
      if(this.rowsSecond[i] && this.rowsSecond[i+3] && this.rowsSecond[i+6]){
        this.GetWinTh(i,i+3,i+6, false);
        console.log(this.arrWinSec);
        return true;
      }
    }
    if(this.rowsSecond[0] && this.rowsSecond[4] && this.rowsSecond[8]){
      this.GetWinTh(0,4,8, false);
      console.log(this.arrWinSec);
      return true;
    }
    if(this.rowsSecond[2] && this.rowsSecond[4] && this.rowsSecond[6]){
      this.GetWinTh(2,4,6, false);
      console.log(this.arrWinSec);
      return true;
    }
    return false;
  }
  checkFirstArr(): number{
    var count=0;
    for (let i = 0; i < 9; i++){
      if(this.rows[i]){
        count++;
      }
    }
    return count;
  }
  setArrWin(){
    
  //if(this.arrWin){
      for(var i=0; i<9; i++){
        this.arrWin.push(-1);
      }
   // }
  }
  setArrWinSec(){
   // if(this.arrWinSec){
      for(let i=0; i<9; i++){
        this.arrWinSec.push(-1);
      }
   // }
  }
  GetWinTh(a:number, b:number, c:number, bt:boolean){
    if(bt){
    this.arrWin[a]=a;
    this.arrWin[b]=b;
    this.arrWin[c]=c;
    }else{
      this.arrWinSec[a]=a;
      this.arrWinSec[b]=b;
      this.arrWinSec[c]=c;
    }
  }
  GetWin( i:number, bt:boolean){
    if(bt){
      this.arrWin[i]=i;
      this.arrWin[i+1]=i+1;
      this.arrWin[i+2]=i+2;
    }else{
      this.arrWinSec[i]=i;
      this.arrWinSec[i+1]=i+1;
      this.arrWinSec[i+2]=i+2;
    }
   
  }
  belongToArrWinner(index:number):boolean{
  for(let i=0; i<9; i++){
    if(this.arrWin[index]!=-1){
      return true;
    }
  }
    return false;
  }
  belongToArrSecWinner(index:number):boolean{
    for(let i=0; i<9; i++){
      if(this.arrWinSec[index]!=-1){
        return true;
      }
    }
      return false;
    }
    validationValueCell(index:number):boolean{
    
      if(this.row0 && index==0){
        console.log(this.row0.nativeElement.innerText);
        if(this.row0.nativeElement.innerText !=""){return false;}
      }
      if(this.row1 && index==1){
        console.log(this.row1.nativeElement.innerText);
        if(this.row1.nativeElement.innerText !=""){return false;}
      }
      if(this.row2  && index==2){
        console.log(this.row2.nativeElement.innerText);
        if(this.row2.nativeElement.innerText !=""){return false;}
      }
      if(this.row3 && index==3){
        console.log(this.row3.nativeElement.innerText);
        if(this.row3.nativeElement.innerText !=""){return false;}
      }
      if(this.row4 && index==4){
        console.log(this.row4.nativeElement.innerText);
        if(this.row4.nativeElement.innerText !=""){return false;}
      }
      
      if(this.row5 && index==5){
        console.log(this.row5.nativeElement.innerText);
        if(this.row5.nativeElement.innerText !=""){return false;}
      }
      if(this.row6 && index==6){
        console.log(this.row6.nativeElement.innerText);
        if(this.row6.nativeElement.innerText !=""){return false;}
      }
      if(this.row7 && index==7){
        console.log(this.row7.nativeElement.innerText);
        if(this.row7.nativeElement.innerText !=""){return false;}
      }
      if(this.row8 && index==8){
        console.log(this.row8.nativeElement.innerText);
        if(this.row8.nativeElement.innerText !=""){return false;}
      }
      return true;
    
    }
}