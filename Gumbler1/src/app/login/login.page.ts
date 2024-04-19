import { Component, OnInit, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
  export class LoginPage implements OnInit {
    [x: string]: any;
    public mail: string = "";
    public pass: string = "";
    public p: Person | undefined;

    public Accounts: Person[] = [];
    isError: boolean = false;
    
    constructor(private router: Router, private toastController: ToastController, private activeUserData: SharedDataService) { }

    ngOnInit() {
      
    }
    
    sub(login:any){
      console.log(login);
    }
    async presentToast(position: 'top' | 'middle' | 'bottom') {
      const toast = await this.toastController.create({
        message:'Invalid Username or Password',
        duration: 500,
        position: position,
      });
  
      await toast.present();
    }
    SubmitDetail(em: string, pa: string, login:any){
      if(this.ValidCheck(em,pa,login)){
        this.EmailCheck();
      }
      else{
        //invalid do alert
        this.displayErrorMsg(true);
      }
    }

    ValidCheck(em: string, pa: string, login:any){

      let num = 0;
      let found=false;

      if(em==""||pa==""){
        this.displayErrorMsg(true);
      }
      else{
        this.displayErrorMsg(false);
      }

      while (!this.isError&&num<em.length) {
      if(em[num] =='@'){
        //Found @ symbol
        found=true
        break;
      }
      num++;
    }

    //looking for .com at the end
    if (found && em[em.length-4]=='.'&& em[em.length-3]=='c'&& em[em.length-2]=='o'&& em[em.length-1]=='m') {
      this.mail=em;
      this.pass=pa;
      console.log(this.mail+" "+this.pass);
      console.log("Valid Input v1, Checking Database for match...");
      return true;
    }
    else{
      //invalid  
      console.log("detials: "+em[em.length-4]+" | "+em[em.length-3]+" | "+em[em.length-2]+" | "+em[em.length-1]);
      console.log("Invalid Email");
      this.displayErrorMsg(true);
      return false;
    }
    }
    
    displayErrorMsg(b: boolean){
      console.log("in the errormsg function result is : "+b);
      if(b){
        this.isError=true;
        this.presentToast('bottom');
      }
      else{
        this.isError=false;
      }
      
    }

    EmailCheck(){
      console.log("in email check: "+this.mail+" "+this.pass);
      if(this.activeUserData.Accounts.length==0){
        //DB empty, no accounts made yet
        this.p = new Person(this.mail, this.pass);
        this.activeUserData.SetActiveUser(this.p);
        this.activeUserData.Accounts.push(this.p);
        console.log("Account Created and added to db (v1)");
        console.log(this.activeUserData.Accounts[0].em+" "+this.activeUserData.Accounts[0].pa);
        this.NextPage();
      }
      else{
        let num: number = 0;
        let found: boolean = false;
        while (num<this.activeUserData.Accounts.length) {
            let tt = this.activeUserData.Accounts[num];
            if (tt.em==this.mail && tt.pa==this.pass) {
              console.log("Account Located, login");
              this.p = this.activeUserData.Accounts[num];
              this.activeUserData.SetActiveUser(this.p);
              console.log(this.activeUserData.Accounts[num].em+" + "+this.activeUserData.Accounts[num].pa);
              found = true;
              this.NextPage();
            }
            else if(tt.em==this.mail && tt.pa!=this.pass){
              console.log("PASSWORD WRONG");

              this.displayErrorMsg(true)
              found = true;
              break;
            }
            num++;
          }
          if (!found) {
            //Account not registered 
            this.p = new Person(this.mail, this.pass);
            this.activeUserData.SetActiveUser(this.p);
            this.activeUserData.Accounts.push(this.p);
            console.log("Account Created and added to db (v2)");
            console.log(this.activeUserData.Accounts[num].em+" and "+this.activeUserData.Accounts[num].pa);
            this.NextPage();
          }

          console.log("Database contains "+this.activeUserData.Accounts.length+" accounts"); 
        }
      }

    NextPage(){
        this.displayErrorMsg(false);
        console.log("Final Check before change page: Email is "+this.p?.em+"\n-----------");
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
      let rand = Math.floor(Math.random() * 12);
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