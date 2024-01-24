import { http } from "@/utils/http";
import { Result, Page } from "./result";
const { VITE_PROXY_BASE_PATH } = import.meta.env;

export interface Org {
  id: string;
  name: string;
  creditCode: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export const pageOrg = (params?: object) => {
  return http.request<Result<Page<Org[]>>>(
    "get",
    `${VITE_PROXY_BASE_PATH}/orgs`,
    {
      params
    }
  );
};

export const getOrgs = (params?: object) => {
  return http.request<Result<Org[]>>("get", `${VITE_PROXY_BASE_PATH}/orgs`, {
    params
  });
};

export const getOrg = (id: string) => {
  return http.request<Result<Org>>("get", `${VITE_PROXY_BASE_PATH}/orgs/${id}`);
};

export const addOrg = (data?: object) => {
  return http.request("post", `${VITE_PROXY_BASE_PATH}/orgs`, { data });
};

export const editOrg = (id: string, data?: object) => {
  return http.request("put", `${VITE_PROXY_BASE_PATH}/orgs/${id}`, { data });
};

export const removeOrg = (id: string) => {
  return http.request("delete", `${VITE_PROXY_BASE_PATH}/orgs/${id}`);
};
