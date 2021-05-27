import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, Validators } from '@angular/forms';

export interface Result {
  trackName: string;
  artistName: string;
  collectionName: string;
}

const RESPONSE: Result[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  searchValue = "";
  // variable used to hide or show the results card
  resultsFound = 0;
  showResultsCard = false;
  constructor(private apiService: ApiService) { }

  @ViewChild("searchInput", {static: false}) nameField: ElementRef;

  clearSearchResults() {
    // clears search results and table dataSource
    this.searchTerm = new FormControl('', [
      Validators.required
    ]);
    this.dataSource = RESPONSE;
    this.resultsFound = 0;
    this.showResultsCard = false;
    // shifts focus to the search input field
    this.nameField.nativeElement.focus();
  }

  search() {
    // if statement to prevent API execution when the input field is left blank
    if (this.searchTerm.hasError('required')) {
      this.clearSearchResults();
      return;
    } else {
      this.searchValue = this.searchTerm.value
      this.apiService.search(this.searchValue).subscribe((data: any) => {  
        this.dataSource = data.results;
        // calculates the results object length to determine which modules to show
        this.resultsFound = this.dataSource.length
        this.showResultsCard = true;
      })
    }
  }
  
  // set table column headers
  displayedColumns = ['trackName', 'artistName', 'collectionName'];
  dataSource = RESPONSE;

  // reactive form control for the searchTerm input field
  searchTerm = new FormControl('', [
    // prevents a blank submission
    Validators.required
  ]);
}

