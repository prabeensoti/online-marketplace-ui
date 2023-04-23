import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private element: ElementRef<HTMLInputElement>) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 500);
  }
}
