import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/post/:postId",
    name: "Post",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Post.vue"),
  },
  {
    path: "/preLogin",
    name: "PreLogin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PreLogin.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.token) next({ name: "Home" });
      else next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "PreLogin" && !store.state.token) next({ name: "PreLogin" });
  else next();
});

export default router;
