import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { latestForRent, property, propertyDetailsData } from '../../../shared/interface/property';
import { PropertyService } from '../../../shared/services/property.service';
import { imageState } from '../../../shared/store/states/property-images.state';
import { getImages } from '../../../shared/store/actions/property-images.action';
import { HomeDetailsComponent } from "../widgets/home-details/home-details.component";
import { PropertyComponent } from "../widgets/property/property.component";
import { RelatedPropertyComponent } from "../widgets/related-property/related-property.component";
import { AdvanceFilterComponent } from "../../../shared/components/common/advance-filter/advance-filter.component";
import { PropertyImageBoxHomeSectionComponent } from './property-image-box-home-section/property-image-box-home-section.component';

@Component({
    selector: 'app-property-image-box',
    standalone: true,
    templateUrl: './property-image-box.component.html',
    styleUrls: ['./property-image-box.component.scss'],
    imports: [HomeDetailsComponent, PropertyComponent, RelatedPropertyComponent, 
      AdvanceFilterComponent, PropertyImageBoxHomeSectionComponent
    ]
})

export class PropertyImageBoxComponent {

  public themeLogo = 'assets/images/logo/4.png';
  public darkHeaderLogo = 'assets/images/logo/9.png';
  public footerLogo = 'assets/images/logo/arai-logo.png';

  public propertyDetailsData: propertyDetailsData;
  public propertyData: propertyDetailsData;
  public getId: string;
  public imageID:latestForRent[];

  public dataArray = ['about','feature','gallery','video','floor_plan','location'];

  public theme_default3 = '#ff0000';
  public theme_default4 = '#ff0000';


  public property : property | undefined;
  public properties : property[];

  @Select(imageState.images) image$: Observable<latestForRent[]>;

  constructor(private propertyService: PropertyService,private route: ActivatedRoute,private store: Store) {
    this.route.queryParams.subscribe((params) => {
      this.getId = params['id']
    })

    this.store.dispatch(new getImages(this.getId));

    this.image$.subscribe((res) => {
      if(res){
        this.imageID = res
      }
    })
  }

  ngOnInit() {
    document.documentElement.style.setProperty('--theme-default', this.theme_default3);
    document.documentElement.style.setProperty('--theme-default3', this.theme_default3);
    document.documentElement.style.setProperty('--theme-default4', this.theme_default4);

    this.propertyService.propertyDetailsData().subscribe((response) => {
      this.propertyData = response;

      if (Array.isArray(this.dataArray)) {
        if (Array.isArray(response.data)) {
          this.propertyDetailsData = response.data.filter(
            (tabData: { value: string }) =>
              this.dataArray?.includes(tabData.value)
          );
        }
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProperty(id);
      }
    });   
  }

  loadProperty(id: string) {
    this.propertyService.getPropertyById(id).subscribe(
      (data) => {
        this.property = data;
       // console.log(data)
      },
      (error) => {
        console.error('Erreur lors de la récupération de la propriété', error);
      }
    );
  }

  ngOnDestroy(): void {
    document.documentElement.style.removeProperty('--theme-default');
    document.documentElement.style.removeProperty('--theme-default3');
    document.documentElement.style.removeProperty('--theme-default4');
  }
}
