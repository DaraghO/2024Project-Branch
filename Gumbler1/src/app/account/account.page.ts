import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  
  public user: Person | undefined;
  public USERNAME: string | undefined;
  public bank: number| undefined;
  public win: number| undefined;
  public loss: number| undefined;
  public total: number| undefined;
  constructor(private router: Router, private activeUserData: SharedDataService) { }

  ngOnInit() {
    this.user=this.activeUserData.GetActiveUser();
    this.USERNAME= this.activeUserData.activeUser?.nick;
    this.bank= this.activeUserData.activeUser?.bank;
    this.win= this.activeUserData.activeUser?.win;
    this.loss= this.activeUserData.activeUser?.loss;
    this.total= this.activeUserData.activeUser?.total;
  }

  UpdateNick(n:string){
    if(n==""){
//dont update because nothing there
    }
    else{
      this.activeUserData.UpdateNickname(n);
      this.user=this.activeUserData.GetActiveUser();
      this.USERNAME= this.activeUserData.activeUser?.nick;
    }
    this.toHomePage();
  }

  toHomePage() {
    this.router.navigate(['/home']);
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