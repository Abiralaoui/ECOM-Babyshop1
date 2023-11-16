import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTE } from './contact.route';
import { SharedModule } from 'app/shared/shared.module';
import { ContactComponent } from './contact.component';


@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations: [ContactComponent],
})
export class ContactModule {}
