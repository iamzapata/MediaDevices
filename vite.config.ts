import { defineConfig as defineViteConfig, mergeConfig } from "vite"
import { defineConfig as defineVitestConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

const viteConfig = defineViteConfig({
  plugins: [react()]
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
