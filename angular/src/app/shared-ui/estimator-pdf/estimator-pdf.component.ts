import { Component, Input, OnInit } from '@angular/core';
import { JwtService } from '..';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-estimator-pdf',
  templateUrl: './estimator-pdf.component.html',
  styleUrls: ['./estimator-pdf.component.scss']
})
export class EstimatorPdfComponent implements OnInit {
  @Input() calculationData: any;
  calculationType: any = environment.calculationType;

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.calculationData.currentUser = this.jwtService.getCurrentUser();
  }
}
