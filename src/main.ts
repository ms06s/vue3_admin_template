import { createApp } from "vue";
import "@/styles/index.scss";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// svg 插件
import "virtual:svg-icons-register";
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import gloabComponents from "./components/index";
import router from "@/router";

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});

app.use(gloabComponents);

app.use(router);

app.mount("#app");
