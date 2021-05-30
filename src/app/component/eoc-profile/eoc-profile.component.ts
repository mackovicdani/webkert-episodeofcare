import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EpisodeOfCare } from 'src/app/models/episode-of-care';
import { ItemService } from 'src/app/services/item.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-eoc-profile',
  templateUrl: './eoc-profile.component.html',
  styleUrls: ['./eoc-profile.component.css']
})
export class EocProfileComponent implements OnInit, OnDestroy {
  Id: string = '';
  private sub!: Subscription;
  eoc?: EpisodeOfCare;

  constructor(
    private activateRoute: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub = this.activateRoute.params.subscribe(params => {
      this.Id = params['id'];
      this.itemService.getItemById(this.Id).subscribe(item => {
        if(!item.exists){
          this.router.navigate(['']);
        }
        this.eoc=item.data();
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
