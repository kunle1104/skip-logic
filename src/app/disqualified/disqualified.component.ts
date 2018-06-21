import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disqualified',
  templateUrl: './disqualified.component.html',
  styleUrls: ['./disqualified.component.css']
})
export class DisqualifiedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  home(){
    this.router.navigate(['/']);
  }
}
