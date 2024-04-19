import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinOpenPageRoutingModule } from './join-open-routing.module';

import { JoinOpenPage } from './join-open.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinOpenPageRoutingModule
  ],
  declarations: [JoinOpenPage]
})
export class JoinOpenPageModule {}
