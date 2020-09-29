async function getPullRequestTemplate (context) {
  const result = await context.github.repos.getContents({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    path: '.github/PULL_REQUEST_TEMPLATE.md'
  })

  return Buffer.from(result.data.content, 'base64').toString()
}

async function isBodyEqualToTemplate (body, context) {
  const bodyTemplate = await getPullRequestTemplate(context)
  let trimmedBody = body.replace(/[^a-zA-Z]/g, "")
  let trimmedBodyTemplate = bodyTemplate.replace(/[^a-zA-Z]/g, "")
  return trimmedBody.includes(trimmedBodyTemplate)
}

class PullRequestBodyChecker {
  static async isBodyValid (body, context) {
    if (!body) {
      return false
    }

    if (await isBodyEqualToTemplate(body, context)) {
      return false
    }

    return true
  }
}

module.exports = PullRequestBodyChecker