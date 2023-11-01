import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/data';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() products!: Product[];

  constructor() {}

  ngOnInit(): void {}
}
