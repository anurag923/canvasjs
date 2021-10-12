import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestgraphPageRoutingModule } from './testgraph-routing.module';

import { TestgraphPage } from './testgraph.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestgraphPageRoutingModule
  ],
  declarations: [TestgraphPage]
})
export class TestgraphPageModule {}
