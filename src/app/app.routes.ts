import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in.component';
import { Home } from './pages/home/home.component';
import { END_POINT_ROUTE } from './commons/constants/end-point-route.constant';


const COMMON_ROUTES = [
    {
        path: END_POINT_ROUTE.SIGN_IN,
        component : SignIn
    },
    {
        path: END_POINT_ROUTE.HOME,
        component: Home
    },
    {
        path: END_POINT_ROUTE.ROOT,
        component: Home
    }
]

export const routes: Routes = [
    ...COMMON_ROUTES,
];
