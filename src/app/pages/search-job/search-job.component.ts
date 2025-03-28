import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from '../../elements/dropdown/dropdown.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Job, SearchJobService } from './search-job.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, of, Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

interface type {
  title: string,
  company: string,
  companylogo: string,
  salary: string,
  location: string,
  url: string,
}
@Component({
  selector: 'app-search-job',
  standalone: true,
  imports: [
    RouterLink,
    DropdownComponent,
    HttpClientModule,
    JsonPipe
  ],
  providers: [
    SearchJobService
  ],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css'
})
export class SearchJobComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>(); // For takeUntil

  constructor(
    private searchJobService: SearchJobService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log("ngOnInit() {...");

    this.searchJobService.getAllJobs().pipe(
      takeUntil(this.unsubscribe$),
      catchError((error: HttpErrorResponse) => {
        console.error('Job fetch error:', error);
        return of(null);
      }),
      finalize(() => {
        // this.isLoading = false;
      }),
      tap((jobs: any) => {
        // if (jobs) {
          // this.jobs = jobs;
        // }
        this.myJobs = jobs;
      })
    ).subscribe({
      next(jobs: any) {
        console.log('Current jobs: ', jobs);
      },
      error(msg) {
        console.log('Error Getting jobs: ', msg);
      }
    });
  }

  myJobs: Job[] = [] as Job[];

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openCenter(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  dropdown_item = {
    select: 'Newest',
    value: ['Newest', 'Latest', 'Oldest'],
    image: ['assets/images/svg/arrow-down-short.svg']
  }

  jobs: type[] = [
    {
      title: "Senior UX Designer",
      company: "Highspeed Studios",
      companylogo: "assets/images/companylogo/1.svg",
      salary: "$14,000 - $25,000",
      location: "London, England",
      url: "admin/profile",
    },
    {
      title: "Intern UX Designer",
      company: "Maximoz Team",
      companylogo: "assets/images/companylogo/2.svg",
      salary: "$500 - $1,000",
      location: "Manchester, England",
      url: "admin/profile",
    },
    {
      title: "Junior UX Designer",
      company: "Vvibu Leu Boz Studios",
      companylogo: "assets/images/companylogo/3.svg",
      salary: "$8,000 - $12,000",
      location: "Oxford, England",
      url: "admin/profile",
    },
    {
      title: "Principal UX Designer",
      company: "Lowvoltages Team",
      companylogo: "assets/images/companylogo/4.svg",
      salary: "$11,000 - $60,000",
      location: "London, England",
      url: "admin/profile",
    },
    {
      title: "Senior UX Designer",
      company: "Highspeed Studios",
      companylogo: "assets/images/companylogo/5.svg",
      salary: "$500 - $1,000",
      location: "London, England",
      url: "admin/profile",
    },
  ]
}
