# Current setup
The pipeline will trigger whenever changes are made, a pull request is made and every day at 12:00 and 20:00.  
The project will then be build en Playwright will execute the tests. The tests are then published and can be found under the "Tests" section of the job.
![Alt text](docs/azure_tests.png)

For each job, a message will be send in the "playwright-results" channel on Slack.

# How to use playwright
## Install
```
npx playwright install
```

## Run
Without UI
```
npx playwright test
```
With UI
```
npx playwright test --ui
```
![Alt text](docs/playwright_ui_empty.png)
![Alt text](docs/playwright_ui_success.png)
From the UI, ou can run the tests with the play buttons and inspect them.  
At the top of the window, there is a timeline. At the bottom, you can see more information about the selected test.

## Report
```
npx playwright show-report
```
![Alt text](docs/playwright_report.png)
Each test is run on multiple browsers, here you have an overview of their results.

## How to write tests
https://playwright.dev/docs/writing-tests
