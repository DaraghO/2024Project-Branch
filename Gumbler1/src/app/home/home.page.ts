import { Component, ElementRef, ViewChildren, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  public user: Person | undefined;
  public USERNAME: string | undefined;
  public bank:any;
  timer:any;
  constructor(private route: Router, private acRoute: ActivatedRoute, private activeUserData: SharedDataService) {

   }

   ngOnInit(){
    this.user=this.activeUserData.GetActiveUser();
    this.USERNAME= this.activeUserData.activeUser?.nick;
    this.bank= this.activeUserData.activeUser?.bank;
    this.gpTimerStart();
   }

   ngOnDestroy(): void {
    this.gpTimerStop();
   }

   gpTimerStart(){
    this.timer=setInterval(()=>{
      //Every 10 seconds on the home screen you earn + 10gp
      //this.bank+=10;
      this.activeUserData.AutoAddGp(10);
      this.bank = this.activeUserData.activeUser?.bank;
    }, 10000);
   }
   gpTimerStop(){
    clearInterval(this.timer);
   }

   //Debugging Function
   showUserDetails(){
    console.log("Currently logged in: "+this.activeUserData.ReturnName()+"\nList of accounts\n--------------");
    let num = 0;
    while (num<this.activeUserData.CheckAccounts().length) {
      console.log(this.activeUserData.CheckAccounts()[num].em+" & "+this.activeUserData.CheckAccounts()[num].pa);
      num++;
    }

   }

  toLoginPage() {
    this.gpTimerStop();
    this.route.navigate(['/login']);
  }
  toAccountPage() {
    this.gpTimerStop();
    this.route.navigate(['/account']);
  }
  toJoinPage() {
    this.gpTimerStop();
    this.route.navigate(['/join']);
  }
  toHostPage() {
    this.gpTimerStop();
    this.route.navigate(['/host']);
  }


  public logoutPopupt = [
    {
      text: 'Sign out',
      role: 'destructive',
      data: {
        action: 'logout',
      },
      handler: ()=>{
        this.toLoginPage();
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  ionViewWillEnter(){
    //Functions that carry out on entering page
    //this.USERNAME = "Daragh";

    // console.log(this.activeUserData.activeUser?.nick);
    // let namae =this.activeUserData.ReturnName();
    // this.USERNAME = namae;
    this.user=this.activeUserData.GetActiveUser();
    this.USERNAME= this.activeUserData.activeUser?.nick;
    this.bank= this.activeUserData.activeUser?.bank;
    this.gpTimerStart();
  }

}


class Person {
  em: string;
  pa: string;
  nick: string;
  bank: number;
  win: number;
  loss: number;
  total: number;
  betMade: number;
  choice: number;

  constructor(email: string, password: string) {
    this.em = email;
    this.pa = password;
    this.nick = this.RandomNickNamer(email);
    this.bank = 5000;
    this.win = 0;
    this.loss = 0;
    this.total = 0;
    this.betMade=0;
    this.choice=0;
  }

  RandomNickNamer(seed: string){
    let AddOns: string[] = ["THE", "Man", "Master", "Fighter", "Dude", "girl", "ly", "istic", "ish","er","tion", "guy"];
    let num = 0;
    var nam="";
    while (num<seed.length) {
      if(seed[num] =='@'){
        break;
      }
      else{
        nam = nam +seed[num];
        num++;
      }
    }
    let rand = Math.floor(Math.random() * AddOns.length);
    if(rand<5){
      nam = AddOns[rand] + nam;
    }
    else{
      nam = nam + AddOns[rand]
    }

    return nam;
  }

  UpdateNickname(nn: string) {
    this.nick = nn;
  }

  UpdateStats(w:number,l:number,t:number,b:number){
    this.bank = b;
    this.win = w;
    this.loss = l;
    this.total = t;
  }

  UpdateBetMade(b:number){
    this.betMade = b;
  }

  UpdateChoice(c:number){
    this.choice=c;
  }
  AutoAddGp(a:number){
    this.bank+=a;
  }

}