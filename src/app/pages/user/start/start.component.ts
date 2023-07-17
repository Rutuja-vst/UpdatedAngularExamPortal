import { LocationStrategy } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { LoginService } from 'src/app/services/login.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid;
  questions;
  user;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  firstName:String;
  lastName:String;
  currentUserId:number;
  QuizName:string;
  isSubmit = false;
  token;

  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    private login: LoginService,

  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 1 * 60;

        console.log(this.questions);
        this.startTimer();
      },

      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
  
  evalQuiz() {
    // this.login.getCurrentUser().subscribe((user: any) => {
    //   this.login.setUser(user);
    //   console.log(user);
    //   this.firstName=user.firstName;
    //   this.lastName=user.lastName;

    //   this.currentUserId=user.id;
    //   console.log("useridentity:",this.currentUserId);


    // })
    this.user= this.login.getUser();
    console.log(this.user);
    this.currentUserId=this.user.id
    this.firstName=this.user.firstName
    console.log(this.firstName);
    this.lastName=this.user.lastName
    console.log(this.lastName);
    const token=this.login.getToken();
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log(headers);

    //calculation
    //call to server  to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        // console.log(data);
        this.marksGot = data.marksGot;
        console.log("TotalMarks:",this.marksGot);
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
        this.QuizName=this.questions[0].quiz.title ;
        console.log("Quiz that submitted",this.QuizName)

        this.showResult(this.currentUserId, this.QuizName, this.marksGot );

      },
      (error) => {
        console.log(error);
      }
    );
   
    // this.isSubmit = true;
    // this.questions.forEach((q) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle =
    //       this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }
    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // console.log('Correct Answers :' + this.correctAnswers);
    // console.log('Marks Got ' + this.marksGot);
    // console.log('attempted ' + this.attempted);
    // console.log(this.questions);
  }
  showResult(currentUserId: number, quizName: string, marksGot: number) {
    this.login.showResult(currentUserId, quizName, marksGot).subscribe(
      (response: any) => {
        //  API response
        console.log("Result send");
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
