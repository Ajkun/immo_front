import { Component, Input } from '@angular/core';
import { FeatherIconsComponent } from '../../../../shared/components/ui/feather-icons/feather-icons.component';
import { latestForRent, property } from '../../../../shared/interface/property';
import { CurrencySymbolPipe } from '../../../../shared/pipe/currency-symbol.pipe';
import { PropertyService } from '../../../../shared/services/property.service';

@Component({
  selector: 'app-home-details',
  standalone: true,
  imports: [FeatherIconsComponent, CurrencySymbolPipe],
  templateUrl: './home-details.component.html',
  styleUrls: ['./home-details.component.scss'],
})
export class HomeDetailsComponent {

  @Input() propertyDetails: latestForRent;
  @Input() property: property | undefined;


  constructor(public propertyService: PropertyService) { }

  print() {
    window.print()
  }

  onOnit() {
    console.log(this.property)
  }
}
