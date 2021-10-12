import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatechartPage } from './updatechart.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatechartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatechartPageRoutingModule {}
