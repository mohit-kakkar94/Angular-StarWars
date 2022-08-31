import { Component, Input, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() character;
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit(): void {
  }

  onAssign(side) {

    //Since Javascript objects are referenced, we can achieve required
    //behaviour very easily with this line. But changing behaviour from
    //anywhere within the app is not the best practice as it becomes
    //hard to track. So we should change this inside the tabs component
    //itself.
    //this.character.side = side;

    // this.sideAssigned.emit({
    //   name: this.character.name,
    //   side: side
    // });

    this.swService.onSideChosen({name: this.character.name, side: side});

  }

}
