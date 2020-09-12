import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as ClassicEditor from '../../assets/js/ck-editor-math-type/ckeditor.js';



@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss']
})
export class CkeditorComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit() {
  }

  public config = {
    placeholder: 'Type the content here!',
    toolbar: [
      '|',
      'bold',
      'italic',
      'superscript',
      'subscript',
      '|',
      'link',
      'blockQuote',
      '|',
      'bulletedList',
      'numberedList',
      'codeBlock',
      'undo',
      'redo',
      'MathType',
      'heading',
    ]

  }



  EditorContent: any = "";
  editorContentStatus: boolean = false;
  displayContent = "";

  editorContentStore: any[] = [];



  showEditorContent() {
    console.log("editor Content", this.EditorContent);
    this.editorContentStatus = true;
    this.displayContent = this.EditorContent;
    this.editorContentStore.push(this.displayContent);
    this.EditorContent = "";

  };


  clearEditorContent() {
    this.EditorContent = ""
  };

  clearOutPut() {
    this.displayContent = ""
    this.editorContentStore = [];
  };

  removeSingleItem(index) {
    this.editorContentStore.splice(index, 1)
  };

}
