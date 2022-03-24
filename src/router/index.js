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
    meta: { title: "首頁" },
  },
  {
    path: "/post/:postId",
    name: "Post",
    props: true,
    meta: { title: "文章" },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Post.vue"),
  },
  {
    path: "/preLogin",
    name: "PreLogin",
    meta: { title: "登入前" },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PreLogin.vue"),
    // 都有 token 幹嘛還去登入頁, 給我去首頁！
    beforeEnter: (to, from, next) => {
      if (store.state.token) next({ name: "Home" });
      else next();
    },
  },
  // 未定義路由導回首頁, 這規則記得放在 routes 最下面
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 更改 html title
  document.title = to.meta.title;
  // // 所有頁面進來前做判斷, 如果要進到非登入頁並且沒有 token 時, 前往登入頁
  if (to.name !== "PreLogin" && !store.state.token) next({ name: "PreLogin" });
  else next();
});

export default router;
