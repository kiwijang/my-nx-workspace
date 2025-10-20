import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Table, Tooltip, Dropdown } from '@angular-demo/libs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Tooltip, Table, Dropdown],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  selectedItems: any[] = [{ "id": "2" }];
  selectedItems2: any[] = [{ id: '3' }];
  editItem(e: any) {
    console.log('edit item', e);
  }
  deleteItem(e: any) {
    console.log('delete item', e);
  }

  isSelected(item: any): boolean {
    return this.selectedItems2.some(selected => selected.id === item.id);
  }
}
