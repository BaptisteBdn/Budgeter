import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import LoginLayout from "@/layout/login/LoginLayout.vue";

// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Transactions = () => import(/* webpackChunkName: "common" */ "@/pages/Transactions.vue");
const Login = () => import(/* webpackChunkName: "common" */ "@/pages/Login.vue");
const Register = () => import(/* webpackChunkName: "common" */ "@/pages/Register.vue");

const routes = [
  {
    path: "/",
    component: LoginLayout,
    redirect: "/login",
    children: [
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "register",
        name: "register",
        component: Register
      }
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "transactions",
        name: "transactions",
        component: Transactions
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
