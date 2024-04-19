import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HostOpenPageRoutingModule } from './host-open-routing.module';

import { HostOpenPage } from './host-open.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HostOpenPageRoutingModule
  ],
  declarations: [HostOpenPage]
})
export class HostOpenPageModule {}
