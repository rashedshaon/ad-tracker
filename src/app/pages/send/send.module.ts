import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendPageRoutingModule } from './send-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { SendPage } from './send.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SendPage]
})
export class SendPageModule {}
