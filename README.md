<p align="center">
  <a href="https://github.com/apps/templater">
    <img alt="Templater" src="https://user-images.githubusercontent.com/17832347/94602633-c192f500-02b2-11eb-8662-c7fe9ef5e0a7.jpg" />
  </a>
</p>
<p align="center">
  <h1 align="center">Templater</h1>
</p>

> A GitHub App built with [Probot](https://github.com/probot/probot) that requests more info from newly opened Pull Requests and Issues that contain either default titles, whose description is left blank or templates not followed. It does so by taking data from a `.github/config.yml`.

<img width="1041" alt="screen shot 2017-07-07 at 3 32 01 pm" src="https://user-images.githubusercontent.com/17832347/94599643-59421480-02ae-11eb-98d1-bc2bb0bd5419.png">


**NOTE:** This is a customised implementation of [request-info](https://github.com/behaviorbot/request-info) and follows a lot of similar principles. The idea is to improve the code from request-info to stringently enforce the template. All code reused from request-info is subject to its own [License](https://github.com/behaviorbot/request-info/blob/master/LICENSE).

## Usage

1. Install the bot on the intended repositories. The plugin requires the following **Permissions and Events**:
- Pull requests: **Read & Write**
  - [x] check the box for **Pull Request** events
- Issues: **Read & Write**
  - [x] check the box for **Issue** events
- Content: **Read**
  - [x] check the box for **Content** events
2. Add a `.github/config.yml` file that contains the following:

```yml
# Configuration for Templater - https://github.com/rohitjmathew/probot-template-enforcer

# *OPTIONAL* Comment to reply with
# Can be either a string :
probotTemplateEnforcerReplyComment: >
  We would appreciate it if you could provide us with more info about this issue/pr!

# Or an array:
# (In this case, a comment is chosen at random from the provided array)
# probotTemplateEnforcerReplyComment:
#  - Ah no! young blade! That was a trifle short!
#  - Tell me more !
#  - I am sure you can be more effusive


# *OPTIONAL* default titles to check against for lack of descriptiveness
# MUST BE ALL LOWERCASE
probotTemplateEnforcerDefaultTitles:
  - update readme.md
  - updates

# *OPTIONAL* Label to be added to Issues and Pull Requests with insufficient information given
probotTemplateEnforcerLabelToAdd: needs-more-info

# *OPTIONAL* Require Issues to contain more information than what is provided in the issue templates
# Will fail if the issue's body is equal to a provided template
checkIssueTemplate: true

# *OPTIONAL* Require Pull Requests to contain more information than what is provided in the PR template
# Will fail if the pull request's body is equal to the provided template
checkPullRequestTemplate: true

# *OPTIONAL* Only warn about insufficient information on these event types
# Keys must be lowercase. Valid values are 'issue' and 'pullRequest'
probotTemplateEnforcerOn:
  pullRequest: true
  issue: true

# *OPTIONAL* Add a list of people whose Issues/PRs will not be commented on
# keys must be GitHub usernames
probotTemplateEnforcerUserstoExclude:
  - hiimbex
  - rohitjmathew
```
3. If you prefer not to add a `.github/config.yml` file, you can simply install the bot and it would comment on issues and pull requests that have empty bodies, with the comment:

> Thanks for opening this pull request! The owners of this repository would appreciate it if you could provide us with more info about this issue/pr!


## Setup

```
# Install dependencies
npm install

# Run the bot
npm start
```

See [the probot deployment docs](https://github.com/probot/probot/blob/master/docs/deployment.md) if you would like to run your own instance of this plugin.

## Contributing

If you have suggestions for how probot-template-enforcer could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2017 Bex Warner ([request-info](https://github.com/behaviorbot/request-info/blob/master/LICENSE)) & 2020 Rohit Mathew ([probot-template-enforcer](https://github.com/rohitjmathew/probot-template-enforcer/blob/master/LICENSE))
