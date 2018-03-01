import { Component, OnInit } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
declare var _: any;
@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss']
})
export class UserConfigurationComponent implements OnInit {

  userList = [];
  swapArrayOne=[];
  swapArrayTwo=[];
  constructor(  private http: Http) { }

  ngOnInit() {
    let story = this;
    story.http.get("assets/data/user.json").toPromise().then((result) => {
      story.userList = story.extractData(result);
    });
  }

  extractData = (res) => {
    if (res.status && res.status == 500) {
      return "Server request failed with error 500";
    }
    if (res instanceof String) {
      return res;
    }
    let body = res.json();
    return body || {};
  }

  cehckCheckBoxClick = (event) =>{
    console.log(event)
  }

  addtoSwappArray =(obj,arr)=>{
      if(!_.find(arr, function(o) { return o.id ==obj.id; })){
          arr.push(obj);
      }
  }

  removeFromSwappArray = (obj,arr) =>{
    arr = _.remove(arr, function(o) {
      return o.id ==obj.id
    });
  }
}
