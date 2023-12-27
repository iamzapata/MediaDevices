import react from "@vitejs/plugin-react"
import { defineConfig as defineViteConfig, mergeConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig as defineVitestConfig } from "vitest/config"

const viteConfig = defineViteConfig({
  plugins: [react(), tsconfigPaths()]
})

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    browser: {
      provider: "playwright",
      enabled: true,
      name: "chromium"
    },
    setupFiles: ["./src/__vitest__/setupTests.ts"]
  }
})

export default mergeConfig(viteConfig, vitestConfig)
