---
title: "Stop stashing half-finished work: use Git worktrees and Worktrunk"
description: "Git worktrees keep separate branches checked out at once. Worktrunk automates per-worktree setup. The same isolation also works for parallel AI agents."
image: /images/git-worktrees.webp
alt: "Git worktree folders side by side, each with its own branch checked out"
postDate: 2026-08-16
tags:
  - git
  - worktrees
  - worktrunk
  - developer productivity
  - command line
  - workflow
---

This has happened more times than I can count. I finish making changes for a ticket and put it into code review. Then I start the next one. Twenty minutes later, a reviewer asks for a 2-line change on the first ticket.

The change might take a few minutes to make. Getting back to the right code can take longer.

My current branch already has modified files. Maybe the app is running with some local state I’ll need again. Or I configured the env variables differently for this task. I stash everything, switch branches, make the fix, then switch back and restore the stash. I hope I didn’t forget which migration or env variable belonged to which task.

Or I can make a work-in-progress commit that I never wanted in the branch. Or create another temporary branch whose name I’ll forget soon. Or leave the review sitting there until I finish my current work.

All those approaches work, and I’ve used them. But they turn a small review comment into a ceremony.

[Git worktrees](https://git-scm.com/docs/git-worktree) give me a better option: separate folders. Each has its own branch checked out.

## What Git worktrees give you

Git worktrees give you a separate working directory per branch, all in the same repo. You can keep more than one branch checked out at once. Each worktree has its own files, editor state, and running dev server.

### A branch and a worktree aren’t the same thing

A branch is a movable reference to a commit. The working tree is the checked-out set of files I edit. In Git’s terminology, a worktree is the working tree plus the Git metadata. That metadata is what makes it an independent checkout.

My normal clone is already one worktree (Git calls it the main worktree). I can attach more linked worktrees to the same repo, each with a different branch checked out.

For example:

```bash
~/code/shop/                  # main worktree, branch: feature/new-checkout
~/code/shop.review-fix/        # linked worktree, branch: fix/payment-review
~/code/shop.order-history/      # linked worktree, branch: feature/order-history
```

These folders belong to the same repo. They share Git’s object database and refs. Per-worktree state, such as `HEAD` and the index, stays separate ([Git worktree documentation](https://git-scm.com/docs/git-worktree#_description)).

Each folder has its own checked-out files, staged changes, and untracked files. I keep an editor and terminal open in each one. I leave the new checkout work untouched. I address the review in `shop.review-fix` and return without stashing.

The cognitive cost of context switching is real. The Git housekeeping disappears. My editor of choice, Zed, has built-in worktree support. A worktree picker in the command palette makes switching between them fast. Opening a different worktree is one command away.

### Creating the review-fix worktree with Git

Suppose I’m in `~/code/shop`, working on `feature/new-checkout`, and the earlier branch is `fix/payment-review`.

First I create a linked worktree for the existing branch:

```bash
git worktree add ../shop.review-fix fix/payment-review
```

My current directory stays on `feature/new-checkout`. It keeps all its unfinished changes.

`git worktree list` shows every attached worktree:

```bash
~/code/shop             7db81af [feature/new-checkout]
~/code/shop.review-fix  b132aa0 [fix/payment-review]
```

Now I can handle the review in the review-fix worktree:

```bash
cd ../shop.review-fix
# make the requested change
git add . && git commit -m "Fix payment retry condition" && git push
```

When DevQA finishes and I don’t need the checkout anymore:

```bash
cd ../shop
git worktree remove ../shop.review-fix
git branch -d fix/payment-review
```

Branch deletion is a separate step in native Git. Git normally refuses to remove a dirty worktree. It also refuses to check out the same branch in another worktree. I can override its safeguards ([Git worktree commands and options](https://git-scm.com/docs/git-worktree#_commands)).

For a brand-new task, I can create the branch and worktree together:

```bash
git worktree add -b feature/order-history ../shop.order-history main
```

That creates `feature/order-history` from `main` and checks it out in `../shop.order-history`.

This is already enough to improve the review interruption. The part that started to annoy me came next.

### Every new directory needs its project setup

A linked worktree contains the tracked files from its branch. My `.env`, `node_modules`, build output, and local database belong to a particular working directory. Other ignored files do too. A new worktree won’t magically have them.

The first few minutes often become:

```bash
cp ../shop/.env .env
npm install
npm run generate
```

Except the dev server in another worktree already owns port 3000.

I can solve this with a shell function or a project script. But once worktrees become a daily workflow, the function starts collecting branch naming rules, directory naming rules, and setup steps. Cleanup steps and special cases follow.

## Where Worktrunk comes in

[Worktrunk](https://github.com/max-sixty/worktrunk) wraps Git worktrees with a branch-oriented CLI and lifecycle hooks. I get ordinary Git worktrees underneath. Worktrunk takes care of the repetitive setup around them.

### Making Worktrunk do the boring parts

On macOS or Linux with Homebrew, the current installation command is:

```bash
brew install worktrunk
wt config shell install
```

The shell integration matters because `wt switch` needs to change the current shell's directory ([Worktrunk installation guide](https://worktrunk.dev/#install)).

Now I can create and enter a worktree with:

```bash
wt switch --create feature/order-history
```

Worktrunk addresses worktrees by branch name and calculates the directory from a configurable template. If the branch already has a worktree, `wt switch` moves me into it. If not, `wt switch --create` makes one. With no argument, it opens an interactive picker with branch status and diff previews ([`wt switch` documentation](https://worktrunk.dev/switch/)).

`wt remove` defaults to the current worktree. It only deletes the branch when Worktrunk sees it's already merged. The `--no-delete-branch` flag keeps it ([`wt remove` documentation](https://worktrunk.dev/remove/)). See the [Worktrunk reference](https://worktrunk.dev/) for the full list.

### Project hooks turn a checkout into a usable workspace

Every new worktree starts empty. The same setup repeats every time. On switch, I install dependencies and run project generators. I register the worktree with the rest of the toolchain. I unregister it on removal. My hooks do all four from a shared config file. Creating a worktree returns me to "ready to work." The full reference, including the `pre-merge` and `post-merge` lifecycles, is in the [Worktrunk hook docs](https://worktrunk.dev/hook/). It also covers the approval flow for shared configs.

Worktrunk reads those hooks from `.config/wt.toml`. They fire at lifecycle points like `pre-start` and `post-start`. `pre-start` runs before the worktree is usable. `post-start` runs after, in the background. I keep blocking setup in `pre-start` and push anything slow to `post-start`. That way creating a worktree returns fast. There's also `post-switch`, which fires on every checkout rather than just creation. That's the right home for work that tracks the current branch. The Herd link in the closing config is one example.

### Giving every worktree its own dev server

Only one app can listen on port 3000 at a time. Test runs pointed at the same mutable database can produce some creative failures. But a long test suite in one worktree doesn't block me. I can still check out main in another. The other worktree isn't competing for the same resources.

Worktrunk's `hash_port` template filter derives a stable port from the branch name. The port sits between 10000 and 19999. Its `tether` step runs a process in its own process group. It tears that group down when you remove the worktree.

```toml
# .config/wt.toml

[post-start]
server = "wt step tether -- npm run dev -- --port {{ branch | hash_port }}"

[list]
url = "http://localhost:{{ branch | hash_port }}"
```

The server starts in the background. That way creating the worktree doesn't wait for a long-running process ([Worktrunk's per-worktree dev-server recipe](https://worktrunk.dev/tips-patterns/#dev-server-per-worktree)).

### Worktrees fit coding agents unusually well

Worktrunk becomes even more useful when I have two or more LLM coding agents on the same repo.

Giving two agents the same working directory invites them to edit the same files and stage each other's changes. They can also run cleanup commands against work neither of them created. A worktree gives each agent its own branch, index, and checked-out files.

Worktrunk creates the worktree and runs the project hooks. Then it moves into the worktree and starts an agent in one command:

```bash
wt switch --create --execute=claude feature/order-history -- \
  "Add order history to the account page"
```

I can run a second agent in another terminal with the same pattern. Arguments after `--` go to the launched command. The blocking `pre-start` hooks finish before `--execute` runs. Post-start hooks continue in the background. Each agent begins in a prepared directory ([Worktrunk’s `--execute` workflow](https://worktrunk.dev/switch/#creating-worktrees)).

Their changes can still conflict when I merge the branches. They can also collide through a shared database, port, or container name. A cache outside the worktree can cause problems too. The filesystem boundary solves a specific class of problems. I still need to divide the tasks sensibly and review what comes back.

I also don’t need five agents running because the tool makes it possible. Parallel work is useful when the tasks are independent enough. Then the merge and review cost stays lower than the time saved.

## Trade-offs and takeaway

### The trade-offs, and when I’d skip

Worktrees have a few edges that are easy to miss:

- Every worktree duplicates the checked-out project files. Dependencies and build output can consume much more disk space than the source.
- Git normally checks out a branch in only one worktree at a time. I treat the directory and branch as a pair.
- State outside the worktree needs explicit handling. Ignored files and config need copying or generating. Shared resources (dev servers, databases, Docker, caches) need unique names or ports.
- Worktrees are easy to make and easy to forget. I remove the worktrees after QA testing marks the work as done.
- Removing a directory with `rm -rf` leaves worktree administration behind. I use `git worktree remove` or `wt remove`. `git worktree prune` cleans up stale metadata after a manual deletion ([Git worktree cleanup](https://git-scm.com/docs/git-worktree#_description)).
- A third-party Git hook that runs on `post-checkout` can short-circuit `git worktree add`. This happens if it depends on a binary that doesn't exist in a fresh worktree. Patch the hook to exit cleanly when the dependency is missing. Otherwise `wt switch --create` fails before it can start.
- Git still documents submodule support in more than one worktree as incomplete. I'd test the workflow carefully in a superproject with submodules ([Git worktree bugs](https://git-scm.com/docs/git-worktree#_bugs)).

I'd skip worktrees entirely when those edges outweigh the benefits. That's when I'm on one branch at a time, the repo is large and disk is tight, or the IDE doesn't support worktrees.

Keeping four tasks open in four directories makes switching between them mechanically cheap. It doesn't make holding four trains of thought equally cheap. What works for me is to keep the main task untouched. I handle the review or production fix in another worktree. I remove it when I'm done with the branch. When an agent can take an independent task, I give it a worktree too.

### My takeaway

Git worktrees turn branches into persistent working directories. That alone removes the stash-switch-unstash loop from review fixes and interruptions.

Worktrunk becomes worthwhile once creating a directory isn’t enough. It gives me short branch-based commands, project hooks, and repeatable paths. Plus cleanup checks and a clean way to launch tools inside a prepared worktree.

For a sense of what the resulting `.config/wt.toml` looks like, here's the version I used in a real repo:

```toml
[post-start]
node = "sh '{{ primary_worktree_path }}/scripts/worktrunk/setup-node.sh'"
php = "sh '{{ primary_worktree_path }}/scripts/worktrunk/setup-php.sh' '{{ branch }}' '{{ worktree_name }}' '{{ primary_worktree_path }}'"

[post-switch]
link = "sh '{{ primary_worktree_path }}/scripts/worktrunk/herd-link.sh' '{{ branch }}' '{{ worktree_name }}'"

[pre-remove]
unlink = "sh '{{ primary_worktree_path }}/scripts/worktrunk/herd-unlink.sh' '{{ branch }}' '{{ worktree_name }}'"
```

Each script takes the worktree’s name and does the project-specific work. The cleanup script mirrors the setup script. `{{ primary_worktree_path }}` lets each script reach the canonical `.env` without hardcoding a path.

I’d start with the native commands until the model makes sense:

```bash
git worktree add ../shop.review-fix fix/payment-review
git worktree list
git worktree remove ../shop.review-fix
```

Then I'd add Worktrunk when the repeated environment setup starts getting irritating.
