import { Component, Input } from '@angular/core';
import { latestForRent } from '../../../../shared/interface/property';
import { PropertyService } from '../../../../shared/services/property.service';
import { TitleComponent } from '../../../../shared/components/ui/title/title.component';
import { PropertyBoxComponent } from '../../../../shared/components/common/property-box/property-box.component';
import { CommonModule } from '@angular/common';
import { PropertyBoxTwoComponent } from "../../../../shared/components/common/property-box/property-box-two/property-box-two.component";

@Component({
  selector: 'app-enterprise-latest-property',
  standalone: true,
  imports: [PropertyBoxComponent, TitleComponent, CommonModule, PropertyBoxTwoComponent],
  templateUrl: './enterprise-latest-property.component.html',
  styleUrls: ['./enterprise-latest-property.component.scss'],
})
export class EnterpriseLatestPropertyComponent {

  @Input() tagClass: string;
  @Input() latestForRentData: latestForRent[];

  public desc = 'Decouvrir nos dernier bien ';
  public title = 'enterprise';

  constructor(public propertyService: PropertyService){}

}
