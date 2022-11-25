import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from './auth/services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private api: ApiAuthService, private router: Router) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe({
      next: () => this.router.navigate(['/main']),
      error: () => {
        this.router.navigate(['/']);
        localStorage.removeItem('token');
      },
    });
  }
}
