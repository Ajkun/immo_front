import { Component } from '@angular/core';
import { contactDetailsData } from '../../../shared/data/contact-us';
import { ContactUsFormComponent } from "../widgets/contact-us-form/contact-us-form.component";
import { BreadcrumbComponent } from "../../../shared/components/ui/breadcrumb/breadcrumb.component";
import { ContactDetailsComponent } from "../widgets/contact-details/contact-details.component";

@Component({
    selector: 'app-contact-us3',
    standalone: true,
    templateUrl: './contact-us3.component.html',
    styleUrls: ['./contact-us3.component.scss'],
    imports: [ContactUsFormComponent, BreadcrumbComponent, ContactDetailsComponent]
})
export class ContactUs3Component {

  public themeLogo = 'assets/images/logo/2.png';
  public footerLogo = 'assets/images/logo/arai-logo.png';
  public bgImage = 'assets/images/contact-us-backgroud.webp';
  public title = 'Contact Us';
  public parent = 'Home';
  public child = 'Contact Us';

  public contactDetailsData = contactDetailsData;

  public theme_default3 = '#ff0000';
  public theme_default4 = '#ff0000';

  public detailsArray = ['where', 'second_branch', 'online_service'];

  ngOnInit() {
    document.documentElement.style.setProperty('--theme-default', this.theme_default3);
    document.documentElement.style.setProperty('--theme-default3', this.theme_default3);
    document.documentElement.style.setProperty('--theme-default4', this.theme_default4);

    if (Array.isArray(this.detailsArray)) {
      if (Array.isArray(this.contactDetailsData)) {
        this.contactDetailsData = this.contactDetailsData.filter((data) =>
          this.detailsArray.includes(data.value)
        );
      }
    }
  }

  ngOnDestroy(): void {
    document.documentElement.style.removeProperty('--theme-default');
    document.documentElement.style.removeProperty('--theme-default3');
    document.documentElement.style.removeProperty('--theme-default4');
  }
}
