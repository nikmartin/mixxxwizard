import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenresComponent } from './genres/genres.component';

const routes = [{ path: 'genres', component: GenresComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })], // <-- debugging purposes only
  exports: [RouterModule],
})
export class AppRoutingModule {}
