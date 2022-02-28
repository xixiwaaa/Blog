import Vue from "vue";
import Router from "vue-router";
import ShowBlog from "../components/ShowBlog.vue";
import AddBlog from "../components/AddBlog.vue";
import SingleBlog from "../components/SingleBlog.vue";
import EditBlog from "../components/EditBlog.vue";

Vue.use(Router);
/* const routes = [
  { path: "/", component: ShowBlogs },
  { path: "/about", component: AddBlog },
];
const router = Router.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: Router.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
}); */

export default new Router({
  routes: [
    {
      path: "/",
      component: ShowBlog,
    },
    {
      path: "/add",
      component: AddBlog,
    },
    {
      path: "/blog/:id",
      component: SingleBlog,
    },
    {
      path: "/edit/:id",
      component: EditBlog,
    },
  ],
  mode: "history",
});
