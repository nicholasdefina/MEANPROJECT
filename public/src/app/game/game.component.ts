import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';import { DOCUMENT } from '@angular/common';
import { LobbyComponent } from '../lobby/lobby.component'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() 
  @Output() Emitter = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }
  closeGame(){
    this.Emitter.emit()
  }
}
