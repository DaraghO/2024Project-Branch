import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-host',
  templateUrl: './host.page.html',
  styleUrls: ['./host.page.scss'],
})
export class HostPage implements OnInit {

public activeBetroom: BetRoom| undefined;
public selectedValue: any;
public room: any;
public desc: any;
public op1: any;
public op2: any;

  constructor(private router: Router, private activeUserData: SharedDataService, private toastController: ToastController) { }

  ngOnInit() {
  }
  SubmitDetail(room: string, desc: string, op1: string, op2: string){
    if (this.checkEntrants()== undefined||room== ""||desc== ""||op1== ""||op2== "") {
      //NO ENTRANT SELECTED, PLEASE SELECT
      this.presentToast('bottom');
      this.checkValues();
    }
    else{
      this.room=room;
      this.desc=desc;
      this.op1=op1;
      this.op2=op2;
      //Create betroom Specs and continue to next room 
      this.createBetroom();
    }

  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message:'Please enter all Fields',
      duration: 500,
      position: position,
    });

    await toast.present();
  }
  createBetroom(){
    this.activeBetroom = new BetRoom(this.room, this.desc, this.op1, this.op2, this.selectedValue);
    this.activeUserData.SetActiveBetroom(this.activeBetroom);
    this.NextPage();
  }

  checkEntrants(){
    return this.selectedValue;
  }

  //debugging
  checkValues(){
    console.log("All values: ", this.room, this.desc, this.op1, this.op2, this.selectedValue);
  }

  NextPage(){
    this.checkValues();
    console.log("----\n"+this.activeBetroom?.room+": "+this.activeBetroom?.desc);
    this.router.navigate(['/host-open']);
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
