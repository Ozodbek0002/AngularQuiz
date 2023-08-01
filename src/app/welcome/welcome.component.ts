import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

  @ViewChild('name') nameKey !: ElementRef;

  public routeGame = "";

  constructor() { }


  ngOnInit(): void {
  }

  startGame() {
    if(this.nameKey.nativeElement.value === ''){
      alert(' Please enter your name !!!');
      this.routeGame = "Welcome";
    }
    localStorage.setItem('name', this.nameKey.nativeElement.value);
    this.routeGame = "question";
  }

}
