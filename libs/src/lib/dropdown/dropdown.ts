import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostListener, inject, ViewChild, AfterViewInit, ElementRef, Input, ContentChild, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { FormsModule } from '@angular/forms';

type InputType = 'button' | 'text' | 'checkbox' | 'radio' | 'hidden' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url';
type Option = { id: string; name: string; value: string };

@Component({
  selector: 'lib-dropdown',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown implements AfterViewInit {
  @ViewChild('button', { static: true }) button!: ElementRef<HTMLElement>;
  @ViewChild('menu', { static: true }) menu!: ElementRef<HTMLElement>;
  @ViewChild('optionFilter', { static: true }) optionFilter!: ElementRef<HTMLInputElement>;
  @ContentChild(TemplateRef) defaultTemplate!: TemplateRef<any>;
  @Input() customTemplate?: TemplateRef<any>;
  @Input() inputType: InputType = 'button';
  @Input() items: Option[] | any = [{ id: '1', name: '選項一', value: 'option1' }, { id: '2', name: '選項二', value: 'option2' }, { id: '3', name: '選項三', value: 'option3' }];

  @Input() selected: any[] = [];
  @Output() selectedChange = new EventEmitter<any[]>();

  items_origin: Option[] | any = [];
  isOpen = false;
  private _optionFilterValue = '';
  set optionFilterValue(value: string) {
    this._optionFilterValue = value;
    this.onOptionFilter();
  }
  get optionFilterValue(): string {
    return this._optionFilterValue;
  }

  private _df = inject(DestroyRef);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('Dropdown items:', this.items);
    this.items_origin = cloneDeep(this.items); // 建立 items 的副本以便過濾
  }

  ngAfterViewInit(): void {
    console.log('Dropdown initialized', this.button);
    fromEvent(this.button.nativeElement, 'click')
      .pipe(filter(() => this.items.length > 0), takeUntilDestroyed(this._df))
      .subscribe((event: Event) => {
        // event.stopPropagation();
        this.toggleDropdown();
      });
  }

  onOptionFilter() {
    console.log('Filter input changed', this.optionFilterValue);
    if (!this.optionFilterValue) {
      this.items = cloneDeep(this.items_origin);
      return;
    }
    console.log('Filter input changed');
    this.items = this.items_origin.filter((item: any) => {
      console.log('Checking item:', item.name, this.optionFilterValue);
      return item.name.includes(this.optionFilterValue);
    });
  }

  onItemClick(event: Event, item: any) {
    event.stopPropagation();
    console.log('Item clicked:', item);
    // this.closeDropdown();
    // const selected = cloneDeep(this.selected);
    const idx = this.selected.findIndex(i => i.id === item.id);
    if (idx > -1) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(item);
    }
    this.selectedChange.emit(this.selected);
  }

  openDropdown() {
    this.menu.nativeElement.classList.remove('hidden');
    this.isOpen = true;
    this.positionDropdown(); // 初次打開時定位
  }

  closeDropdown() {
    this.menu.nativeElement.classList.add('hidden');
    this.isOpen = false;
  }

  toggleDropdown() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  isSelected(item: Option): boolean {
    console.log(this.selected);
    return this.selected.some(i => i.id === item.id);
  }

  positionDropdown() {
    const buttonRect = this.button.nativeElement.getBoundingClientRect();
    const menuHeight = this.menu.nativeElement.offsetHeight;

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    const offset = 5; // 可選：按鈕與選單間距

    let top;

    if (spaceBelow >= menuHeight) {
      // 顯示在下方
      top = buttonRect.bottom + offset + window.scrollY;
    } else if (spaceAbove >= menuHeight) {
      // 顯示在上方
      top = buttonRect.top - menuHeight - offset + window.scrollY;
    } else {
      // 不夠空間，也可強制顯示在下方（被裁切）
      top = buttonRect.bottom + offset + window.scrollY;
    }

    const left = buttonRect.left + window.scrollX;

    this.menu.nativeElement.style.top = `${top}px`;
    this.menu.nativeElement.style.left = `${left}px`;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isOpen && !this.button.nativeElement.contains(target) && !this.menu.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }

  // ✅ 滾動與 resize 時自動重新定位
  // 使用 capture 模式，監聽包含內部 scroll 容器
  @HostListener('window:scroll')
  scroll() {
    if (this.isOpen) {
      console.log('scroll detected, repositioning dropdown');
      this.positionDropdown();
    }

  }
  @HostListener('window:resize')
  resize() {
    if (this.isOpen) {
      this.positionDropdown();
    }
  }
}
