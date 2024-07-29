import { MainLayout } from "@/layouts/main-layout/main-layout.component"
import { END_POINT_ROUTE } from "./end-point-route.constant"
import { SignIn } from "@/pages/sign-in/sign-in.component"
import { Home } from "@/pages/home/home.component"
import { SignUp } from "@/pages/sign-up/sign-up.component"



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
    },
    {
        path: END_POINT_ROUTE.SIGN_UP,
        component: SignUp
    }
]

export const ROUTES_CONFIGURATION = [
    {
        path: END_POINT_ROUTE.ROOT,
        component: MainLayout,
        children: [
            ...COMMON_ROUTES
        ]
    }
]