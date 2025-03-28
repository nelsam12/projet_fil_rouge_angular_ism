import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'ism-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input({required:true}) pages : number[] = [];
  @Output() onPageChange : EventEmitter<number> = new EventEmitter<number>();

  onPaginate(page: number) {
    // this.refresh(page)
    this.onPageChange.emit(page);
  }
}
