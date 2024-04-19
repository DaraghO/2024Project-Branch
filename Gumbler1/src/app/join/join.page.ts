import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  public betrooms: BetRoom[] = [];

  constructor(private router: Router, private activeUserData: SharedDataService) { }

  ngOnInit() {
    this.createRooms();
  }



  joinRoom(n:number){
    this.activeUserData.SetActiveBetroom(this.betrooms[n]);
    this.NextPage();
  }
  NextPage(){
    this.router.navigate(['/join-open']);
}
  createRooms(){
    console.log("Room creation in progress");
    let b: BetRoom;
    let num = 0;
    //Makes 4 random betrooms each time entered
    while(num<4){
      b = this.RandomRooms();
      this.betrooms.push(b);
      num++;
    }
  }
  RandomRooms(){
    let roomNames: string[] = ["Fun bets only", "Esports Tournament", "mario64 Speedrunning", "Football Betting", "Random bets", "Drinking Games"];
    let maxNames: number[] = [2,4,8];
    let num = 0;
    let room = "";
    let desc = "";
    let op1 = "";
    let op2 = "";

    let rand = Math.floor(Math.random() * 6);
    room = roomNames[rand];
    switch (rand) {
      case 0:
          desc ="Will I have fun this stream?";
          op1 = "Will have fun";
          op2 = "No chance";
          num = maxNames[Math.floor(Math.random()*3)];
        break;
      case 1:
          desc ="Valorant tournament finals, who will win?";
          op1 = "Moist eSports";
          op2 = "TSM";
          num = maxNames[Math.floor(Math.random()*3)];
        break;
      case 2:
          desc ="m64 120 star world record attempts";
          op1 = "Will get WR this run";
          op2 = "Won't get WR";
          num = maxNames[Math.floor(Math.random()*3)];
        break;  
        case 3:
          desc ="ManU vs Liverpool";
          op1 = "ManU win";
          op2 = "Liverpool win";
          num = maxNames[Math.floor(Math.random()*3)];
        break;
      case 4:
          desc ="Will I select yes or no?";
          op1 = "Yes";
          op2 = "No";
          num = maxNames[Math.floor(Math.random()*3)];
        break;
      case 5:
          desc ="Can I shotgun this Beer in 10 seconds?";
          op1 = "Easy down";
          op2 = "Don't think so";
          num = maxNames[Math.floor(Math.random()*3)];
        break;        
      default:
        break;
    }
    let newB:BetRoom = new BetRoom(room, desc, op1, op2, num );
    console.log("\n-------\nbetroom created, details: \n"+newB.room+" "+newB.desc+" "+newB.op1+" "+newB.op2+" "+newB.max);
    return newB;
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