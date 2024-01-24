import { http } from "@/utils/http";
const { VITE_PROXY_BASE_PATH } = import.meta.env;

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
