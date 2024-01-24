const Layout = () => import("@/layout/index.vue");

export default {
  path: "/org",
  name: "org",
  component: () => import("@/views/org/index.vue"),
  meta: {
    icon: "homeFilled",
    title: "机构"
  }
} as RouteConfigsTable;
