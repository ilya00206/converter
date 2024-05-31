import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CurrenciesPageComponent } from './pages/currencies-page/currencies-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: CurrenciesPageComponent }],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
