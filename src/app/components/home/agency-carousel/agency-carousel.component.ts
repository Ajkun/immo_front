import { Component, OnInit } from '@angular/core';
import { agencies } from '../../../shared/interface/property';
import { PropertyService } from '../../../shared/services/property.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agency-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agency-carousel.component.html',
  styleUrl: './agency-carousel.component.scss'
})
export class AgencyCarouselComponent implements OnInit {

  constructor(private propertyService: PropertyService) {}

  agencies:  agencies[] = []
  duplicatedAgencies: agencies[] = [];
  currentIndex: number = 0;



  ngOnInit(): void {

    this.propertyService.getAgenciesCarousel().subscribe(
      (data : any) => { // response
        this.agencies = data; // Stocke les propriétés récupérées
        this.duplicatedAgencies = [...data, ...data];
       console.log(this.agencies)
      },
      (error) => {
        console.error('Erreur lors de la récupération des propriétés', error);
      }
    )
    // Set an interval to scroll through agencies
    setInterval(() => {
      this.scrollAgencies();
    }, 3000); // Adjust the interval as needed
  }

  scrollAgencies(): void {
    this.currentIndex++;
    const container = document.querySelector('.agency-container') as HTMLElement;
    if (container) {
      container.style.transition = 'transform 0.5s ease';
      container.style.transform = `translateX(-${this.currentIndex * 210}px)`; // Adjust translate value

      // Reset loop when reaching halfway
      if (this.currentIndex >= this.agencies.length) {
        setTimeout(() => {
          container.style.transition = 'none'; // Remove transition for instant reset
          this.currentIndex = 0;
          container.style.transform = `translateX(0px)`;
        }, 500); // Match the duration of the transition
      }
    }
  }

}
