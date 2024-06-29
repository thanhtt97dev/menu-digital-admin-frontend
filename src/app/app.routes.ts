import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in.component';
import { Home } from './pages/home/home.component';
import { END_POINT_ROUTE } from './commons/constants/end-point-route.constant';
import { ContainerLayout } from './layouts/container-layout/container-layout.component';


const COMMON_ROUTES = [
    {
        path: END_POINT_ROUTE.SIGN_IN,
        component: SignIn
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

const MAIN_LAYOUT =
{
    path: '',
    component: ContainerLayout,
    children: [
        ...COMMON_ROUTES
    ]
}


export const routes: Routes = [
    MAIN_LAYOUT
];
