import { Component, Input } from "@angular/core";

@Component({
  moduleId: module.id.toString(),
  selector: "spinner",
  template: `
    <div class="grey-screen" *ngIf="!data">
      <div class="spinner">
      </div>
    </div>
  `,
})
export class SpinnerComponent {
  @Input() data: any;
}
