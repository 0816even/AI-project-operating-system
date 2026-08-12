---
name: project-daily-decision
description: Roll daily project facts into decision candidates, confirmed decisions, actions, risks, blockers, and synchronized control documents. Use for Daily Decision, daily project governance, decision-log maintenance, pre-meeting decision cards, 每日决策滚动, 项目日清, 决策台账维护, or 会前决策卡.
---

# Project Daily Decision

## Purpose

Maintain one evidence-based daily decision loop without turning ordinary tasks into decisions.

## Required Context

- current master control document and decision log
- latest daily decision and post-meeting conclusions
- current schedule, issue/risk/acceptance registers, and changed source files
- project delivery lines, owners, milestone, and source-of-truth rules

If the master control document or naming convention is missing, discover the closest equivalent and state the temporary convention before writing.

## Workflow

1. Discover inputs by recency and authority; list every material input reviewed.
2. Separate facts, assumptions, conflicts, decisions, actions, risks, and blockers.
3. A decision exists only if human authority must choose or confirm scope, priority, owner authority, source of truth, acceptance, release, budget, public claim, or a consequential trade-off.
4. For each candidate record background, current evidence, options or recommendation, decision owner, deadline, impact, and downstream files.
5. Reconcile confirmed outcomes into the durable decision log; mark superseded decisions rather than silently deleting them.
6. Update the compact master control state and only the downstream artifacts actually affected.
7. Run a consistency check for conflicting status, stale references, duplicate owners, missing absolute dates, and “done” without evidence or acceptance.

## Rules

- Do not invent meeting conclusions, owners, dates, completion, or approval.
- Keep execution actions out of the decision list unless they cross the decision threshold.
- Preserve `施工/制作完成` and `验收关闭` as separate states.
- Use absolute dates. Flag vague commitments such as “尽快”.
- A blocker has no safe in-scope path forward; a risk still has a mitigation path.
- Keep the master control compact; do not mechanically append stale history.

## Output

Produce or update:

1. dated Daily Decision with inputs, state summary, decision candidates, confirmed decisions, actions, risks/blockers, and non-decisions;
2. durable decision-log entries;
3. master-control changes;
4. affected downstream files;
5. consistency report listing checked, changed, unchanged, unresolved, and skipped areas.

## Boundary and Failure Handling

AI may classify, reconcile, draft recommendations, and update authorized project files. Humans approve consequential decisions and acceptance. If sources conflict, show both claims, rank source authority, and create a pending decision or blocker; never resolve by guesswork.

## Completion Check

- every conclusion has a source;
- every open decision has one accountable decision owner and deadline;
- every confirmed durable decision is synchronized;
- no task is mislabeled as a decision;
- unresolved conflicts are visible.
