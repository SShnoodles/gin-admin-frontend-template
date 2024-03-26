const Layout = () => import("@/layout/index.vue");

export default {
  path: "/menu",
  name: "menu",
  component: () => import("@/views/menu/index.vue"),
  meta: {
    icon: "menu",
    title: "菜单",
    rank: 4
  }
} as RouteConfigsTable;
