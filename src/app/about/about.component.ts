import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoremIpsum } from 'lorem-ipsum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  loremArray: string;

  constructor(private http: HttpClient) {
    this.loremIpsum1();
  }

  ngOnInit() {
  }

  loremIpsum1() {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });
    this.loremArray = lorem.generateParagraphs(5);
  }
}
