import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  template: `<span [innerHTML]="svgIcon"></span>`,
//   styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnInit {

  @Input()
  public name?: string;

  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    ) {
  }

  public ngOnInit(): void {
    this.httpClient
      .get(`assets/svg/${this.name}.svg`, { responseType: 'text' })
      .subscribe(value => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }

}