import { Component, OnInit, TemplateRef} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from '../../elements/dropdown/dropdown.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Job, SearchJobService } from './search-job.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-job',
  standalone: true,
  imports: [
    RouterLink,
    DropdownComponent,
    HttpClientModule
  ],
  providers: [
    SearchJobService
  ],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css'
})
export class SearchJobComponent implements OnInit {
jobs: Job[] = [];

index = 0;

  constructor(
  
    private searchJobService: SearchJobService,

    private modalService: NgbModal
  ) { }
  createJob() {
    let id=this.index;
   
    const title = prompt("Enter the Job Title:", "")?.trim();
    const company = prompt("Enter the Job Description:", "")?.trim();
    const companylogo = "xyz";
    const salary = "20000-50000";
    const url="xyz.com"
    const location = "hamburg";

    if (!title ||  !company ) {
      console.log("Job creation canceled or invalid input.");
      
      return;
    }
    
    const newJob: Job = {id, title,  company, companylogo, salary, url, location };
  
    this.searchJobService.createJob(newJob).subscribe({
      
      next: (newJob) => {
        console.log("Job created successfully:", newJob);
        this.getAllJobs();
      },
      error: (msg:any) => console.log("Error creating job:", msg),
    });
  }
  deleteJob(delID: number) {
    this.searchJobService.deleteJob(delID).subscribe({
      next: () => {
       alert(`Job with ID ${delID} deleted successfully.`);
        this.getAllJobs();
      },
      error: (error) => {
        console.error(`Error deleting job with ID ${delID}:`, error);
      },
      complete: () => {
        console.log("Delete job request completed.");
      }
    });
  }
  editJob(editID: number) {
    const jobToEdit = this.jobs.find(job => job.id === editID);
    if (!jobToEdit) {
      alert('Job not found');
      return;
    }
    let id=editID;
    const title = prompt("Edit Job Title:", jobToEdit.title)?.trim();
    const company = prompt("Edit Company Name:", jobToEdit.company)?.trim();
    const salary = prompt("Edit Salary:", jobToEdit.salary)?.trim();
    const location = prompt("Edit Location:", jobToEdit.location)?.trim();
    const companylogo= (jobToEdit.companylogo?jobToEdit.location: "xyz");
    const url= (jobToEdit.url?jobToEdit.url: "xyz");
    if (!title || !company || !salary || !location) {
      alert("Job editing canceled or invalid input.");
      return;
    }

    const editedJob: Job = {id, title,  company, companylogo, salary, url, location };

    this.searchJobService.editJob(editedJob).subscribe({
      next: (updatedJob) => {
        this.getAllJobs();
        alert("Job updated successfully!");
      },
      error: (msg) => alert("Error updating job: " + msg)
    });
  }
 
  ngOnInit() {
    console.log("ngOnInit() {...");
    // To getAllJobs
  
    this.getAllJobs()
   
  
  }

  getAllJobs() {
    this.searchJobService.getAllJobs().subscribe({
      next: (jobs) => { 
        this.jobs = jobs as any; // Assign jobs data
        this.index = jobs.length + 1;
        console.log('Current jobs: ', this.jobs);
      },
      error: (msg) => {
        console.log('Error Getting jobs: ', msg);
      }
    });
  }

  openCenter(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }
 
  dropdown_item = {
    select: 'Newest',
    value: ['Newest', 'Latest', 'Oldest'],
    image: ['assets/images/svg/arrow-down-short.svg']
  }

  
}
