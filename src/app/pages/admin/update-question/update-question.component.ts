import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { QuestionService } from 'src/app/services/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';



@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{
  public Editor = ClassicEditor;
  quesId=0;
  question;
  quesTitle;
  constructor(private _route:ActivatedRoute, private _question:QuestionService,private location: Location){}
  ngOnInit(): void {
    this.quesId=this._route.snapshot.params.quesId;
    this.quesTitle=this._route.snapshot.params.quesTitle;
    //alert(this.quesId);
    this._question.getQuestion(this.quesId).subscribe(
      (data:any)=>{
        this.question=data;
        console.log(this.question);
      },
      error=>{
        console.log(error)
      }
    )
  }
  //update question
  public updateques(){
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }
    //alert("testing");
    this._question.updatequestion(this.question).subscribe((data)=>{
      Swal.fire('Success ', 'Question updated.', 'success');
      this.question.content = '';
      this.question.option1 = '';
      this.question.option2 = '';
      this.question.option3 = '';
      this.question.option4 = '';
      this.question.answer = '';

    },
    (error) => {
      Swal.fire('Error', 'Error in UPDATING question', 'error');
    }
    )
  }
  goBack() {
    this.location.back();
  }
}
