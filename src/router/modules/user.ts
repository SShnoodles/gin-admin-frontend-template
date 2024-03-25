const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "user",
  component: () => import("@/views/user/index.vue"),
  meta: {
    icon: "homeFilled",
    title: "用户"
  }
} as RouteConfigsTable;
