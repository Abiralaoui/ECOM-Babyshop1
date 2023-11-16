import { Route } from '@angular/router';


import { AboutUsComponent } from './about-us.component';

export const LOGIN_ROUTE: Route = {
  path: '',
  component: AboutUsComponent,
  data: {
    pageTitle: 'login.title',
  },
};
