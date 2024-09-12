import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  leads: any[] = [];
  errorMessage: string = '';
  totalLeads: number = 0;
  searchQuery: string = '';
  pageNo: number = 1;
  limit: number = 10;
  totalPages: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = this.getAuthToken();
    if (!token) {
      this.errorMessage = 'Unauthorized access';
      return;
    }

    this.fetchLeads(token); // Initially fetch all leads
  }

  // Utility function to get the auth token
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Fetch All Leads
  fetchLeads(token: string) {
    const requestBody = {
      id: 501,
      name: this.searchQuery,
      priority: "",
      lead_type: "all", 
      isUntouched: 0,
      source: "",
      sdate: "",
      edate: "",
      uStartDate: "",
      uEndDate: "",
      user_role: 1,
      vc: 0,
      page_no: this.pageNo,
      limit: this.limit,
      accessAllLeads: 1
    };

    this.http.post('https://dev-cc.automateazy.com/api/v1/getLeads', requestBody, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (response: any) => {
        this.leads = response.data;
        this.totalLeads = response.totalLeads || 0;
        this.totalPages = Math.ceil(this.totalLeads / this.limit);
      },
      (error) => {
        this.errorMessage = 'Failed to fetch leads.';
        console.error(error);
      }
    );
  }

  // Method to handle search functionality
  searchLeads() {
    this.pageNo = 1;
    const token = this.getAuthToken();
    if (token) {
      this.fetchLeads(token); // Fetch all leads based on search query
    } else {
      this.errorMessage = 'Unauthorized access';
    }
  }

  // Pagination Logic
  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.pageNo = newPage;
    const token = this.getAuthToken();
    if (token) {
      this.fetchLeads(token); // Fetch the leads for the new page
    } else {
      this.errorMessage = 'Unauthorized access';
    }
  }

  // Fetch Favorite Leads
  fetchFavoriteLeads() {
    const token = this.getAuthToken();
    if (!token) {
      this.errorMessage = 'Unauthorized access';
      return;
    }

    const requestBody = {
      id: 501,
      name: "",
      priority: "",
      lead_type: "fav",  // Lead type as 'fav' for favorite leads
      isUntouched: 0,
      source: "",
      sdate: "",
      edate: "",
      uStartDate: "",
      uEndDate: "",
      user_role: 1,
      vc: 0,
      page_no: this.pageNo,
      limit: this.limit
    };

    this.http.post('https://dev-cc.automateazy.com/api/v1/getLeads', requestBody, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (response: any) => {
        this.leads = response.data;
        this.totalLeads = response.totalLeads || 0;
        this.totalPages = Math.ceil(this.totalLeads / this.limit);
      },
      (error) => {
        this.errorMessage = 'Failed to fetch favorite leads.';
        console.error(error);
      }
    );
  }
}
