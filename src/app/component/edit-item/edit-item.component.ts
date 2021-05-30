import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EpisodeOfCare } from 'src/app/models/episode-of-care';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, OnDestroy {

  Id: string = '';
  private sub!: Subscription;
  eoc?: EpisodeOfCare;

  form!: FormGroup;
  item!: EpisodeOfCare;

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
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
        this.fillStatus();
        this.fill(this.referralForm,this.eoc?.referralRequest);
        this.fill(this.teamForm,this.eoc?.team);
        this.fill(this.accountForm,this.eoc?.account);
        this.form.patchValue({
          patient: this.eoc?.patient,
          status: this.eoc?.status,
          period: this.fb.group({
            start: this.eoc?.period?.start,
            end: this.eoc?.period?.end
          }),
          managingOrganization: this.eoc?.managingOrganization,
          careManager: this.eoc?.careManager,
        })
      });
    });

    this.form = this.fb.group({
      patient: this.fb.control(null),
      status: this.fb.control(null),
      statusHistory: this.fb.array([]),
      diagnosis: this.fb.array([]),
      period: this.fb.group({
        start: this.fb.control(null),
        end: this.fb.control(null)
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

  fillStatus(){
    if(this.eoc?.statusHistory != undefined){
      this.eoc.statusHistory.forEach(element => {
        const status = this.fb.group({
          status: element.status,
          period: this.fb.group({
            start: element.period.start,
            end: element.period.end
          })
        })
        this.statusForm.push(status);
      });
    }else{
      console.log("ures")
    }
  }

  fill(form: FormArray, prop: any){
    if(prop != undefined){
      prop.forEach((element: { display: any; }) => {
        const temp = this.fb.group({
          display: element.display,
        })
        form.push(temp);
      });
    }else{
      console.log("ures")
    }
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(){
    this.item = this.form.value as EpisodeOfCare;
    if(this.item.patient!=''){
      this.itemService.UpdateItem(this.item, this.Id);
      this.router.navigate(['']);
    }
  }
}
