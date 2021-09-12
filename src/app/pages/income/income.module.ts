import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomePageRoutingModule } from './income-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { IncomePage } from './income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [IncomePage]
})
export class IncomePageModule {}
