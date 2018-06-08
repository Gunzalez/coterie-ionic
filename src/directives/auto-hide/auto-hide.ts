import {Directive, OnInit, ElementRef, Renderer2} from '@angular/core';

@Directive({
    selector: '[auto-hide]', // Attribute selector
    host: {
        '(ionScroll)': 'onContentScroll($event)'
    }
})
export class AutoHideDirective implements OnInit {

    fabToHide;
    oldScrollTop:number = 0;

    constructor(private render: Renderer2, private element: ElementRef) {

    }

    ngOnInit(){
      this.fabToHide = this.element.nativeElement.getElementsByClassName('fab')[0];
      this.render.setStyle(this.fabToHide, 'opacity', '0');
      this.render.setStyle(this.fabToHide, "webkitTransition", "transform 500ms, opacity 500ms");
    }

    onContentScroll(e){
        if(e.scrollTop > 100){
            this.render.setStyle(this.fabToHide, 'opacity', '1');
            this.render.setStyle(this.fabToHide, "webkitTransform", "scale3d(1,1,1)");
        } else {
            if(e.scrollTop - this.oldScrollTop > 10){
                this.render.setStyle(this.fabToHide, 'opacity', '1');
                this.render.setStyle(this.fabToHide, "webkitTransform", "scale3d(1,1,1)");
            } else if(e.scrollTop - this.oldScrollTop < 0){
                this.render.setStyle(this.fabToHide, 'opacity', '0');
                this.render.setStyle(this.fabToHide, "webkitTransform", "scale3d(.1,.1,.1)");
            }
            this.oldScrollTop = e.scrollTop;
        }
    }
}
