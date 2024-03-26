const Layout = () => import("@/layout/index.vue");

export default {
  path: "/resource",
  name: "resource",
  component: () => import("@/views/resource/index.vue"),
  meta: {
    icon: "list",
    title: "资源",
    rank: 5
  }
} as RouteConfigsTable;
