import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { EpisodeOfCare } from '../models/episode-of-care';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection!: AngularFirestoreCollection<EpisodeOfCare>;
  items!: Observable<EpisodeOfCare[]>;
  itemDoc!: AngularFirestoreDocument<EpisodeOfCare>;

  constructor(public afs: AngularFirestore) { 
    this.fillAll();
  }

  getItems(){
    this.fillAll();
    return this.items;
  }

  fillAll(){
    this.itemsCollection = this.afs.collection('EpisodeOfCare');
    this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as EpisodeOfCare
        data.identifier = a.payload.doc.id;
        return data;
      });
    }));
  }

  getFilteredItems(eoc: EpisodeOfCare, str: string[]){
    if(str.length==0){
      str=["planned" , "waitlist" , "active" , "onhold" , "finished" , "cancelled" , "entered-in-error"];
    }
    this.itemsCollection = this.afs.collection('EpisodeOfCare', ref => ref.where('patient','==',eoc.patient).where('status',"in",str));
    this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a=>{
        const data = a.payload.doc.data() as EpisodeOfCare
        data.identifier = a.payload.doc.id;
        return data;
      });
    }));
    return this.items;
  }

  addItem(item: EpisodeOfCare){
    this.itemsCollection.add(item);
  }

  deleteItem(item: EpisodeOfCare){
    this.itemDoc = this.afs.doc("EpisodeOfCare/"+item.identifier)
    this.itemDoc.delete();
  }

  UpdateItem(item: EpisodeOfCare, id: string){
    this.itemDoc = this.afs.doc("EpisodeOfCare/"+id)
    this.itemDoc.update(item);
  }

  getItemById(id: string | undefined){
    return this.itemsCollection.doc(id).get();
  }
}
