import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './pages/nx-welcome';
import { Home } from './pages/home/home';

@Component({
  imports: [Home, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-demo';
}
