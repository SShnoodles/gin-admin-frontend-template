const Layout = () => import("@/layout/index.vue");

export default {
  path: "/role",
  name: "role",
  component: () => import("@/views/role/index.vue"),
  meta: {
    icon: "userFilled",
    title: "角色",
    rank: 3
  }
} as RouteConfigsTable;
