import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'income',
        loadChildren: () => import('../income/income.module').then(m => m.IncomePageModule)
      },
      {
        path: 'withdraw',
        loadChildren: () => import('../withdraw/withdraw.module').then(m => m.WithdrawPageModule)
      },
      {
        path: 'send',
        loadChildren: () => import('../send/send.module').then(m => m.SendPageModule)
      },
      {
        path: 'shop',
        loadChildren: () => import('../shop/shop.module').then(m => m.ShopPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
