import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    restoreMocks: true,
  },
  // @ts-ignore - followings work but ts complains
  plugins: [vue(), WindiCSS()],
});
