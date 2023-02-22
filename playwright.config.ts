import type { PlaywrightTestConfig } from "@playwright/test";

import { devices } from "@playwright/test";
import path from "path";

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

const cmd_reporter = process.env.CI ? "github" : "list";

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 10 * 1000,
  // Test directory
  testDir: path.join(__dirname, "e2e"),
  reporter: [[cmd_reporter], ["html"]],
  // If a test fails, retry it additional 2 times
  retries: 0,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "test-results/",

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: "npm run dev",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,
    video: "on",

    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: "retry-with-trace",

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   ignoreHTTPSErrors: true,
    // },
  },

  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "e2e/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "Desktop Firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "e2e/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    /* { */
    /*   name: "Desktop Safari", */
    /*   use: { */
    /*     ...devices["Desktop Safari"], */
    /*     storageState: "e2e/.auth/user.json", */
    /*   }, */
    /*   dependencies: ["setup"], */
    /* }, */
    // Test against mobile viewports.
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        storageState: "e2e/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    /* { */
    /*   name: "Mobile Safari", */
    /*   use: { */
    /*     ...devices["iPhone 13 Pro"], */
    /*     storageState: "e2e/.auth/user.json", */
    /*   }, */
    /*   dependencies: ["setup"], */
    /* }, */
  ],
};
export default config;
