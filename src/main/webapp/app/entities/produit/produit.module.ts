import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProduitComponent } from './list/produit.component';
import { ProduitDetailComponent } from './detail/produit-detail.component';
import { ProduitUpdateComponent } from './update/produit-update.component';
import { ProduitDeleteDialogComponent } from './delete/produit-delete-dialog.component';
import { ProduitRoutingModule } from './route/produit-routing.module';
import {AppModule} from "../../app.module";
import {CategoryModule} from "../category/category.module";
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {NgbdRatingBasic} from "./rating/rating-basic";

@NgModule({
    imports: [SharedModule, ProduitRoutingModule, CategoryModule, NgxPaginationModule, NgxSliderModule, NgbdRatingBasic],
    declarations: [ProduitComponent, ProduitDetailComponent, ProduitUpdateComponent, ProduitDeleteDialogComponent],
    exports: [
        ProduitComponent
    ]
})
export class ProduitModule {}
