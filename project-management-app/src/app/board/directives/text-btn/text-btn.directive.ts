import {
  Directive, ElementRef, Input, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTextBtn]',
})
export class TextBtnDirective {
  constructor(
    private host: ElementRef,
    private render: Renderer2,
  ) { }

  @Input() elem!: string;

  @Input() set appTextBtn(type: string) {
    let text: Text;

    if (type === 'column' && this.elem === 'span') {
      text = this.render.createText('Add another column');
    } else if (type === 'column' && this.elem === 'button') {
      text = this.render.createText('Add column');
    } else if (type === 'task' && this.elem === 'span') {
      text = this.render.createText('Add another task');
    } else {
      text = this.render.createText('Add task');
    }

    this.render.appendChild(this.host.nativeElement, text);
  }
}
