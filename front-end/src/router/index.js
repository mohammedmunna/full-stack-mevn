import * as VueRouter from "vue-router";
import ProductsPage from "../pages/ProductsPage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";
import ShoppingCartPage from "../pages/ShoppingCartPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const routes = [
  {
    path: "/cart",
    name: "ShoppingCartPage",
    component: ShoppingCartPage,
  },
  {
    path: "/products",
    name: "ProductsPage",
    component: ProductsPage,
  },
  {
    path: "/products/:productId",
    name: "ProductDetailPage",
    component: ProductDetailPage,
  },
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
