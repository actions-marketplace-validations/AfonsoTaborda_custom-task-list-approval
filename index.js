const core = require('@actions/core');
const runTimer = require('./lib/timer');
const {createGithubComment, listGithubComments, initializeComment, getSimilarGithubCommentId} = require('./lib/github-comment');
const CHECK_LIST_REGEX = require('./lib/constants');
const inputs = require('./lib/inputs');

async function run() {
    try {
        // This should be a token with access to your repository scoped in as a secret.
        // The YAML workflow will need to set myToken with the GitHub Secret Token
        // myToken: ${{ secrets.GITHUB_TOKEN }}
        // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
        var [resultComment] = await initializeComment();

        var pullRequestComments = await listGithubComments();

        // Check if there are similar comments already posted
        // Otherwise `similarCommentId` will be `undefined`
        var similarCommentId = getSimilarGithubCommentId(pullRequestComments);

        if (resultComment === "") {
            throw "The comment to be added is empty!";
        }

        if (typeof similarCommentId === "undefined") {
            var comment = await createGithubComment(resultComment);
            similarCommentId = comment.id;
        }

        if(inputs.runTimer) {
          runTimer(similarCommentId);
        } else {
          var completedTasksArr = await updateTaskListCompletion(commentId, CHECK_LIST_REGEX);

          if(completedTasksArr.length == count && count != 0) {
              console.log(`All ${count} tasks have been successfully completed!`);
              await deleteGithubComment(commentId);
          } else {
              core.setFailed(`Not all tasks have been completed, only ${completedTasksArr.length} out of ${count} have been completed.\n Re-run this job once the task list has been completed.`);
          }
        }
      } catch (error) {
        core.setFailed(error);
      }
}

run();