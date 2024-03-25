const Layout = () => import("@/layout/index.vue");

export default {
  path: "/menu",
  name: "menu",
  component: () => import("@/views/menu/index.vue"),
  meta: {
    icon: "homeFilled",
    title: "菜单"
  }
} as RouteConfigsTable;
