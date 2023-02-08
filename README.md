# Custom Task List Approval Github Action
A Github action for posting review tasklists on issues/pull requests through comments built with Javascript.
![image](https://user-images.githubusercontent.com/10180317/217216561-74350607-4b99-4c05-9b89-eb5b9866bccd.png)

# Usage
There are several options to customize the behaviour of the Github Action on the creation as well as deletion of the task list once completed (by setting the `delete-comment-after-completion` input).

The level of logging on the job can also be set through the `debug-logs` input.
![image](https://user-images.githubusercontent.com/10180317/217272701-1d429cc4-b4a9-4ce3-a025-333cee01be6c.png)

A timer can also be set in cases where the task list is expected to be completed in a short amount of time. You can also set the timeout value (in seconds) which doesn't run the timer if not set.

> **Disclaimer:** When using the timer, this will keep the job running until whether the task list items are all completed, or the timer reaches the timeout. This also has the potential or reaching the Github API limits.

Additionally, you can also delete all previous comments with the same task list (title and body are ignore in the comparison) by setting the `delete-previous-similar-tasklists` input to `true` (since it defaults to `false`), independently from being completed or not.

``` yml
on:
  pull_request:
    types: [opened]

jobs:
  create-tasklist:
    runs-on: ubuntu-latest
    name: Create a Tasklist
    steps:
      - name: Custom Tasklist Approval
        uses: AfonsoTaborda/custom-task-list-approval@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }} # Required
          tasklist-items: | # Each task item is delimited by a ";" character (required)
            TODO 1;
            TODO laundry;
            Clean the car;
          comment-title: "TODO List" # Defines the title of the comment (optional)
          comment-body: "Please finish the TODO list below before moving to the next step:" # Defines the body of text (optional) right before the task list
          completion-timeout: 1 # Optional, if set it will run a timer until timing out (in seconds)
          delete-previous-similar-tasklists: false # Optional, if true it will delete all previous similar task lists and creates a new one. Defaults to false if not set.
          delete-comment-after-completion: false # Optional, if set to true it deletes the create comment after completion of its tasks. Defaults to true.
          debug-logs: true # Optional, control's the logging debug-logs setting for the timer (if enabled).
```

## Required Inputs
- `token`
- `tasklist-items`

# License
MIT
