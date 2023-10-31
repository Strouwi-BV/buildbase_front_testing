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
