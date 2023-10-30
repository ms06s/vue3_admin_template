import { defineStore } from "pinia"
import { reqLogin } from "@/api/user"
import { loginForm, loginResponseData } from "@/api/user/type"
import { UserState } from "../types/type"
import { GET_TOKEN, SET_TOKEN } from "@/utils/token"

let useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        // succsess
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return "ok"
      }
      // error
      else {
        return Promise.reject(new Error("登录失败"))
      }
    },
  },
  getters: {},
})

export default useUserStore
