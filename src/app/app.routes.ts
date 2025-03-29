import { Routes } from '@angular/router';
import { MainLayout } from '@/layouts/main-layout/main-layout.component';
import { SignIn } from '@/pages/sign-in/sign-in.component';
import { Home } from '@/pages/home/home.component';
import { SignUp } from '@/pages/sign-up/sign-up.component';
import { ConfirmSignUp } from '@/pages/confirm-sign-up/confirm-sign-up.component';
import { EmptyLayout } from '@/layouts/empty-layout/empty-layout.component';
import { AdminLayout } from '@/layouts/admin-layout/admin-layout.component';
import { UserList } from '@/pages/admin/user/user-list/user-list.component';
import { END_POINT_ROUTE } from './commons/constants/configurations/end-point-route.constant';
import { AuthGuardForAdmin } from './guards/auth-can-activate.guard';

export const routes: Routes = [
  //Main layout
  {
    path: END_POINT_ROUTE.ROOT,
    component: MainLayout,
    children: [
      {
        path: END_POINT_ROUTE.HOME,
        component: Home,
      },
      {
        path: END_POINT_ROUTE.ADMIN,
        component: AdminLayout,
        children: [
          {
            path: END_POINT_ROUTE.USER_LIST,
            component: UserList,
            canActivate: [AuthGuardForAdmin],
          },
        ],
      },
    ],
  },
  //Empty layout
  {
    path: END_POINT_ROUTE.ROOT,
    component: EmptyLayout,
    children: [
      {
        path: END_POINT_ROUTE.SIGN_IN,
        component: SignIn,
      },
      {
        path: END_POINT_ROUTE.SIGN_UP,
        component: SignUp,
      },
      {
        path: END_POINT_ROUTE.CONFIRM_SIGN_UP,
        component: ConfirmSignUp,
      },
    ],
  },
];
