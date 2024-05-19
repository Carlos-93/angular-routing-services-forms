import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MacbookComponent } from './pages/macbook/macbook.component';
import { IpadComponent } from './pages/ipad/ipad.component';
import { IphoneComponent } from './pages/iphone/iphone.component';
import { WatchComponent } from './pages/watch/watch.component';
import { AirpodsComponent } from './pages/airpods/airpods.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'macbook', component: MacbookComponent },
    { path: 'ipad', component: IpadComponent },
    { path: 'iphone', component: IphoneComponent },
    { path: 'watch', component: WatchComponent },
    { path: 'airpods', component: AirpodsComponent },
    { path: 'admin', component: DashboardComponent }
];