import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Table, Tooltip, Dropdown, Option } from '@angular-demo/libs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Tooltip, Table, Dropdown],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  selectedItems: Option[] = [{ "id": "2", "name": "選項二", "value": "option2" }];
  selectedItems2: Option[] = [{ id: '3', name: '選項三', value: 'option3' }];
  editItem(e: Option) {
    console.log('edit item', e);
  }
  deleteItem(e: Option) {
    console.log('delete item', e);
  }

  isSelected(item: Option): boolean {
    return this.selectedItems2.some(selected => selected.id === item.id);
  }
}
