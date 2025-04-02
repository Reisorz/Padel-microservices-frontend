import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-search-match',
  standalone: true,
  imports: [RouterModule, CommonModule, ToastrModule],
  templateUrl: './search-match.component.html',
  styleUrl: './search-match.component.css'
})
export class SearchMatchComponent {

}
