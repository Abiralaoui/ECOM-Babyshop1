import { Route } from '@angular/router';

import {  PanierComponent } from './panier.component';

export const LOGIN_ROUTE: Route = {
  path: '',
  component:  PanierComponent,
  data: {
    pageTitle: 'login.title',
  },
};
