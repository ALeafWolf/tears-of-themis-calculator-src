import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data/data.service';
import { SkillInfo } from '../model/skill-info';

@Component({
  selector: 'app-card-value',
  templateUrl: './card-value.component.html',
  styleUrls: ['./card-value.component.scss']
})
export class CardValueComponent implements OnInit {
  //from route param
  char;
  id;

  //from data service
  charRssGroup;
  card;
  skillLevelUpRssList;
  rss;

  //skill rss
  coin = 0;
  lv1Common = 0;
  lv1Specific = 0;
  lv2Common = 0;
  lv2Specific = 0;
  lv3Common = 0;
  lv3Specific = 0;

  //for localStorage
  userData;
  star = 1
  skills = [1, 1, 1]
  skillsInfo = ["", "", ""]


  constructor(private _route: ActivatedRoute, private _data: DataService) {
    this.id = this._route.snapshot.params.id;
    this.char = this._route.snapshot.params.charname;
    this.charRssGroup = SkillInfo.getSkillRssGroup(this.char);
  }

  ngOnInit(): void {
    this.userData = JSON.parse(this._data.getItem(this.id))

    this._data.getCards().subscribe((data: any[]) =>{
      data.forEach(c => {
        if(c.id == this.id){
          this.card = c
        }
      });
    })

    this._data.getSkills().subscribe((data: any[]) => {
      this.setSkillDisplay(data)
    });

    this._data.getSkillRssList().subscribe((data) =>{
      this.skillLevelUpRssList = data;
    })

    //if localStorage has user's data for this card
    if(this.userData){
      this.skills = this.userData.skills
      this.calculateRss()
    }
  }

  //set the string of skills that being display on the page
  setSkillDisplay(data: any[]){
    if(this.card){
      let des = []
      for(let i = 0; i < 3; i++){
        let skillName = this.card.skills[i]
        for(let s of data){
          if(s.name == skillName){
            //calculate correct number for the skill at matching lv
            let num = (this.skills[i]-1) * (s.nums[1] - s.nums[0])/9 + s.nums[0]
            //replace X in the description with correct number
            let line = s.description.toString()
            let str = line.replace("X", num.toFixed(2).toString())
            des.push(str)
          }
        }
      }
      this.skillsInfo = des
    }
  }

  calculateRss(){
    // this.skillLevelUpRssList.forEach(element => {
      
    // });

  }

}
