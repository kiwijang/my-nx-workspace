import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-table',
  imports: [KeyValuePipe, NgTemplateOutlet],
  standalone: true,
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input() header: any[] = [];
  @Input() data: any[] = [];
}