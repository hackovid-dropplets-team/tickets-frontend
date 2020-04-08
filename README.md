# TICKETS - FRONTEND

Tickets frontend made with ReactJS

## Local developing w/o Docker

### Prerequisites

For local developing you'll need nodeJS 12 LTS or high, npm or yarn package manager, git and access to remote repository.

### Clone repository

Clone locally the remote repository using your GIT client or from command line and checkout *devel* branch. New changes and further developments must be pushed in the *devel* branch. Feel free to create new branches for specific features. Never work on *master* branch.

```
git clone git@github.com:hackovid-dropplets-team/tickets-frontend.git
cd tickets-frontend
git checkout devel
```

## GIT Commit Message Style Guide

Message structure consists of type and subject/body

The type can be one of these types:

```
feat: a new feature
fix: a bug fix
docs: changes to documentation
style: formatting, missing semi colons, etc; no code change
refactor: refactoring production code
test: adding tests, refactoring test; no production code change
chore: updating build tasks, package manager configs, etc; no production code change
```

Examples:

```
[feat] added user db model
[docs] updated README with Docker related docs
```

## Docker

### Local deployment

```
docker-compose -p tickets-frontend -f docker-compose-frontend-local.yml up --build
```

Add *-d* flag to run in background mode, otherwise will run in foreground mode, outputing all logs in console.
