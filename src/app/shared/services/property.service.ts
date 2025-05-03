import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { agency, agencyData, agentsData, agentsDetails, bannerData, blogDetailsData, brandData, currency, faqData, featuredPropertyData, happyClientsData, homeSectionData, latestBlogData, latestForRent, latestForRentData, latestForSale, latestForSaleData, newOfferData, peopleSayData, pricingPlanData, privacyData, propertyCityData, propertyOfDayData, providedServicesData, sliderData, termsData } from '../interface/property';
import { property } from '../interface/property';


@Injectable({
  providedIn: 'root',
})

export class PropertyService {
  private apiUrl = 'http://admin.arairabat.ma/api/properties';
//   private apiUrl = 'assets/data/property.json';
  private apiCarousel = 'assets/data/carousel.json'
  constructor(private http: HttpClient) { }


  getProperties(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPropertyById(id: string): Observable<property | undefined> {
      return this.http.get<property>(`http://admin.arairabat.ma/api/properties/${id}`);
  }

 /* getPropertyById(id: string): Observable<property | undefined> {
    return this.getProperties().pipe(
      map((properties: property[]) => properties.find((property) => property.id.toString() === id))
    );
  }*/

  getAgencyById(id: string): Observable<agency | undefined> {
    return this.getAgencies().pipe(
      map((properties: agency[]) => properties.find((property) => property.id.toString() === id))
    );
  }

  getAgenciesCarousel():Observable<any[]> {
    return this.http.get<any[]>(this.apiCarousel)
  }

  searchProperties(filters: {
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minSurface?: number;
    maxSurface?: number;
    rooms?: number;
    beds?: string;
    propertyStatus?: string;
    country?: string;
    neighborhood?: string;
    bath?: string;
    agencyName?: string;
  }): Observable<property[]> {
    // Set up HTTP params based on the filters
    let params = new HttpParams();

    if (filters.type) params = params.append('type', filters.type);
    if (filters.city) params = params.append('city', filters.city);
    if (filters.minPrice) params = params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params = params.append('maxPrice', filters.maxPrice.toString());
    if (filters.minSurface) params = params.append('minSurface', filters.minSurface.toString());
    if (filters.maxSurface) params = params.append('maxSurface', filters.maxSurface.toString());
    if (filters.rooms) params = params.append('rooms', filters.rooms.toString());
    if (filters.beds) params = params.append('beds', filters.beds);
    if (filters.propertyStatus) params = params.append('propertyStatus', filters.propertyStatus);
    if (filters.country) params = params.append('country', filters.country);
    if (filters.neighborhood) params = params.append('neighborhood', filters.neighborhood);
    if (filters.bath) params = params.append('bath', filters.bath);
    if (filters.agencyName) params = params.append('agencyName', filters.agencyName);

    // Make the HTTP GET request with the filters
    return this.http.get<property[]>(this.apiUrl, { params });
  }


  public currencyItem :any = localStorage.getItem('currency');
  public currency : currency = JSON.parse(this.currencyItem)

  public Currency = this.currency || { name: 'Dollar', currency: 'USD',symbol: "$", price: 1 }


  // Méthode pour récupérer les statuts de propriété
  getPropertyStatus(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/property-status.json'); // Remplacez par votre chemin d'API
  }

  // Méthode pour récupérer les types de propriété
  getPropertyType(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/property-types.json'); // Remplacez par votre chemin d'API
  }

  // Méthode pour récupérer le nombre de chambres
  getRooms(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/rooms.json'); // Remplacez par votre chemin d'API
  }

  // Méthode pour récupérer le nombre de lits
  getBeds(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/beds.json'); // Remplacez par votre chemin d'API
  }

  // Méthode pour récupérer le nombre de bains
  getBaths(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/baths.json'); // Remplacez par votre chemin d'API
  }

  // Méthode pour récupérer les agences
  getAgencies(): Observable<agency[]> {
    return this.http.get<agency[]>('assets/data/agencies.json'); // Remplacez par votre chemin d'API
  }

  // Home Slider Data
  homeSliderData(): Observable<homeSectionData> {
    return this.http.get<homeSectionData>('assets/data/home-section-slider.json');
  }

  // Latest For Sale
  propertyData(): Observable<latestForSaleData> {
    return this.http.get<latestForSaleData>('assets/data/latest-for-sale.json');
  }

  // Featured Property Data
  featuredPropertyData(): Observable<featuredPropertyData> {
    return this.http.get<featuredPropertyData>('assets/data/featured-property.json');
  }

  // Latest For Rent
  latestForRentData(): Observable<latestForRentData> {
    return this.http.get<latestForRentData>('assets/data/latest-for-rent.json');
  }

  // New Offer Data
  newOfferData(): Observable<newOfferData> {
    return this.http.get<newOfferData>('assets/data/new-offer.json');
  }

  // Property In City
  propertyInCityData(): Observable<propertyCityData> {
    return this.http.get<propertyCityData>('assets/data/property-in-city.json');
  }

  // Banner
  bannerData(): Observable<bannerData> {
    return this.http.get<bannerData>('assets/data/banner.json');
  }

  // Agents Data
  agentsData(): Observable<agentsData> {
    return this.http.get<agentsData>('assets/data/agents.json');
  }

  // Happy Clients Data
  happyClientsData(): Observable<happyClientsData> {
    return this.http.get<happyClientsData>('assets/data/happy-clients.json');
  }

  // Brand Data
  brandData(): Observable<brandData> {
    return this.http.get<brandData>('assets/data/brand.json');
  }

  // Provided Services
  providesServices(): Observable<providedServicesData> {
    return this.http.get<providedServicesData>('assets/data/provided-services.json');
  }

  // Pricing Plan
  pricingPlanData(): Observable<pricingPlanData> {
    return this.http.get<pricingPlanData>('assets/data/pricing-plan.json');
  }

  // Latest Blog
  latestBlogData(): Observable<latestBlogData> {
    return this.http.get<latestBlogData>('assets/data/latest-blog.json');
  }

  // Property Of Day
  propertyOfDayData(): Observable<propertyOfDayData> {
    return this.http.get<propertyOfDayData>('assets/data/property-of-day.json');
  }

  // People Say
  peopleSayData(): Observable<peopleSayData> {
    return this.http.get<peopleSayData>('assets/data/people-say.json');
  }

  // Property Details
  propertyDetailsData(): Observable<any> {
    return this.http.get<any>('assets/data/property-details.json');
  }

  // Blog DetailsData
  blogDetailsData(): Observable<blogDetailsData> {
    return this.http.get<blogDetailsData>('assets/data/blog-details.json');
  }

  // Agency Data
  agencyData(): Observable<agencyData> {
    return this.http.get<agencyData>('assets/data/agency.json');
  }

  // FAQ Data
  faqData(): Observable<faqData> {
    return this.http.get<faqData>('assets/data/faq.json');
  }

  // Terms Condition Data
  termsConditionData(): Observable<termsData> {
    return this.http.get<termsData>('assets/data/terms-condition.json');
  }

  // Privacy Policy Data
  privacyPolicyData(): Observable<privacyData> {
    return this.http.get<privacyData>('assets/data/privacy-policy.json');
  }

  // Agents Details Data
  agentsDetailsData(): Observable<agentsDetails> {
    return this.http.get<agentsDetails>('assets/data/agents-data.json');
  }

  // Slider Data For Image Content Page
  public getSliderData(): Observable<sliderData>{
    return this.http.get<sliderData>('assets/data/slider.json')
  }

  // Filter Property
  public filterData: latestForRent;
  public filterPropertyData(filter: any): Observable<any>{
    return this.latestForRentData().pipe(map((property) =>
      property.latestForRent.filter((item:latestForRent) => {
        if (!filter.length){
          if(item.params){
            return true;
          }
        }
        this.filterData = filter.find((prev: string) => {
            if (item.params) {
              if (item.params.includes(prev)) {
                return prev;
              }
            }
            return
          });
        return this.filterData;
      })
    ))
}

  // For Get Images By ID
  public imageData: latestForSale[];
  public propertyDetail: latestForRent[]
  public getImage(id: any): Observable<any>{
    if(id && id.includes('b')){
      return this.propertyData().pipe(map((property) =>
        this.imageData = property.latestForSale.filter((data) => {
          return data.id == id
      })
    ))
  }else {
      return this.latestForRentData().pipe(map((property) =>
        this.propertyDetail = property.latestForRent.filter((data) => {
          return data.id == id
        })
      ))
    }
  }

  // Get Property Details
  public propertyDetails: latestForRent[];
  public getPropertyDetail(id:number): Observable<latestForRent[]>{
      return this.latestForRentData().pipe(map((property) =>
      this.propertyDetails = property.latestForRent.filter((data) => {
        return data.id == id
      })
    ))
  }


  // Pagination
  public getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 6
  ) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
}
