import { http } from "@/utils/http";
const { VITE_PROXY_BASE_PATH } = import.meta.env;
import { Page } from "./result";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type Captcha = {
  codeId: string;
  code: string;
};

export type LoginResult = {
  token: string;
  expireDay: string;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<LoginResult>(
    "post",
    `${VITE_PROXY_BASE_PATH}/login/account`,
    { data }
  );
};

/** 获取验证码 */
export const getCaptcha = () => {
  return http.request<Captcha>("post", `${VITE_PROXY_BASE_PATH}/login/captcha`);
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>(
    "post",
    `${VITE_PROXY_BASE_PATH}/login/refreshToken`,
    {
      data
    }
  );
};

export interface User {
  id: string;
  username: string;
  realName: string;
  workNo: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
  roleIds: Array<string>;
}

export const pageUser = (params?: object) => {
  return http.request<Page<User[]>>("get", `${VITE_PROXY_BASE_PATH}/users`, {
    params
  });
};

export const getUsers = () => {
  return http.request<User[]>("get", `${VITE_PROXY_BASE_PATH}/users`);
};

export const getUser = (id: string) => {
  return http.request<User>("get", `${VITE_PROXY_BASE_PATH}/users/${id}`);
};

export const getUserRoleIds = (id: string) => {
  return http.request<string[]>(
    "get",
    `${VITE_PROXY_BASE_PATH}/users/${id}/roles`
  );
};

export const addUser = (data?: object) => {
  return http.request("post", `${VITE_PROXY_BASE_PATH}/users`, { data });
};

export const editUser = (id: string, data?: object) => {
  return http.request("put", `${VITE_PROXY_BASE_PATH}/users/${id}`, { data });
};

export const removeUser = (id: string) => {
  return http.request("delete", `${VITE_PROXY_BASE_PATH}/users/${id}`);
};

export const enabledUser = (id: string) => {
  return http.request("put", `${VITE_PROXY_BASE_PATH}/users/${id}/enabled`);
};

export const changePassword = (data?: object) => {
  return http.request("put", `${VITE_PROXY_BASE_PATH}/users/change-password`, {
    data
  });
};
