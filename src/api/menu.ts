import { http } from "@/utils/http";
import { Result, Page } from "./result";
const { VITE_PROXY_BASE_PATH } = import.meta.env;

export interface Menu {
  id: string;
  pid: string;
  name: string;
  path: string;
  icon: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
  resourceIds: string[];
}

export const pageMenus = (params?: object) => {
  return http.request<Page<Menu[]>>("get", `${VITE_PROXY_BASE_PATH}/menus`, {
    params
  });
};

export const getMenus = (params?: object) => {
  return http.request<Menu[]>("get", `${VITE_PROXY_BASE_PATH}/menus`, {
    params
  });
};

export const getMenu = (id: string) => {
  return http.request<Menu>("get", `${VITE_PROXY_BASE_PATH}/menus/${id}`);
};

export const addMenu = (data?: object) => {
  return http.request("post", `${VITE_PROXY_BASE_PATH}/menus`, { data });
};

export const editMenu = (id: string, data?: object) => {
  return http.request("put", `${VITE_PROXY_BASE_PATH}/menus/${id}`, { data });
};

export const removeMenu = (id: string) => {
  return http.request("delete", `${VITE_PROXY_BASE_PATH}/menus/${id}`);
};

export const getMenuResources = (id: string) => {
  return http.request<string[]>(
    "get",
    `${VITE_PROXY_BASE_PATH}/menus/${id}/resources`
  );
};
