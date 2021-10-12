import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolygonPageRoutingModule } from './polygon-routing.module';

import { PolygonPage } from './polygon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolygonPageRoutingModule
  ],
  declarations: [PolygonPage]
})
export class PolygonPageModule {}
