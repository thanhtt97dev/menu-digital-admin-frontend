import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in.component';
import { Home } from './pages/home/home.component';


const COMMON_ROUTES = [
    {
        path: "signIn",
        component : SignIn
    },
    {
        path: "home",
        component: Home
    },
    {
        path: "",
        component: Home
    }
]

export const routes: Routes = [
    ...COMMON_ROUTES
];
