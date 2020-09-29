const defaultConfig = {
  probotTemplateEnforcerReplyComment: 'Thanks for opening this pull request! The owners of this repository would appreciate it if you could provide us with more info about this issue/pr!',
  probotTemplateEnforcerOn: {
    issue: true,
    pullRequest: true
  },
  probotTemplateEnforcerLabelToAdd: 'need-more-info',
  checkIssueTemplate: false,
  checkPullRequestTemplate: true
}

module.exports = defaultConfig