import { Route } from '@angular/router';


import { ContactComponent } from './contact.component';

export const LOGIN_ROUTE: Route = {
  path: '',
  component: ContactComponent,
  data: {
    pageTitle: 'login.title',
  },
};
