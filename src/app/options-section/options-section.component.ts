import {Component, HostListener, OnInit} from '@angular/core';
import {Doctor} from '../models/Doctor';
import {DoctorProfileInfoService} from '../doctor-profile-template/doctor-profile-info.service';
import {Authentication} from '../_services/Authentication';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ServerRoutes} from '../routes/ServerRoutes';
import {first, map} from 'rxjs/operators';
import {ResponseService} from '../_services/response.service';
import {LocalStorage} from '../routes/LocalStorage';

@Component({
  selector: 'abe-options-section',
  templateUrl: './options-section.component.html',
  styleUrls: ['./options-section.component.scss']
})
export class OptionsSectionComponent extends Authentication implements OnInit {
  drs: Doctor [];
  testImg = '../../assets/doc_pic.jpeg';
  screenHeight:any;
  screenWidth:any;

  constructor(private drService: DoctorProfileInfoService,
              authS: AuthenticationService,
              router: Router,
              private http: HttpClient,
              private respS: ResponseService) {
    super(router);
    // debugger;
    //TODO: change this
    this.findClosest(8);
    this.getScreenSize();
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, this.screenWidth);
  }


  public findClosest(zipcode: number) {
    //Todo: Api call, zipcode sorting
    //TODO: zipcode subscription
    this.getDoctors().pipe(first())
      .subscribe((doctors: Doctor []) => {
          console.log('doctors retreived ' + doctors.length);
          this.drService.storeAllDoctors(doctors);
          this.drs = doctors;
        },
        error => {
          const execute = this.respS.errors.get(error.status);
          execute(this.router);
        });
  }

  private getDoctors() {
    let tkn = localStorage.getItem(LocalStorage.currentUser);
    tkn = JSON.parse(tkn);
    const token: HttpParams = new HttpParams().set('token', tkn);
    return this.http.get<Doctor []>(ServerRoutes.getDoctors,
      {params: token}
    ).pipe(map(doctors => {
        console.log('it got here');
        return doctors;
      }));
  }

}
