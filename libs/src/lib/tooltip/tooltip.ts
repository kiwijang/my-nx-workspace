import { Directive, ElementRef, EmbeddedViewRef, inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import tippy, { Instance, Placement } from 'tippy.js';

@Directive({
  selector: '[libTooltip]',
  standalone: true,
})
export class Tooltip implements OnInit, OnDestroy {
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private tippyInstance?: Instance;
  private viewContainerRef = inject(ViewContainerRef);
  private embeddedViewRef?: EmbeddedViewRef<HTMLElement>;
  @Input() libTooltip?: TemplateRef<HTMLElement>;
  @Input() tooltipContext?: { [key: string]: any }; // 傳遞給模板的 context

  @Input() placement?: Placement;

  ngOnInit(): void {
    if (this.libTooltip) {
      this.tippyInstance = tippy(this.elementRef.nativeElement, {
        content: this.createTemplateContent(),
        allowHTML: true,
        interactive: true, // 允許與 tooltip 內容互動
        trigger: 'click',
        arrow: false,
        placement: this.placement || 'bottom',
        onShow: () => {
          if (!this.embeddedViewRef) {
            return false; // 返回 false 阻止顯示
          }
          return void 0;
          // Returning void allows tooltip to show
        },
        onHidden: () => {
          // 隱藏時清理 view
          // this.destroyEmbeddedView();
        },
      });
    }
  }

  private createTemplateContent(): HTMLElement {
    // 創建 embedded view
    this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(
      this.libTooltip!,
      this.tooltipContext || {}
    );

    // 檢測變更以確保綁定正確
    this.embeddedViewRef.detectChanges();

    // 創建容器元素
    const container = document.createElement('div');

    // 將渲染的節點加入容器
    this.embeddedViewRef.rootNodes.forEach(node => {
      container.appendChild(node);
    });

    return container;
  }

  private destroyEmbeddedView(): void {
    if (this.embeddedViewRef) {
      this.embeddedViewRef.destroy();
      this.embeddedViewRef = undefined;
    }
  }

  ngOnDestroy() {
    this.tippyInstance?.destroy();
  }
}
