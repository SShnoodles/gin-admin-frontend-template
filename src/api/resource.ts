import { http } from "@/utils/http";
const { VITE_PROXY_BASE_PATH } = import.meta.env;
import { Page } from "./result";

export interface Resource {
  id: string;
  name: string;
  method: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export const pageResource = (params?: object) => {
  return http.request<Page<Resource[]>>(
    "get",
    `${VITE_PROXY_BASE_PATH}/resources`,
    {
      params
    }
  );
};

export const getResources = (params?: object) => {
  return http.request<Resource[]>("get", `${VITE_PROXY_BASE_PATH}/resources`, {
    params
  });
};
