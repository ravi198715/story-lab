import { Component, OnInit } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  userList = [];
  constructor(  private http: Http) { }

  ngOnInit() {
    let story = this;
    story.http.get("assets/data/user.json").toPromise().then((result) => {
      story.userList = story.extractData(result);
    });
    //   story.userList.forEach((user,i)=>{
    //      user.asset.asset_id = "phone"+Math.floor(Math.random() * Math.floor(9999)).toString();
    //   });
    //
    // setTimeout(function(){ console.log(JSON.stringify(story.userList)) }, 500);
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

  swapSubscription = (x,y) =>{
    x.forEach((item, i) => {
        [item.subscription,y[i].subscription] = [y[i].subscription,item.subscription]
    });
  }


  mathsproblem = () =>{
    let a ={"id":10 ,"subscription" :"basic"};
    let b ={"id":11 ,"subscription" :"basic"};
    let c ={"id":12 ,"subscription" :"basic"};
    let d ={"id":13 ,"subscription" :"premium"};
    let e ={"id":14 ,"subscription" :"premium"};
    let f ={"id":15 ,"subscription" :"premium"};
    let x = [], y=[];
    x.push(a);x.push(b);x.push(c);
    y.push(d);y.push(e);y.push(f);
    x.forEach((item, i) => {
        [item.subscription,y[i].subscription] = [y[i].subscription,item.subscription]
    });

    console.log(x[0]);
    console.log(y[0]);


  }
}
