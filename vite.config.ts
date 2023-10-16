import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "path"
import { viteMockServe } from "vite-plugin-mock"

// https://vitejs.dev/config/
export default ({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        enable: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
}
