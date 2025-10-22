import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '../models';

@Component({
  selector: 'lib-checkbox',
  // imports: [],
  standalone: true,
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  @Input() isSelected = false;
  @Input() item!: Option;
  @Output() ItemClick = new EventEmitter<{ event: Event, item?: Option }>();

  onItemClick(event: Event, item?: Option) {
    if (!item) return;
    console.log('Checkbox item clicked:', item);
    event.stopPropagation();
    this.ItemClick.emit({ event, item });
  }
}
