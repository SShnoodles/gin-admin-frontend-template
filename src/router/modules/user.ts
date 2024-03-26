const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "user",
  component: () => import("@/views/user/index.vue"),
  meta: {
    icon: "user",
    title: "用户",
    rank: 2
  }
} as RouteConfigsTable;
