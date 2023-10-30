import request from "@/utils/request";
import type { loginForm, loginResponseData, userInfoReponseData } from "./type";

enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

export const reqLogin = (data: loginForm) =>
  request.post<loginResponseData, any>(API.LOGIN_URL, data);

export const reqUserInfo = () =>
  request.get<userInfoReponseData, any>(API.USERINFO_URL);
