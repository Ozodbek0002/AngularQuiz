import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {


  public name: string = '';
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  currectAnswer = 0;
  IncorrectAnswer = 0;
  interval$:any;
  isQuizCompeted = false;

  constructor(private questionService: QuestionService) { }



  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
  }


  getAllQuestions() {
    return this.questionService.getQuestionJson()
    .subscribe(res => {
     this.questionList = res.questions;
    })
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }


  answer(currentQ: number, option: any){
    if(currentQ === this.questionList.length ) {
      setTimeout(() => {
        this.isQuizCompeted = true;
      }, 1000);
      this.stopCounter();
    }
    if(option.currect) {
      this.points+=10;
      this.currectAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
      }, 500);
    }else {
      this.points-=10;
      this.IncorrectAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
      }, 500);
    }
    if(this.currentQuestion === this.questionList.length) {
      clearInterval(this.interval$);
    }
    
  
  }

  startCounter(){
    this.interval$ = interval(1000).subscribe(() => {
      this.counter--;
      if(this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points-=10;
        this.interval$.unsubscribe();
      }
    })
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 60000);
  }

  stopCounter(){
   this.interval$.unsubscribe();    
   this.counter = 0;
  }

  resetCounter(){
    this.isQuizCompeted = false;
    this.currectAnswer = 0;
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetGame(){
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;     
  }




}
