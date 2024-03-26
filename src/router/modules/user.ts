const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "user",
  component: () => import("@/views/user/index.vue"),
  meta: {
    icon: "user",
    title: "用户",
    rank: 2
  },
  children: [
    {
      path: "/change-password",
      name: "change-password",
      component: () => import("@/views/user/password.vue"),
      meta: {
        title: "修改密码",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
