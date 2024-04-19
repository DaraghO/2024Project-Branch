import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-join-open',
  templateUrl: './join-open.page.html',
  styleUrls: ['./join-open.page.scss'],
})
export class JoinOpenPage implements OnInit {

  highlighted1: boolean = false;
  highlighted2: boolean = false;
  isModalOpen = false;

  public activeBetRoom: BetRoom | undefined;
  public room: any;
  public desc: any;
  public op1: any;
  public op2: any;
  public max: any;

  public user: Person | undefined;
  public USERNAME: string | undefined;
  public bank: any;
  public win: any;
  public loss: any;
  public total: any;

  public choice:any;
  public chosenBet:any;
  public betAmount: any;
  public betters:Person[] = [];

  public op1Bets = 0;
  public op2Bets = 0;
  public totalBet = 0;
  public correct:any;


  public resultsMsg:string[]=[]
  public userResult:any;

  constructor(private router: Router, private activeUserData: SharedDataService, private toastController: ToastController, private modalController: ModalController) { }

  ngOnInit() {
    this.activeBetRoom = this.activeUserData.GetActiveBetroom();
    this.room= this.activeUserData.activeBetRoom?.room;
    this.desc= this.activeUserData.activeBetRoom?.desc;
    this.op1= this.activeUserData.activeBetRoom?.op1;
    this.op2= this.activeUserData.activeBetRoom?.op2;
    this.max= this.activeUserData.activeBetRoom?.max;

    this.user=this.activeUserData.GetActiveUser();
    this.USERNAME= this.activeUserData.activeUser?.nick;
    this.bank= this.activeUserData.activeUser?.bank;
    this.win= this.activeUserData.activeUser?.win;
    this.loss= this.activeUserData.activeUser?.loss;
    this.total= this.activeUserData.activeUser?.total;

    
  }

  optionSelected(n:number){
    if (n==1) {
      this.choice = 1;
      this.chosenBet=this.activeBetRoom?.op1;
      this.highlighted1=true;
      this.highlighted2=false;
      this.presentToast('middle');
    }
    else{
      this.choice = 2;
      this.chosenBet=this.activeBetRoom?.op2;
      this.highlighted2=true;
      this.highlighted1=false;
      this.presentToast('middle');
    }
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: this.chosenBet+' chosen',
      duration: 500,
      position: position,
    });

    await toast.present();
  }

  async presentToast2(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: ' not enough funds',
      duration: 500,
      position: position,
    });

    await toast.present();
  }
  
  async presentToast3(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Please click one of the two options to select one',
      duration: 900,
      position: position,
    });

    await toast.present();
  }

  async presentToast4(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Please a value more than 0',
      duration: 500,
      position: position,
    });

    await toast.present();
  }
  SubmitBet(){
    //Checks users bank and bet amount taken from number input 
    if(this.betAmount>this.bank){
      //Not enough funds 
      this.presentToast2('middle');
    }
    else if(this.betAmount<=0||this.betAmount==undefined){
      this.presentToast4('middle');
    }
    else if(this.choice==undefined){
      this.presentToast3('middle');
    }
    else{
      this.startBettingSession();
      //Now get users bet and add it total overall and total of chosen bet 
      this.totalBet += this.betAmount;
      if(this.choice==1){
        this.op1Bets+=this.betAmount
      }
      else{
        this.op2Bets+=this.betAmount
      }
      this.CalculateEarnings(this.correct);
      this.toBettingScreen(true);
    }
  } 

  CalculateEarnings(c:any){
    //Calculate Human Earnings
    if(c==this.op1){//Option 1 won
      if(this.choice==1){
        let getEarning = (this.betAmount/this.op1Bets)*(this.op2Bets); //your bet/total bets on your side to get % then multiply by total other side for % earned 
        let roundDown = Math.floor(getEarning);
        let newAmount = this.bank+(roundDown);
        this.activeUserData.UpdateStats(this.win+1,this.loss,this.total+1,newAmount);
        console.log("User bet was "+this.betAmount+" on "+this.choice+". Earnings was "+roundDown+"gp");
        this.userResult=" won " +roundDown;
      }
      else{
        let newAmount = this.bank-this.betAmount;
        this.activeUserData.UpdateStats(this.win,this.loss+1,this.total+1,newAmount);
        this.userResult=" lost " +this.betAmount;
      }
    }
    else if(c==this.op2){//Option 2 won
      if(this.choice==2){
        let getEarning = (this.betAmount/this.op2Bets)*(this.op1Bets); //your bet/total bets on your side to get % then multiply by total other side for % earned 
        let roundDown = Math.floor(getEarning);
        let newAmount = this.bank+(roundDown);
        this.activeUserData.UpdateStats(this.win+1,this.loss,this.total+1,newAmount);
        console.log("User bet was "+this.betAmount+" on "+this.choice+". Earnings was "+roundDown+"gp");
        this.userResult=" won " +roundDown;
      }
      else{
        let newAmount = this.bank-this.betAmount;
        this.activeUserData.UpdateStats(this.win,this.loss+1,this.total+1,newAmount);
        this.userResult=" lost " +this.betAmount;
      }
    }


    //Calculate Bot Earnings
    let num = 0;
    console.log("Total gp pool is "+this.totalBet+"\nTotal bets for option 1 is "+ this.op1Bets+"\nTotal bets for option 2 is "+ this.op2Bets+"\n");
    while (num<this.max-1) {
      if(c==this.op1){
        //option 1 won
        if(this.betters[num].choice==1){
          let getEarning = (this.betters[num].betMade/this.op1Bets)*(this.op2Bets); //your bet/total bets on your side to get % then multiply by total other side for % earned 
          let roundDown = Math.floor(getEarning); //Will have a loss of 1 or 2 gp but earnings will always be a profit 
          let newAmount = this.betters[num].bank+(roundDown);
          this.betters[num].UpdateStats((this.betters[num].win+1),(this.betters[num].loss),(this.betters[num].total+1),newAmount);
          console.log(this.betters[num].nick+" won their bet of "+this.betters[num].betMade+" and earned "+roundDown+"gp");
          this.resultsMsg.push(this.betters[num].nick+" won "+roundDown+"gp");
        }
        else{
          let newAmount = this.betters[num].bank-this.betters[num].betMade;
          this.betters[num].UpdateStats((this.betters[num].win),(this.betters[num].loss+1),(this.betters[num].total+1),newAmount);
          console.log(this.betters[num].nick+" lost their bet and lost "+(this.betters[num].betMade)+"gp");
          this.resultsMsg.push(this.betters[num].nick+" lost "+this.betters[num].betMade+"gp");
        }  
      }
      else if(c==this.op2){
        // option 2 won
        if(this.betters[num].choice==2){
          let getEarning = (this.betters[num].betMade/this.op2Bets)*(this.op1Bets); //your bet/total bets on your side to get % then multiply by total other side for % earned 
          let roundDown = Math.floor(getEarning); //Will have a loss of 1 or 2 gp but earnings will always be a profit 
          let newAmount = this.betters[num].bank+(roundDown);
          this.betters[num].UpdateStats((this.betters[num].win+1),(this.betters[num].loss),(this.betters[num].total+1),newAmount);
          console.log(this.betters[num].nick+" won their bet of "+this.betters[num].betMade+" and earned "+roundDown+"gp");
          this.resultsMsg.push(this.betters[num].nick+" won "+roundDown+"gp");
        }
        else{
          let newAmount = this.betters[num].bank-this.betters[num].betMade;
          this.betters[num].UpdateStats((this.betters[num].win),(this.betters[num].loss+1),(this.betters[num].total+1),newAmount);
          console.log(this.betters[num].nick+" lost their bet and lost "+(this.betters[num].betMade)+"gp");
          this.resultsMsg.push(this.betters[num].nick+" lost "+this.betters[num].betMade+"gp");
        }  
      }
      else{
        console.log("Error calculating earnings");
        break;
      }
      num++;
    }

  }

  startBettingSession(){
    //Create bots according to max, Create bet amounts according to bank, Randomly Decide winner
    let num = 0;
    let b: Person;
    let rand = Math.floor(Math.random()*10);
    if(rand>=5){
      this.correct = this.op1;
    }
    else{
      this.correct = this.op2;
    }
    console.log("Entrants for this bet was "+this.max);
    console.log("Winning option was "+this.correct);
    while (num<this.max-1) {//you do max-1 because user is also included 
      b=this.generateRandom();
      this.betters.push(b);
      num++;
    }
  }
  genRanNumber(){
    return Math.floor(Math.random()*10);
  }
  generateRandom(){
    let names: string[] = ["Luffy","Lisa","ANdy","MR","Coolkid99","Legend","Kart","hIvemind",
    "Girlboss","beer","IloveMayo","MrBloggs","Billy", "Crunk", "Jessica", "JoeBloggs", "TomeJones", 
    "Mary", "Daragh", "Mario", "Doom","Locked","Isaac", "Ulti"];
    let possibleBets: number[] =[100,432,99,500,3000,5000,849,50,10,4230];
    let rand = Math.floor(Math.random() * names.length);
    let name = names[rand]+"@";

    let newB: Person = new Person(name, "pass");

    let num=0;
    let rand2 = Math.floor(Math.random() * 6);
    switch (rand2) {
      case 0:
          num = 5000;
        break;
      case 1:
          num = 6000;
        break;
      case 2:
          num = 7000;
        break;  
        case 3:
          num = 8000;
        break;
      case 4:
          num = 9000;
        break;
      case 5:
          num = 1000;
        break;        
      default:
        break;
    }
    newB.UpdateStats(0,0,0,num);
    let rand3 = Math.floor(Math.random()*10);
    while (possibleBets[rand3]>newB.bank) {
    rand3 = this.genRanNumber()
     if (possibleBets[rand3]>newB.bank) {
      console.log("v1 The bank amount is "+newB.bank+"|| the bet amount is "+possibleBets[rand3]);
      //reroll due to bank being lower than bet amount
     }
    }

    newB.UpdateBetMade(possibleBets[rand3]);
    let rand4 = Math.floor(Math.random()*10);
    if(rand4>=5){
      newB.UpdateChoice(1);
      this.op1Bets+= newB.betMade;
    }
    else{
      newB.UpdateChoice(2);
      this.op2Bets+= newB.betMade;
    }
    this.totalBet=this.totalBet+newB.betMade;
    console.log("v2"+newB.nick+"'s bank amount is "+newB.bank+"|| the bet amount is "+possibleBets[rand3]+" on "+newB.choice);
    return newB
  }

  toBettingScreen(isOpen: boolean){
    //Open modal. Display winning bet, Congrats or hard luck message, Dropdown List of other betters (Name, Win/loss, Bank amount),New Bank amount, Close Button (sends back to home)
    this.isModalOpen = isOpen;
  }

  async toHome(){
    await this.modalController.dismiss();
    this.router.navigate(['/home']);
  }

  testmodal(){
    this.toBettingScreen(true);
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