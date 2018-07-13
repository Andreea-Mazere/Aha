import { Routes } from "@angular/router";
import { WordsComponent } from "./words/words.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StudentCanActivateGuard } from "./common/guards/student-can-activate.guard";
import { ContentComponent } from "./content/content.component";
import { AdminCanActivateGuard } from "./common/guards/admin-can-activate.guard";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
    {
      path: 'words',
      component: WordsComponent,
      canActivate: [StudentCanActivateGuard]
    },
    {
        path: 'content',
        component: ContentComponent,
        canActivate: [AdminCanActivateGuard]
      },
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent
    }, 
    { 
      path: '**', 
      component: PageNotFoundComponent 
    }
  ];