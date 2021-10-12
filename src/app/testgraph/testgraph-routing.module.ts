import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestgraphPage } from './testgraph.page';

const routes: Routes = [
  {
    path: '',
    component: TestgraphPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestgraphPageRoutingModule {}
