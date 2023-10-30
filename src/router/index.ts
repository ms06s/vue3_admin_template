import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  // 切路由，滚动
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
