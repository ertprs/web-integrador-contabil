import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollTrackerDirective {

  @Output() scrollEnd: EventEmitter<boolean> = new EventEmitter();

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {

    const target = event.target;
    const limit = target.scrollHeight - target.clientHeight;
    if (event.target.scrollTop === limit) {
      this.scrollEnd.emit(true);
    }
    // } else {
    //   this.scrollEnd.emit(false);
    // }

  }

}