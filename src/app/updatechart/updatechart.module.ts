import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatechartPageRoutingModule } from './updatechart-routing.module';

import { UpdatechartPage } from './updatechart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatechartPageRoutingModule
  ],
  declarations: [UpdatechartPage]
})
export class UpdatechartPageModule {}
