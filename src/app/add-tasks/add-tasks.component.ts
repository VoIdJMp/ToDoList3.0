import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpService } from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css'],
  providers: [HttpService]
})

export class AddTasksComponent implements OnInit {

  curHour: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tasksData: any = [];
  can: number;

  constructor(private _formBuilder: FormBuilder, private httpService: HttpService, private route: Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.httpService.getDataOfTasks().subscribe( (data: any) => {
      this.can = data.length;
    });
    if (window.localStorage.getItem('login_info') === null) {
      this.route.navigate(['/']);
    }
  }

  AddTaskPlan(x, y, z) {
    this.curHour = (new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear()).toString();
    this.tasksData.push({
      id: this.tasksData.length,
      user_id: JSON.parse(window.localStorage.getItem('login_info')).id,
      desc: z.value.toString(),
      start_time: x.timepickerTime.toString(),
      end_time: y.timepickerTime.toString(),
      date: this.curHour});
    z.value = '';
  }

  AddToDataBase(titleTxt) {
    this.can++;
    for (let i of this.tasksData) {
      this.httpService.postData( this.can, i.user_id, i.desc, i.start_time, i.end_time, i.date, titleTxt).subscribe(data => {});
      this.can++;
    }
    this.route.navigate(['/mytasks']);
  }

}
