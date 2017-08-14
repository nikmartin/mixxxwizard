import { Component, OnInit } from '@angular/core';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent implements OnInit {
  public genres: any = [];

  constructor(private gs: GenresService) {}

  ngOnInit() {
    this.gs.getAllGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

  doSomething(genre) {
    console.log(genre);
  }
}
