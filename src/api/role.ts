import { http } from "@/utils/http";
import { Result, Page } from "./result";
const { VITE_PROXY_BASE_PATH } = import.meta.env;

export interface Role {
  id: string;
  name: string;
  code: string;
  orgId: string;
  orgName: string;
  createdAt: string;
  updatedAt: string;
  menuIds: Array<string>;
}

export const pageRole = (params?: object) => {
  return http.request<Page<Role[]>>("get", `${VITE_PROXY_BASE_PATH}/roles`, {
    params
  });
};

export const getRoles = (params?: object) => {
  return http.request<Role[]>("get", `${VITE_PROXY_BASE_PATH}/roles`, {
    params
  });
};

export const getOrgRoles = (orgId: string) => {
  return http.request<Role[]>(
    "get",
    `${VITE_PROXY_BASE_PATH}/roles/orgs/${orgId}`
  );
};

export const getRole = (id: string) => {
  return http.request<Role>("get", `${VITE_PROXY_BASE_PATH}/roles/${id}`);
};

export const getRoleMenus = (id: string) => {
  return http.request<string[]>(
    "get",
    `${VITE_PROXY_BASE_PATH}/roles/${id}/menus`
  );
};

export const addRole = (data?: object) => {
  return http.request("post", `${VITE_PROXY_BASE_PATH}/roles`, { data });
};

export const editRole = (id: string, data?: object) => {
  return http.request("put", `${VITE_PROXY_BASE_PATH}/roles/${id}`, { data });
};

export const removeRole = (id: string) => {
  return http.request("delete", `${VITE_PROXY_BASE_PATH}/roles/${id}`);
};
