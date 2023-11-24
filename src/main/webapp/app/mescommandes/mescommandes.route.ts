import { Route } from '@angular/router';

import {  MescommandesComponent } from './mescommandes.component';

export const LOGIN_ROUTE: Route = {
  path: '',
  component:  MescommandesComponent,
  data: {
    pageTitle: 'login.title',
  },
};
