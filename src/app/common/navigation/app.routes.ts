import { Routes } from "@angular/router";
import { WordsComponent } from "../../practice/words/words.component";
import { PageNotFoundComponent } from "../../common/page-not-found/page-not-found.component";
import { StudentCanActivateGuard } from "../../common/navigation/guards/student-can-activate.guard";
import { ContentComponent } from "../../content/content.component";
import { DynamicHomeGuard } from "./guards/dynamic-home-guard";
import { AdminCanActivateGuard } from "./guards/admin-can-activate.guard";
import { AuthenticatedUserCanActivateGuard } from "./guards/authenticated-user-can-activate.guard";
import { WordsComponent as ContentWordsComponent } from "../../content/words/words.component";
import { ProfileComponent } from "../../profile/profile.component";


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
        path: 'content/words/:search/:word',
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