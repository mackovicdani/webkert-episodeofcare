import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EpisodeOfCare } from 'src/app/models/episode-of-care';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  form!: FormGroup;
  item!: EpisodeOfCare;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      patient: this.fb.control(null,[Validators.required]),
      status: this.fb.control(null,[Validators.required]),
      statusHistory: this.fb.array([]),
      diagnosis: this.fb.array([]),
      period: this.fb.group({
        start: this.fb.control(null,[Validators.required]),
        end: this.fb.control(null,[Validators.required])
      }),
      managingOrganization: this.fb.control(null),
      referralRequest:this.fb.array([]),
      careManager: this.fb.control(null),
      team:this.fb.array([]),
      account:this.fb.array([]),
    })
  }

  get statusForm(): FormArray{
    return this.form.get("statusHistory") as FormArray;
  }

  get diagnosisForm(): FormArray{
    return this.form.get("diagnosis") as FormArray;
  }

  get referralForm(): FormArray{
    return this.form.get("referralRequest") as FormArray;
  }

  get teamForm(): FormArray{
    return this.form.get("team") as FormArray;
  }

  get accountForm(): FormArray{
    return this.form.get("account") as FormArray;
  }

  addStatus(){
    const status = this.fb.group({
      status: this.fb.control(null),
      period: this.fb.group({
        start: this.fb.control(null),
        end: this.fb.control(null)
      })
    })
    this.statusForm.push(status);
  }

  addDiagnosis(){
    const diagnosis = this.fb.group({
      condition: this.fb.control(null),
      rank: this.fb.control(null)
    })
    this.diagnosisForm.push(diagnosis);
  }

  addReferral(){
    const temp = this.fb.group({
      display: this.fb.control(null),
    })
    this.referralForm.push(temp);
  }

  addTeam(){
    const temp = this.fb.group({
      display: this.fb.control(null),
    })
    this.teamForm.push(temp);
  }

  addAccount(){
    const temp = this.fb.group({
      display: this.fb.control(null),
    })
    this.accountForm.push(temp);
  }

  deleteStatus(i: number): void{
    this.statusForm.removeAt(i);
  }

  deleteDiagnosis(i: number): void{
    this.diagnosisForm.removeAt(i);
  }

  deleteReferral(i: number): void{
    this.referralForm.removeAt(i);
  }

  deleteTeam(i: number): void{
    this.teamForm.removeAt(i);
  }

  deleteAccount(i: number): void{
    this.accountForm.removeAt(i);
  }


  onSubmit(){
    this.item = this.form.value as EpisodeOfCare;
    if(this.form.valid){
      this.itemService.addItem(this.item);
      this.router.navigate(['']);
    }
  }

  goBack(){
    this.router.navigate(['']);
  }

}
