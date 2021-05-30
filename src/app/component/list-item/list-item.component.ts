import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EpisodeOfCare } from 'src/app/models/episode-of-care';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() item!: EpisodeOfCare;

  constructor(
    private itemService: ItemService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  deleteItem(event: any){
    this.itemService.deleteItem(this.item)
  }

  getById(event: any){
    this.router.navigate([this.item.identifier]);
  }

  editItem(event: any){
    this.router.navigate(["/edit/"+this.item.identifier]);
  }

}
