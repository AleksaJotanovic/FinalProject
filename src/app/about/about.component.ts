import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  backgroundUrl: string = '../../assets/Resursi/MACRO_PLP_BANNER.jpg';

  constructor() {}

  ngOnInit(): void {}
}
