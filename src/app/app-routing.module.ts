import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/components/login/login.component';
import { ProtectedPageComponent } from './modules/protected-page/components/protected-page/protected-page.component';
import { authGuard } from './core/guards/auth.guard';
import { alreadyGuard } from './core/guards/alreadyAuth.guard';
import { NotFoundComponent } from './modules/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [alreadyGuard] },
  { path: 'welcome', component: ProtectedPageComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
