
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'jhi-out-of-stock-popup',
  templateUrl: './out-of-stock-popup.component.html',
  styleUrls: ['./out-of-stock-popup.component.scss']
})
export class OutOfStockPopupComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.activeModal.close();
    },1500);
  }

}
