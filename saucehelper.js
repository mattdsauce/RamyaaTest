var shell = require('shelljs');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');


test.describe('SauceLabs Helper', function() {

  test.it('Go to Google', function() {

    console.log("PRINTING ALL ENV: " + require('util').inspect(process.env));

    if(process.env.SAUCELABS) {
        var username = process.env.SAUCE_USERNAME;
        var accessKey = process.env.SAUCE_ACCESS_KEY;
        driver = new webdriver.Builder().
        withCapabilities({
          'browserName': process.env.SELENIUM_BROWSER,
          'platform': process.env.SELENIUM_PLATFORM,
          'version': process.env.SELENIUM_VERSION,
          'username': username,
          'accessKey': accessKey,
        }).
        usingServer("http://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:80/wd/hub").
        build();
        var remote = require('selenium-webdriver/remote');
        driver.setFileDetector(new remote.FileDetector());
      } else {
        driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
      }
      driver.manage().window().maximize();
      driver.get("http://google.com");
      console.log("Sleeping for 10 seconds");
      driver.sleep(10000);
  });

  test.afterEach(function() {
    driver.quit();
  });
});
