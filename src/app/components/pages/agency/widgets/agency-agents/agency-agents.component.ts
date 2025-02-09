import { Component, Input } from '@angular/core';
import { agencies, agency, agencyAgent } from '../../../../../shared/interface/property';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agency-agents',
  standalone: true,
  imports:[RouterModule,CommonModule],
  templateUrl: './agency-agents.component.html',
  styleUrls: ['./agency-agents.component.scss'],
})
export class AgencyAgentsComponent {

  @Input() agentsData: agencyAgent;
  @Input() agency : agency;
  
  public isMobile: boolean = false;
  public mobileNumber: string

  ngOnInit(){
    this.mobileNumber = this.agency.mobile.replace(
      this.agency.mobile.slice(-4), '****' );
  }

  showMobile(data: agency){
    this.isMobile =! this.isMobile;
    if(this.isMobile){
      this.mobileNumber = data.mobile
    }else{
      this.mobileNumber = data.mobile.replace(data.mobile.slice(-4),"****");
    }
  }

}

