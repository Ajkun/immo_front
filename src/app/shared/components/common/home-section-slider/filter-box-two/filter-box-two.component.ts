import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { baths, beds, propertyType, rooms, moroccanCities, zones, districts } from '../../../../data/advance-filter';
import { PropertyService } from '../../../../services/property.service';
import { property } from '../../../../interface/property';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-box-two',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './filter-box-two.component.html',
  styleUrls: ['./filter-box-two.component.scss']
})

export class FilterBoxTwoComponent {

  constructor(private propertyService: PropertyService){}

  public propertyType = propertyType;
  public rooms = rooms;
  public beds = beds;
  public baths = baths;
  public cities = moroccanCities;
  public zones = zones;
  public districts = districts;
  public properties : property[];
  
  searchFilters: { [key: string]: string | number | undefined } = {
    type: '',
    city: '',
    minPrice: undefined,
    maxPrice: undefined,
    minSurface: undefined,
    maxSurface: undefined,
    rooms: undefined,
    beds: '',
    propertyStatus: '',
    country: '',
    neighborhood: '',
    bath: '',
    agencyName: ''
  };



  ngOnInit(): void {
    
  }

  updateFilter(event: Event, key: string): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchFilters[key] = value;
    console.log(this.searchFilters)
  }

  searchProperties(): void {
    
    
  /*  this.propertyService.searchProperties(this.searchFilters).subscribe(
      (data: property[]) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );*/
  }



}
