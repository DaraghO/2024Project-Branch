import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinOpenPage } from './join-open.page';

const routes: Routes = [
  {
    path: '',
    component: JoinOpenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinOpenPageRoutingModule {}
