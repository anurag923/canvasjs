import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinnhubPage } from './finnhub.page';

const routes: Routes = [
  {
    path: '',
    component: FinnhubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinnhubPageRoutingModule {}
