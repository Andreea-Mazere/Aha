import { Routes } from "@angular/router";
import { WordsComponent } from "./words/words.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StudentCanActivateGuard } from "./common/guards/student-can-activate.guard";
import { ContentComponent } from "./content/content.component";
import { DynamicHomeGuard } from "./common/guards/dynamic-home-guard";
import { AdminCanActivateGuard } from "./common/guards/admin-can-activate.guard";
import { WordsComponent as ContentWordsComponent } from "./content/words/words.component";
import { ProfileComponent } from "./shell/profile/profile.component";
import { AuthenticatedUserCanActivateGuard } from "./common/guards/authenticated-user-can-activate.guard";


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
        path: 'content/words',
        component: ContentWordsComponent, 
        canActivate: [AdminCanActivateGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent, 
        canActivate: [AuthenticatedUserCanActivateGuard]
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