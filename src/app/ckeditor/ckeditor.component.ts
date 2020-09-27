import { QuestionClass } from './../models/question-class';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";



@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss']
})


export class CkeditorComponent implements OnInit {

  questionObj = new QuestionClass();

  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit() {

  }

  public ckEditorconfiguration = {
    placeholder: 'Type the content here!',
    toolbar: [
      'bold',
      'italic',
      'underline',
      '|',
      'superscript',
      'subscript',
      '|',
      'alignment',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'link',
      'blockQuote',
      '|',
      'undo',
      'redo',
      '|',
      'specialCharacters',
      'MathType',
      'ChemType',
      '|',
      'fontFamily',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'imageUpload',
      'insertTable',
      'heading',
      'codeBlock',
    ]
  };

  choiceOne: any = "";
  choiceTwo: any = "";
  choiceThree: any = "";
  choiceFour: any = "";
  multipleChoicesForSingleQuestion: any[] = [];

  storeMultipleChoices() {
    this.multipleChoicesForSingleQuestion.push(this.choiceOne);
    this.multipleChoicesForSingleQuestion.push(this.choiceTwo);
    this.multipleChoicesForSingleQuestion.push(this.choiceThree);
    this.multipleChoicesForSingleQuestion.push(this.choiceFour);
    this.choiceOne = "";
    this.choiceTwo = "";
    this.choiceThree = "";
    this.choiceFour = "";
    console.log("storeMultipleChoices", this.multipleChoicesForSingleQuestion);
  }


  EditorContent: any = "";
  editorContentStatus: boolean = false;
  displayContent = "";
  editorContentStore: any[] = [];



  showEditorContent() {
    this.storeMultipleChoices();
    console.log("editor Content", this.EditorContent);
    this.editorContentStatus = true;
    this.displayContent = this.EditorContent;
    this.editorContentStore.push(this.displayContent);
    this.EditorContent = "";
    console.log("editorContentStore", this.editorContentStore);
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


  //FILE UPLOAD OR IMAGE UPLOAD:
  images: any[] = [];

  uploadImageAsUrl(event: any) {
    this.images = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.images.push(reader.result);
          console.log("images", this.images);
        }
        reader.readAsDataURL(file); // Images are saved as DataURL.
      }
    }
  };


  // TAKE A SCREEN SHOT: HTML to Image using html2canvas package
  fileName: string = "";

  exporthtmlToImage() {
    // Assigning File name
    this.assigningFileName(this.fileName);
    let element = document.getElementById("editorDisplayContent");
    html2canvas(element)
      .then(canvas => {
        document.getElementById("screenShot").append(canvas);
        let imgData = canvas.toDataURL('image/png');
        // Downloading image
        this.downloadImage(canvas.toDataURL(), `${this.fileName}.png`);
        console.log("htmlToCanvas", canvas);
        console.log("base64Img", imgData);
      });
  };


  downloadImage(uri, filename) {
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      //Firefox requires the link to be in the body
      document.body.appendChild(link);
      //simulate click
      link.click();
      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  assigningFileName(fileName) {
    if (this.fileName) {
      this.fileName = this.fileName;
    } else {
      this.fileName = "Untitled"
    }
  };


  // CREATE A PDF FILE: HTML to pdf using html2canvas package
  exportHtmlToPDF() {
    this.assigningFileName(this.fileName);
    let element = document.getElementById("editorDisplayContent");
    html2canvas(element)
      .then(canvas => {
        console.log("exportAsPdf", canvas);
        let imgData = canvas.toDataURL('image/png');
        let doc = new jsPDF();
        let imgWidth = 208;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        // addImage takes, y axis, x axis, image width and image height
        doc.addImage(imgData, 0, 0, imgWidth, imgHeight);
        doc.save(`${this.fileName}.pdf`);
        this.fileName = "";
        console.log("imageDataBase64", imgData);
      });
  };


  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log('loader : ', loader)
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  };





  // Question paper

  allQuestions: any = [{
    "id": 1,
    "question": "What is the capital of Belgium?",
    "a": "Vienna",
    "b": "Berlin",
    "c": "Brussels",
    "d": "Prague",
    "answer": "c"
  },
  {
    "id": 2,
    "question": "What is the capital of Australia?",
    "a": "Vienna",
    "b": "Canberra",
    "c": "Brussels",
    "d": "Prague",
    "answer": "b"
  },
  {
    "id": 3,
    "question": "What is the capital of Bulgaria?",
    "a": "Vienna",
    "b": "Sofia",
    "c": "Brussels",
    "d": "Prague",
    "answer": "b"
  }
  ];

  submitAddQuestion() {
    let newQuestion = JSON.parse(JSON.stringify(this.questionObj));
    newQuestion["id"] = this.allQuestions.length + 1;
    console.log("stringify object", newQuestion);
    this.allQuestions.push(newQuestion);
    console.log("All questions", this.allQuestions);
  };



}

///////////// END OF THE CLASS///////////////////////////////////


// CKEDITOR FILE UPLOADER FOR IMAGE
export class UploadAdapter {

  private loader;

  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        var myReader = new FileReader();
        myReader.onloadend = (e) => {
          resolve({ default: myReader.result });
        }

        myReader.readAsDataURL(file);
      }));
  };
};
/////////////////////////////////////////////////