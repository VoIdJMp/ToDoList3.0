import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class HttpService {

  TasksData: any;
  UsersData: any;

  PHP_API_SERVER = 'http://localhost:81';

  constructor(private http: HttpClient) {}

  getDataOfTasks() {
    return this.http.get(`${this.PHP_API_SERVER}/gettask.php`);
  }

  postData(Id: number, UserId: number, Desc: string, StartTime: string, EndTime: string, Date: string, Title: string) {
    this.TasksData = { id: Id, user_id: UserId, desc: Desc, start_time: StartTime, end_time: EndTime, date: Date, titles: Title };
    return this.http.post(`${this.PHP_API_SERVER}/posttasks.php`, this.TasksData);
  }

  getDataOfUsers() {
    return this.http.get(`${this.PHP_API_SERVER}/testInd.php`);
  }

  postDataUsers(Id: number, UserName: string, Password: string) {
    this.UsersData = { id: Id, name: UserName, password: Password };
    return this.http.post(`${this.PHP_API_SERVER}/userpost.php`, this.UsersData);
  }

  getProductUpdate() {
    return this.http.get(`${this.PHP_API_SERVER}/getproductupdate.php`);
  }
}
