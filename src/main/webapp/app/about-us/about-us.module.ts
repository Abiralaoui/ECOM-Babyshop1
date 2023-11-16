import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTE } from './about-us.route';
import { SharedModule } from 'app/shared/shared.module';
import { AboutUsComponent } from './about-us.component';


@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [AboutUsComponent],
})
export class ContactModule {}
