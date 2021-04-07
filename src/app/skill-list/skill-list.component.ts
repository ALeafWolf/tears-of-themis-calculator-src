import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service/data.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
  
  fullSkillList: any[];
  skillList: any[];
  filterConditions = ["All", "All", "All", "All"]

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.getSkills().subscribe((data: any[]) =>{
      this.skillList = data;
      this.fullSkillList = data;
    })
  }

  filterSkillList(){
    let tempListHolder = this.fullSkillList
    let finalListHolder = []
    //character name filter
    tempListHolder.forEach(skill => {
      let condition = this.filterConditions[0]
      if(condition == "All"){
        finalListHolder.push(skill)
      }else if(skill.character == condition){
        finalListHolder.push(skill)
      }
    })
    tempListHolder = finalListHolder
    finalListHolder = []

    //rarity filter
    tempListHolder.forEach(skill => {
      let condition = this.filterConditions[1]
      if(condition == "All"){
        finalListHolder.push(skill)
      }else if(condition == "MR"||condition == "SR"){
        if(skill.rarity.includes(condition)){
          finalListHolder.push(skill)
        }
      }else if(skill.rarity == condition){
        finalListHolder.push(skill)
      }
    })
    tempListHolder = finalListHolder
    finalListHolder = []

    //type filter
    tempListHolder.forEach(skill => {
      let condition = this.filterConditions[2]
      if(condition == "All"){
        finalListHolder.push(skill)
      }else if(skill.type.includes(condition)){
        finalListHolder.push(skill)
      }
    })
    tempListHolder = finalListHolder
    finalListHolder = []

    //function filter
    tempListHolder.forEach(skill => {
      let condition = this.filterConditions[3]
      if(condition == "All"){
        finalListHolder.push(skill)
      }else if(skill.function.includes(condition)){
        finalListHolder.push(skill)
      }
    })

    this.skillList = finalListHolder;
  }


  // filterSkills(){
  //   let listHolder = []
  //   this.fullSkillList.forEach(skill => {
  //     let condition = this.filterConditions[0]
  //     if(condition == "All" || skill.character == condition){
  //       condition = this.filterConditions[1]
  //       if(condition == "All" || ((condition == "MR"||condition == "SR") && skill.rarity.includes(condition)) || skill.rarity == condition){
  //         condition = this.filterConditions[2]
  //         if(condition == "All" || skill.type == condition){
  //           condition = this.filterConditions[2]
  //           if(condition == "All" || skill.function == condition){
  //             listHolder.push(skill)
  //           }
  //         }
  //       }
  //     }
  //   });
  //   console.log(listHolder)
  //   this.skillList = listHolder;
  // }

}
