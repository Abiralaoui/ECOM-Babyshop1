import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { LOGIN_ROUTE } from './panier.route';
import {PanierComponent} from './panier.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [PanierComponent],
})
export class PanierModule {}
