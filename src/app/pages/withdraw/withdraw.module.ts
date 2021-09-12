import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawPageRoutingModule } from './withdraw-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { WithdrawPage } from './withdraw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WithdrawPage]
})
export class WithdrawPageModule {}
