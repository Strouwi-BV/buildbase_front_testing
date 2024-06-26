![playwright] ![typescript] ![azure-devops]

<br />
<div align="center">
  <a href="https://strouwi.be/">
    <img src="docs/Logo_blauw.png" alt="Logo">
  </a>

<h3 align="center">Buildbase front testing</h3>

  <p align="center">
    Project containing integration, end-to-end testing for buildbase
    <br />
  </p>
</div>

# Project setup

It's a typescript project executing integration, end-to-end testing using the [Playwright](https://playwright.dev/) framework.

Tests get automatically executed on Azure devops.  
[![Build Status](https://dev.azure.com/strouwi/Buildbase/_apis/build/status%2FStrouwi-BV.buildbase_front_testing?branchName=dev)](https://dev.azure.com/strouwi/Buildbase/_build/latest?definitionId=80&branchName=dev)

The [integration-testing.yml](/azure/integration-testing.yml) pipeline will trigger

- whenever changes are made on the dev branch
- every day at 12:00 and 20:00

The tests are then published and can be found under the "Tests" section of the Azure job.
![Azure tests](docs/azure_tests.png)

:mega: For each job, a message will be send in the "Azure" channel on Slack.

# Conventions

## folder structure

<div align="center">
    <img src="docs/folderStructure.jpg" alt="Folder Structure">
</div>

[Klik hier voor meer informatie over de locators](docs/Locators.md)

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

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[playwright]: https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=whit
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[azure-devops]: https://img.shields.io/badge/Azure_DevOps-0078D7?style=for-the-badge&logo=azure-devops&logoColor=white
