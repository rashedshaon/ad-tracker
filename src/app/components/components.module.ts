import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { CartButtonComponent } from "./cart-button/cart-button.component";
import { CommonTopComponent } from "./common-top/common-top.component";

const routes: Routes = [];

@NgModule({
  declarations: [
    CartButtonComponent,
    CommonTopComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CartButtonComponent,
    CommonTopComponent,
    RouterModule
  ]
})
export class ComponentsModule {}
