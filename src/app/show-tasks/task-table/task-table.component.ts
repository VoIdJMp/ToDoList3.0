import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from '../../http.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})

export class TaskTableComponent implements OnInit {

  @Input() drawer1: any;
  @Output() onChanger = new EventEmitter<any>();

  TasksOfUser: any[] = [];
  myUserId: any;
  dataOfUser: any;

  curTimeInfo = {
    curTime: this.timeFormat(new Date().getHours().toString()) + ':'
      + this.timeFormat(new Date().getMinutes().toString()) + ':' + this.timeFormat(new Date().getSeconds().toString()),
    curDesc: 'You haven not task',
    curStartTime: '00:00:00', curEndTime: '00:00:00',
    curPhoto: '../../assets/Watch_Your_Watches-logo-A92C33E198-seeklogo.com.png'
  };

  timeWait: any = { hour: '00', minutes: '00', seconds: '00' };

  timeFormat(str: string) {
    return ((str.length === 1) ? '0' : '') + str;
  }

  convertToSec(str: string) {
    // tslint:disable-next-line:radix
    const ost1: number = (parseInt(str[0]) * 10 + parseInt(str[1])) * 3600
      // tslint:disable-next-line:radix
      + (parseInt(str[3]) * 10 + parseInt(str[4])) * 60 + (parseInt(str[6]) * 10 + parseInt(str[7]));
    return ost1;
  }

  refCheck(data) {
    let pr = '0';
    for (const i of data) {
      // tslint:disable-next-line:max-line-length
      if (this.convertToSec(i.start_time + ':00') < this.convertToSec(this.curTimeInfo.curTime) && this.convertToSec(this.curTimeInfo.curTime) < this.convertToSec(i.end_time + ':00')) {
        this.curTimeInfo.curStartTime = i.start_time;
        this.curTimeInfo.curEndTime = i.end_time;
        this.curTimeInfo.curDesc = i.desc_ex;
        let ost = this.convertToSec(i.end_time + ':00') - this.convertToSec(this.curTimeInfo.curTime);
        this.timeWait.hour = Math.floor(ost / 3600).toString(); ost %= 3600;
        this.timeWait.minutes = Math.floor(ost / 60).toString(); ost %= 60;
        this.timeWait.seconds = ost.toString();
        this.curTimeInfo.curPhoto = '../../assets/77055811-hourglass-colored-vector-icon.jpg';
        break;
      } else {
        if ((pr <= this.curTimeInfo.curTime || i.start_time < this.curTimeInfo.curEndTime) && this.curTimeInfo.curTime < i.start_time) {
          this.curTimeInfo.curStartTime = i.start_time;
          this.curTimeInfo.curEndTime = i.end_time;
          let ost = this.convertToSec(i.start_time + ':00') - this.convertToSec(this.curTimeInfo.curTime);
          this.timeWait.hour = Math.floor(ost / 3600).toString(); ost %= 3600;
          this.timeWait.minutes = Math.floor(ost / 60).toString(); ost %= 60;
          this.timeWait.seconds = ost.toString();
          this.curTimeInfo.curPhoto = '../../assets/Watch_Your_Watches-logo-A92C33E198-seeklogo.com.png';
        } else {
          this.curTimeInfo.curPhoto = '../../assets/Watch_Your_Watches-logo-A92C33E198-seeklogo.com.png';
        }
      }
      pr = i.end_time;
    }
  }

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getDataOfTasks().subscribe( (data: any) => {
      console.log(data);
      this.dataOfUser = data;
      this.myUserId = JSON.parse(window.localStorage.getItem('login_info')).id;
      for (let i of data) {
        if (i.user_id === this.myUserId) {
          this.TasksOfUser.push(i);
        }
      }
      setInterval(() => {
        this.curTimeInfo.curTime = this.timeFormat(new Date().getHours().toString()) + ':'
          + this.timeFormat(new Date().getMinutes().toString()) + ':' + this.timeFormat((new Date().getSeconds()).toString());
        this.refCheck(this.TasksOfUser);
      }, 1000);
    });
  }
  showMyTasks() {
    this.drawer1.toggle();
    this.onChanger.emit(this.TasksOfUser);
  }
}
