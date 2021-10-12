import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { loggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private loggningService: loggingService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.loggningService.printLog('Hello from the appComponent ngOnInti');
  }
}
