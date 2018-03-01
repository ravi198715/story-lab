import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
declare var _: any;
@Component({
  selector: 'app-user-config-custom',
  templateUrl: './user-config-custom.component.html',
  styleUrls: ['./user-config-custom.component.scss']
})
export class UserConfigCustomComponent implements OnInit {

    userList = [];
    userListLeft = [];
    userListRight = [];
    swapArrayOne=[];
    swapArrayTwo=[];
    selectedUser:any=null;
    searchLeft:any;



    constructor(  private http: Http,private router: Router) {

     }

    ngOnInit() {
        let story = this;
        story.http.get("assets/data/user.json").toPromise().then((result) => {
            story.userList = story.extractData(result);
            story.userList.forEach(function(c) {
              c["name_description"] = c.name+" ("+c.asset.asset_subscription+")";
            });
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


    addtoSwappArray =(obj,arr)=>{
        if(!obj){
            return;
        }
        let story = this;
        if(!_.find(arr, function(o) { return o.id ==obj.id; })){
            arr.push(obj);
        }
    }

    removeFromSwappArray = (obj,arr) =>{
        if(!obj){
            return;
        }
        arr = _.remove(arr, function(o) {
            return o.id ==obj.id
        });
    }

    reset =()=>{
        let story = this;
        story.swapArrayOne=[];
        story.swapArrayTwo=[];
        story.selectedUser=null;
    }

    swapSusbscription =()=>{
        let story = this;
        let x =[];
        let y= [];
        let index = -1;
        if (story.swapArrayOne.length>0 && story.swapArrayTwo.length >0 && story.swapArrayOne.length == story.swapArrayTwo.length){
            story.swapArrayOne.forEach((user,i)=>{
                x.push(user.asset.asset_subscription);
                y.push(story.swapArrayTwo[i].asset.asset_subscription);
            });
            // [x]=[y]

            story.swapArrayOne.forEach((user,i)=>{
                user.asset.asset_subscription =y[i];
            });

            story.swapArrayTwo.forEach((user,i)=>{
                user.asset.asset_subscription =x[i];
            });


            story.swapArrayOne.forEach((user,i)=>{
            index = _.findIndex(story.userList, function(o) { return o.id == user.id });
                if(index>=0){
                    user.name_description=user.name+" ("+user.asset.asset_subscription+")";
                    story.userList[index] = user;
                }
            });

            story.swapArrayTwo.forEach((user,i)=>{
            index = _.findIndex(story.userList, function(o) { return o.id == user.id });
                if(index>=0){
                    user.name_description=user.name+" ("+user.asset.asset_subscription+")";
                    story.userList[index] = user;
                }
            });

            story.userList=[...story.userList];

        }
        else{
            alert("Number of users to be swapped should be equal to users they are being swapped with");
        }
    }


    filterSwapArray =(filter,arr,flag)=>{
        let story = this;


        switch(filter) {
            case "base":
                    arr = _.filter(story.userList, function(o) {return o.asset.asset_subscription=="Base"; });
                    break;
            case "standard":
                    arr = _.filter(story.userList, function(o) { return o.asset.asset_subscription=="Standard"; });
                    break;
            case "premium":
                    console.log(filter);
                    arr = _.filter(story.userList, function(o) { return o.asset.asset_subscription=="Premium"; });
                    break;
            default:
                    arr = _.cloneDeep(story.userList);
        }
        if(flag=="left"){
            story.userListLeft = arr
        }
        else{
            story.userListRight = arr
        }
    }

}
