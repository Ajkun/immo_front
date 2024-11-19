import { Component } from '@angular/core';
import { ModulesLabelData } from '../../../shared/data/modules';
import { BreadcrumbComponent } from '../../../shared/components/ui/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-modules-label',
  standalone: true,
  imports:[BreadcrumbComponent],
  templateUrl: './modules-label.component.html',
  styleUrls: ['./modules-label.component.scss'],
})
export class ModulesLabelComponent {

  public themeLogo = 'assets/images/logo/2.png';
  public footerLogo = 'assets/images/logo/arai-logo.png';
  public bgImage = 'assets/images/inner-background.jpg';
  public title = 'Label';
  public parent = 'Modules';
  public child = 'Label';

  public ModulesLabelData = ModulesLabelData;

  public theme_default3 = '#ff0000';
  public theme_default4 = '#ff0000';

}
