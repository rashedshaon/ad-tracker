import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
})
export class CartButtonComponent implements OnInit {

  @Input() limit: number = 5;
  @Input() count: number = 0;
  @Output() refresh = new EventEmitter();


  constructor(
    
  ) { }

  ngOnInit() {}

  add()
  {
    if(this.count <= this.limit)
    {
      this.count++;
      this.refresh.emit(this.count);
    }
  }

  remove()
  {
    if(this.count > 0)
    {
      this.count--;
      this.refresh.emit(this.count);
    }
  }
}
