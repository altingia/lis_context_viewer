// Angular
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter,
  Input, Output, ViewChild } from "@angular/core";

@Component({
  moduleId: module.id.toString(),
  selector: "context-menu",
  styles: [ require("./context-menu.component.scss") ],
  template: require("./context-menu.component.html"),
})
export class ContextMenuComponent implements AfterViewInit {
  @Input() title: string;
  @Output() saveData = new EventEmitter();
  @Output() saveImage = new EventEmitter();

  @ViewChild("dropdown") el: ElementRef;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  dataClick(): void {
    this.saveData.emit();
  }

  imageClick(): void {
    this.saveImage.emit();
  }

  showDropdown(): boolean {
    return this.saveData.observers.length > 0
        || this.saveImage.observers.length > 0
        || (this.el !== undefined
        && this._hasContent(this.el.nativeElement.children));
  }

  showSeparator(): boolean {
    return (this.saveData.observers.length > 0
        || this.saveImage.observers.length > 0)
        && (this.el !== undefined
        && this._hasContent(this.el.nativeElement.children));
  }

  private _hasContent(children: any): any {
    for (const c of children) {
      if (c.className !== "native" && c.className !== "divider") {
        return true;
      }
    }
    return false;
  }
}
