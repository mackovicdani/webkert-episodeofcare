import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EpisodeOfCare } from 'src/app/models/episode-of-care';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css']
})
export class FilterItemComponent implements OnInit {
  checkArray: string[];
  eoc: EpisodeOfCare;
  @Output() onFilterItem: EventEmitter<EpisodeOfCare> = new EventEmitter();
  @Output() onArrayItem: EventEmitter<string[]> = new EventEmitter();
  constructor() {
    this.checkArray=[];
    this.eoc={
      patient: '',
      status: 'active'
    }
  }

  ngOnInit(): void {
  }

  onFilter(temp: EpisodeOfCare){
    this.arrayFilter(this.checkArray);
    this.onFilterItem.emit(temp);
  }

  arrayFilter(temp:string[]){
    this.onArrayItem.emit(temp);
  }

  eventCheck(event: any){
    if(event.checked){
      this.checkArray.push(event.source.value);
    }
    else{
      const inx = this.checkArray.indexOf(event.source.value);
      if (inx > -1) {
        this.checkArray.splice(inx, 1);
      }
    }
  }
}
