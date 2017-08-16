import { Component, OnInit } from '@angular/core';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent implements OnInit {
  public genres: any = [];
  public dupeGenres: any = [];
  public destGenre: any;
  public simpleDrop: any = null;
  constructor(private gs: GenresService) {}

  ngOnInit() {
    this.gs.getAllGenres().subscribe(genres => {
      this.genres = genres;
      this.dupeGenres = [];
      this.destGenre = null;
    });
  }

  setDestGenre(event) {
    console.log('Dest Genre: ', event);
    this.destGenre = event.dragData;
  }
  setDupeGenre(event) {
    console.log('Dupe Genre: ', event);
    this.dupeGenres.push(event.dragData);
  }
  doMerge() {
    let mergeObj = {
      destGenre: this.destGenre,
      dupeGenres: this.dupeGenres,
    };
    this.gs.mergeGenres(mergeObj).subscribe(msg => {
      console.log(msg);
      this.ngOnInit();
    });
  }
}
