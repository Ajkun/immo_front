import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Gallery, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { latestForRent } from '../../../../../shared/interface/property';
import { PropertyBoxGridService } from '../../../../../shared/services/property-box-grid.service';
import { PropertyService } from '../../../../../shared/services/property.service';
import { addCompareItem } from '../../../../../shared/store/actions/compare.action';
import { addWishlistItem } from '../../../../store/actions/wishlist.action';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { FeatherIconsComponent } from '../../../ui/feather-icons/feather-icons.component';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-box-two',
  standalone: true,
  imports:[ImageSliderComponent,FeatherIconsComponent,CurrencySymbolPipe,CommonModule,RouterModule],
  templateUrl: './property-box-two.component.html',
  styleUrls: ['./property-box-two.component.scss'],
})

export class PropertyBoxTwoComponent implements OnInit {
  properties: any[] = [];
  mainDisplay: string = 'standard';
  itemDisplay: string = 'standard-item';
  @Input() typeDisplayValue: string; 

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadProperties();
    this.typeDisplay(this.typeDisplayValue);
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe(
      (data : any) => { // response
        this.properties = data; // Stocke les propriétés récupérées
      // console.log(data)
      },
      (error) => {
        console.error('Erreur lors de la récupération des propriétés', error);
      }
    );
  }

  typeDisplay(typeDisplayValue: any){
    if(typeDisplayValue == "menu") {
      this.mainDisplay = "menu";
      this.itemDisplay = "menu-standard-item";
    }
    if(typeDisplayValue == "property"){
      this.mainDisplay = "menu";
      this.itemDisplay = "property-item";
    }
  }
}
