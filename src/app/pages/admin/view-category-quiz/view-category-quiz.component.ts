import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-view-category-quiz',
  templateUrl: './view-category-quiz.component.html',
  styleUrls: ['./view-category-quiz.component.css']
})
export class ViewCategoryQuizComponent implements OnInit {
  catId:any;
  quizzes:any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _quiz: QuizService,
    ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catId = params.catId;

      console.log('Category ID:', this.catId); // Added console.log

      
      if (this.catId == 0) {
        console.log('Load all the quiz');

        this._quiz.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            alert('error in loading all quizzes');
          }
        );
      } else {
        console.log('Load specific quiz');

        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            alert('error in loading quiz data');
          }
        );
      }
    });
  }
  viewQuestions(qId: string, title: string): void {
    this._router.navigate(['/admin/view-questions', qId, title]);
  }
}