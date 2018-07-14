import { Routes } from "@angular/router";
import { WordsComponent } from "./words/words.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StudentCanActivateGuard } from "./common/guards/student-can-activate.guard";
import { ContentComponent } from "./content/content.component";
import { DynamicHomeGuard } from "./common/guards/dynamic-home-guard";
import { AdminCanActivateGuard } from "./common/guards/admin-can-activate.guard";

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
      // DynamicHomeGuard ignores whatever component we pass in here and redirects
      component: PageNotFoundComponent, 
      canActivate: [DynamicHomeGuard]
    }, 
    { 
      path: '**', 
      component: PageNotFoundComponent 
    }
  ];