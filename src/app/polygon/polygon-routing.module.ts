import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolygonPage } from './polygon.page';

const routes: Routes = [
  {
    path: '',
    component: PolygonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolygonPageRoutingModule {}
