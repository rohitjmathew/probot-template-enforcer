const getComment = require('./lib/getComment')
const defaultConfig = require('./lib/defaultConfig')
const PullRequestBodyChecker = require('./lib/PullRequestBodyChecker')
const IssueBodyChecker = require('./lib/IssueBodyChecker')

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log.info('Yay, the app was loaded!')

  app.on(['pull_request.opened'], receive)
  async function receive (context) {
    let title
    let body
    let badTitle
    let badBody
    let user

    let eventSrc = 'issue'
    if (context.payload.pull_request) {
      ({title, body, user} = context.payload.pull_request)
      eventSrc = 'pullRequest'
    } else {
      ({title, body, user} = context.payload.issue)
    }

    try {
      const config = await context.config(`config.yml`, defaultConfig)

      if (!config.probotTemplateEnforcerOn[eventSrc]) {
        return
      }

      if (config.probotTemplateEnforcerDefaultTitles) {
        if (config.probotTemplateEnforcerDefaultTitles.includes(title.toLowerCase())) {
          badTitle = true
        }
      }

      if (eventSrc === 'pullRequest') {
        app.log.info('Pull Request')
        if (config.checkPullRequestTemplate && !(await PullRequestBodyChecker.isBodyValid(body, context))) {
          badBody = true
        }
      } else if (eventSrc === 'issue') {
        if (config.checkIssueTemplate && !(await IssueBodyChecker.isBodyValid(body, context))) {
          badBody = true
        }
      }

      let notExcludedUser = true
      if (config.probotTemplateEnforcerUserstoExclude) {
        if (config.probotTemplateEnforcerUserstoExclude.includes(user.login)) {
          notExcludedUser = false
        }
      }

      if ((!body || badTitle || badBody) && notExcludedUser) {
        const comment = getComment(config.probotTemplateEnforcerReplyComment, defaultConfig.probotTemplateEnforcerReplyComment)
        context.github.issues.createComment(context.issue({body: comment}))

        if (config.probotTemplateEnforcerLabelToAdd) {
          // Add label if there is one listed in the yaml file
          context.github.issues.addLabels(context.issue({labels: [config.probotTemplateEnforcerLabelToAdd]}))
        }
      }
    } catch (err) {
      if (err.code !== 404) {
        throw err
      }
    }
  }

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
