# Contributing

This project has 2 main branches: `master` and `development`. The `master` branch is where the current stable code lives and should be used for production setups. The `development` branch is the main development branch, this is where PRs should be submitted to (backport fixes may be applied to `master`).

By separating the current stable code from the cutting-edge development I hope to provide a stable and efficient workflow for users and developers alike.

Please submit PRs to the `development` branch, it is the main development branch for this project.

When submitting a bugfix, try to write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

Open [GitHub Issue](https://github.com/Abdizriel/nodejs-microservice-starter/issues) to spy progress.

Create new branch with following pattern issue-xx-zz where xx is GitHub issue number and zz is short description.

## Git Commit Guidelines

### Commit Message Format
Each commit message consists of a **issue**, a **type** and a **subject**.

```
[<issue>][<type>] <subject>
```

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on github as well as in various git tools.

### Issue
The number generated for story, bug etc... on GitHub.

### Type
Must be one of the following:

* **ADD**: Add something to code
* **FIX**: A bug fix
* **DOCS**: Documentation changes
* **UPDATE**: A update of code that is not a bug fix
* **DELETE**: Remove of file or directory
* **TEST**: Adding missing tests
* **CHORE**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* capitalize first letter
* no dot (.) at the end
