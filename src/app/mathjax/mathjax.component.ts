import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mathjax',
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.scss']
})
export class MathjaxComponent implements OnInit {

  mathJaxObject;

  @Input() content: string;

  constructor() { }

  ngOnInit() {
    this.loadMathConfig()
    this.renderMath();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      // console.log("content chnaged")
      this.renderMath()
    }
  }

  renderMath() {
    this.mathJaxObject = window['MathJax'];
    let angObj = this;
    setTimeout(() => {
      console.log("1234")
      angObj.mathJaxObject.Hub.Queue(["Typeset", angObj.mathJaxObject.Hub], 'mathContent');
    }, 0)
  };

  loadMathConfig() {
    console.log("load config")
    this.mathJaxObject = window['MathJax'];
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: { inlineMath: [["$", "$"], ["\\(", "\\)"]] },
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } }
    });
  };

}
