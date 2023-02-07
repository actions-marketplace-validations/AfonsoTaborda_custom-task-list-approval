# Custom Task List Approval Github Action
A Github action for posting review task lists on pull requests in Javascript.

# Usage
There are several options to customize the behaviour of the Github Action no the creation as well as deletion of the task list once completed (by setting the `delete-comment-after-completion` input).

The level of logging on the job can also be set through the `debug-logs` input.

A timer can also be set in cases where the task list is expected to be completed in a short amount of time. You can also set the timeout value (in minutes) which defaults to 1 hour if not set.

> Disclaimer: when using the timer, this will keep the job running until whether the task list items are all completed, or the timer reaches the timeout. This also has the potential or reaching the Github API limits.

``` yml
on:
  pull_request:
    types: [open]

jobs:
  create-checklist:
    runs-on: ubuntu-latest
    name: Create a Checklist
    steps:
      - name: Custom Checklist Approval
        uses: AfonsoTaborda/custom-task-list-approval@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }} # Required
          checklist-items: "TODO 1;TODO laundry;Clean the car;" # Required
          comment-title: "TODO List" # Optional
          comment-body: "Please finish the TODO list below before moving to the next step:" # Optional
          run-with-timer: true # Optional, defaults to true if not set
          completion-timeout: 1 # Optional, only valid if `run-with-timer` is set to true
          delete-comment-after-completion: true # Optional
          debug-logs: true # Optional, control's the logging debug-logs setting for the timer (if enabled)
```

# License
MIT