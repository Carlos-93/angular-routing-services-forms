import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MacComponent } from './pages/mac/mac.component';
import { IpadComponent } from './pages/ipad/ipad.component';
import { IphoneComponent } from './pages/iphone/iphone.component';
import { WatchComponent } from './pages/watch/watch.component';
import { AirpodsComponent } from './pages/airpods/airpods.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'mac', component: MacComponent },
    { path: 'ipad', component: IpadComponent },
    { path: 'iphone', component: IphoneComponent },
    { path: 'watch', component: WatchComponent },
    { path: 'airpods', component: AirpodsComponent },
    { path: 'admin', component: FormComponent }
];