import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public activeUser: Person | undefined;
  public Accounts: Person[] = [];
  public activeBetRoom: BetRoom |undefined;

  constructor() { }

  SetActiveBetroom(setter: BetRoom){
    this.activeBetRoom = setter;
  }
  
  SetActiveUser(setter: Person){
    this.activeUser = setter;
  }

  GetActiveUser(){
    return this.activeUser;
  }

  GetActiveBetroom(){
    return this.activeBetRoom;
  }

  CheckAccounts(){
    return this.Accounts;
  }

  ReturnName(){
    return this.activeUser?.nick;
  }

  UpdateStats(w:number,l:number,t:number,b:number){
    this.activeUser?.UpdateStats(w,l,t,b);
  }

  UpdateNickname(nn: string) {
    this.activeUser?.UpdateNickname(nn);
  }

  AutoAddGp(a:number){
    this.activeUser?.AutoAddGp(a);
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

class BetRoom{
  room: string;
  desc: string;
  op1: string;
  op2: string;
  max: number;

  constructor(room: string, desc: string, op1: string, op2: string, max:number) {
    this.room = room;
    this.desc = desc;
    this.op1 = op1;
    this.op2 = op2;
    this.max = max;
  }

  
}
