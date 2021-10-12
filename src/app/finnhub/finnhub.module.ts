import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinnhubPageRoutingModule } from './finnhub-routing.module';

import { FinnhubPage } from './finnhub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinnhubPageRoutingModule
  ],
  declarations: [FinnhubPage]
})
export class FinnhubPageModule {}
