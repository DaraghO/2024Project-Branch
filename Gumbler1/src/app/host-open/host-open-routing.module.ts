import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostOpenPage } from './host-open.page';

const routes: Routes = [
  {
    path: '',
    component: HostOpenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostOpenPageRoutingModule {}
