import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import jsPDF from 'jspdf';
import { ScriptService } from './script.service';




declare let pdfMake: any ;

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})

export class ResumeBuilderComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef;
  resumeBuilderForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private scriptService: ScriptService ) {
    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }


  ngOnInit(): void {
    this.resumeBuilderForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      experienceBlocks: this.formBuilder.array([this.buildExperienceBlock()]),
      educationBlocks: this.formBuilder.array([this.buildEducationBlock()]),
      languageBlocks: this.formBuilder.array([this.buildLanguageBlock()])
    });
  }

  buildExperienceBlock(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  buildEducationBlock(): FormGroup {
    return this.formBuilder.group({
      faculty: ['', [Validators.required]],
      university: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  buildLanguageBlock(): FormGroup {
    return this.formBuilder.group({
      language: ['', [Validators.required]],
      level: ['', [Validators.required]]

  })
}

  save() {
    console.log(this.resumeBuilderForm);
    console.log('Saved: ' + JSON.stringify(this.resumeBuilderForm.value));
  }

  get experienceBlocks(): FormArray {
    return this.resumeBuilderForm.get('experienceBlocks') as FormArray;
  }
  get educationBlocks(): FormArray {
    return this.resumeBuilderForm.get('educationBlocks') as FormArray;
  }
  get languageBlocks(): FormArray {
    return this.resumeBuilderForm.get('languageBlocks') as FormArray;
  }

  addExperience() {
    this.experienceBlocks.insert(0, this.buildExperienceBlock());
  }
  addEducation() {
    this.educationBlocks.insert(0, this.buildEducationBlock());
  }

  addLanguage() {
    this.languageBlocks.insert(0, this.buildLanguageBlock());
  }

  removeExperience(i:number) {
    this.experienceBlocks.removeAt(i);

  }

  removeEducation(i:number) {
    this.educationBlocks.removeAt(i);

  }

  removeLanguage(i:number) {
    this.languageBlocks.removeAt(i);

  }




//   generatePdf(action = 'open') {
//     console.log(pdfMake);
//     const documentDefinition = this.getDocumentDefinition();

//     switch (action) {
//       case 'open': pdfMake.createPdf(documentDefinition).open(); break;
//       case 'print': pdfMake.createPdf(documentDefinition).print(); break;
//       case 'download': pdfMake.createPdf(documentDefinition).download(); break;

//       default: pdfMake.createPdf(documentDefinition).open(); break;
//     }

//   }



//   getDocumentDefinition() {sessionStorage.setItem('resume', JSON.stringify(this.resumeBuilderForm.value));
//   return {
//     content:[
//       {
//         text: 'RESUME',
//         bold: true,
//         fontSize: 20,
//         alignment: 'center',
//         margin: [0, 0, 0, 20]
//       },
//       {



//   }
// ]


  makePdf() {
    let pdf = new jsPDF('p','mm','a4')
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("cv.pdf")
      }
    })
    pdf.setFontSize(5);
  }
  }


