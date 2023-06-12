import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[numbersOnly]'
})
export class NumberOnlyDirective {
    // Allow decimal numbers. The \. is only allowed once to occur
    private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        // console.log('this.el.nativeElement.value',this.el.nativeElement.value);
        let current: string = this.el.nativeElement.value;
        // console.log('current', current);
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}
