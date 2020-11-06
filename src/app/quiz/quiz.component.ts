import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from "../model.quiz";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizRef = new FormGroup({
    userAnswer: new FormControl()
  })
  quizAnswers:string[]= [];
  correctAnswers:string[]=[];
  quizzInfo:Quiz[];
  numCorrect:number=0;
  hideResults: boolean=true;

  
  
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.loadQuizDetails().subscribe(data=>this.quizzInfo=data);

  }

  loadQuiz():void {
    
  }

  submitAnswer(){
    this.quizAnswers.push(this.quizRef.value.userAnswer);
    console.log(this.quizAnswers)
  }

  checkAnswers(){
    for(let i=0; i<this.quizzInfo.length; i++){
      this.correctAnswers.push(this.quizzInfo[i].answer)
    }
    var count:number = 0;
    for(let i=0; i<this.correctAnswers.length; i++){
      if(this.correctAnswers[i] == this.quizAnswers[i]){
        count++;
      }
    }
    this.hideResults=false;
    this.numCorrect=count;
    alert("You answered "+ count + " questions correctly!");
  }
}

