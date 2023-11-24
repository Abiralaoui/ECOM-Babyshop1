import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { LOGIN_ROUTE } from './mescommandes.route';

import { MescommandesComponent } from './mescommandes.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [MescommandesComponent],
})
export class MescommandesModule {}
