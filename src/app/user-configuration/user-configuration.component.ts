import { Component, OnInit } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

declare var _: any;
@Component({
    selector: 'app-user-configuration',
    templateUrl: './user-configuration.component.html',
    styleUrls: ['./user-configuration.component.scss']
})
export class UserConfigurationComponent implements OnInit {

    userList = [];
    userListLeft = [];
    userListRight = [];
    swapArrayOne=[];
    swapArrayTwo=[];
    filterLeft:{};
    filterRight:{};
    subscriptionFilter: any[] = [
        { value: null, name: "Filter By" },
        { value: "base", name: "Base" },
        { value: "standard", name: "Standard" },
        { value: "premium", name: "Premium" }
    ];


    constructor(  private http: Http,private router: Router) { }

    ngOnInit() {
        let story = this;
        story.http.get("assets/data/user.json").toPromise().then((result) => {
            story.userList = story.extractData(result);
            story.userListLeft = _.cloneDeep(story.extractData(result));
            story.userListRight = _.cloneDeep(story.extractData(result));
        });
        story.filterLeft=null;
        story.filterRight=null;
    }

    reset =()=>{
        let story = this;
        story.swapArrayOne=[];
        story.swapArrayTwo=[];
        story.userListRight=null;
        story.userListLeft=null;
        story.userListLeft = _.cloneDeep(story.userList);
        story.userListRight = _.cloneDeep(story.userList);
        story.filterLeft=null;
        story.filterRight=null;
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

    cehckCheckBoxClick = (event,obj,arr) =>{
        let story = this;
        if(event.target.checked){
            story.addtoSwappArray(obj,arr);
        }
        else{
            story.removeFromSwappArray(obj,arr);
        }
    }

    getSelectedUserIndex =(userId, array)=>{
      return _.findIndex(array, function(o) { return o.id == userId; })>=0?_.findIndex(array, function(o) { return o.id == userId; })+1:"";
    }

    addtoSwappArray =(obj,arr)=>{
        let story = this;
        if(!_.find(arr, function(o) { return o.id ==obj.id; })){
            arr.push(obj);
        }
    }

    removeFromSwappArray = (obj,arr) =>{
        arr = _.remove(arr, function(o) {
            return o.id ==obj.id
        });
    }

    swapSusbscription =()=>{
        let story = this;
        if (story.swapArrayOne.length>0 && story.swapArrayTwo.length >0 && story.swapArrayOne.length == story.swapArrayTwo.length){
            story.swapArrayOne.forEach((user,i)=>{
                [user.asset.asset_subscription, story.swapArrayTwo[i].asset.asset_subscription] =
                [story.swapArrayTwo[i].asset.asset_subscription,user.asset.asset_subscription]
            });
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
