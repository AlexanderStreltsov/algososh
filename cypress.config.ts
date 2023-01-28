import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 860,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
