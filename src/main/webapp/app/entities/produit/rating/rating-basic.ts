import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './rating-basic.html',
  styleUrls: ['./rating-basic.scss'],
  styles: [`
    .gift {
      position: relative;
      display: inline-block;
      font-size: 3rem;
      color: #d3d3d3;
    }
    .full {
      color: #ffa600;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: #ffa600;
    }
  `]
})
export class NgbdRatingBasic {
  @Input() rating: number = 0;
  @Input() size: number = 16;
  @Input() readonly: boolean = true;
  @Output() rateChangeEvent: EventEmitter<number> = new EventEmitter<number>();
  onRateChange(newRating: number): void {
    this.rateChangeEvent.emit(newRating);
  }

}
