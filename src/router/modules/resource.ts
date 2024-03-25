const Layout = () => import("@/layout/index.vue");

export default {
  path: "/resource",
  name: "resource",
  component: () => import("@/views/resource/index.vue"),
  meta: {
    icon: "homeFilled",
    title: "资源"
  }
} as RouteConfigsTable;
