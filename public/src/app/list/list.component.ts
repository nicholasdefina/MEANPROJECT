import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';import { DOCUMENT } from '@angular/common';
import { LobbyComponent } from '../lobby/lobby.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() 
  @Output() Emitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  createGame() {
    
  }

  openGame(){
    this.Emitter.emit()
  }
}
