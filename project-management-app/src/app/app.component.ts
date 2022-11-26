import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiAuthService } from './auth/services/api/api.service';
import { AuthStateService } from './auth/services/auth-state/auth-state.service';
import { UrlService } from './auth/services/url/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  previousUrl = '';

  currentUrl!: string;

  constructor(
    private api: ApiAuthService,
    private router: Router,
    private url: UrlService,
    private userStatus: AuthStateService,
  ) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe({
      error: () => {
        this.router.navigate(['/']);
        localStorage.removeItem('token');
        this.userStatus.setAuthState(false);
      },
      complete: () => this.router.navigate(['/main']),
    });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      this.url.setPreviousUrl(this.previousUrl);
      this.url.setCurrentUrl(this.currentUrl);
    });
  }
}
