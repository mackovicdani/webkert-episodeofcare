import { Component, OnInit } from '@angular/core';
import { EpisodeOfCare } from 'src/app/models/episode-of-care';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tomb: string[]=[];
  items: EpisodeOfCare[];
  constructor(private itemService: ItemService){
    this.items=[];
  }

  ngOnInit(): void {
    this.default()
  }
  arrayfilter(str: string[]){
    this.tomb=str;
  }

  filter(name: EpisodeOfCare){
    if(name.patient=="" && this.tomb.length<1){
      this.default();
    }else{
      this.itemService.getFilteredItems(name,this.tomb).subscribe(items => {
        this.items=items;
      });
    }
  }
  

  default(){
    this.itemService.getItems().subscribe(items => {
      this.items=items;
    });
  }
}
