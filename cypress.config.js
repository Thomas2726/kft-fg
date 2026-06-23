const { defineConfig } = require('cypress');

module.exports = defineConfig({

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: 'https://fraud-detection.development.kifiya.dev/',

    setupNodeEvents(on, config) {

      // 🔥 Allure plugin
      require('@shelex/cypress-allure-plugin/writer')(on, config);

      return config;
    },

    env: {
      allure: true
    },  

    viewportWidth: 1280,
    viewportHeight: 720,

    video: true,
    screenshotOnRunFailure: true,

    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});