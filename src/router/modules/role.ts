const Layout = () => import("@/layout/index.vue");

export default {
  path: "/role",
  name: "role",
  component: () => import("@/views/role/index.vue"),
  meta: {
    icon: "homeFilled",
    title: "角色"
  }
} as RouteConfigsTable;
