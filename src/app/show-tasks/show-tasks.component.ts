import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
  providers: [HttpService]
})

export class ShowTasksComponent implements OnInit {

  TasksOfUser: any[] = [];
  userName: string  = JSON.parse(window.localStorage.getItem('login_info')).name;

  constructor(private route: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    if (window.localStorage.getItem('login_info') === null) {
      this.route.navigate(['/']);
    }
  }

  goW3(curDiv, drw) {
    drw.toggle();
    if (curDiv.getAttribute('class') === 'change') {
      curDiv.setAttribute('class', 'container1');
    } else {
      curDiv.setAttribute('class', 'change');
    }
  }

  getTasksList(TList: any) {
    this.TasksOfUser = TList;
    this.TasksOfUser = this.TasksOfUser.sort((a, b) => {
       if (a.start_time > b.start_time) {
         return 1;
       }
       else {
         return -1;
       }
    });
  }

  exitUser() {
    window.localStorage.removeItem('login_info');
    this.route.navigate(['/']);
  }
}
