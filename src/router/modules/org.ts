const Layout = () => import("@/layout/index.vue");

export default {
  path: "/org",
  name: "org",
  component: () => import("@/views/org/index.vue"),
  meta: {
    icon: "officeBuilding",
    title: "机构",
    rank: 1
  }
} as RouteConfigsTable;
