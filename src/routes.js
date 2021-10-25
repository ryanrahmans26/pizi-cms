/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";

import UserIndex from "views/users/Index.js";
import UserAdd from "views/users/Add.js";
import UserEdit from "views/users/Edit.js";

import ProductIndex from "views/products/Index.js";
import ProductAdd from "views/products/Add.js";
import ProductEdit from "views/products/Edit.js";

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: UserIndex,
    layout: "/admin",
  },
  {
    path: "/user/add",
    name: "User Add",
    icon: "ni ni-circle-08 text-pink",
    component: UserAdd,
    layout: "/admin",
  },
  {
    path: "/user/edit/:id",
    name: "User Edit",
    icon: "ni ni-circle-08 text-pink",
    component: UserEdit,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-bullet-list-67 text-red",
    component: ProductIndex,
    layout: "/admin",
  },
  {
    path: "/product/add",
    name: "Product Add",
    icon: "ni ni-circle-08 text-pink",
    component: ProductAdd,
    layout: "/admin",
  },
  {
    path: "/product/edit/:id",
    name: "Product Edit",
    icon: "ni ni-circle-08 text-pink",
    component: ProductEdit,
    layout: "/admin",
  },
];

export default routes;
