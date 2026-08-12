---
name: meeting-to-decision
description: Convert meeting records into confirmed decisions, pending decisions, actions, owners, deadlines, risks, and synchronized project logs. Use for meeting-to-decision, meeting conclusions, action extraction, decision logging, 会后纪要转决策, 行动提取, 决策入账, or 会后同步.
---

# Meeting to Decision

## Purpose

Turn a meeting into an auditable execution delta, not a narrative transcript.

## Inputs

- meeting evidence and date
- attendees or known authority roles
- pre-meeting decision questions
- current decision log, action register, and affected project sources

## Workflow

1. Extract explicit statements and label speaker/source when available.
2. Classify each item as confirmed decision, pending decision, action, information, risk, blocker, or rejected/superseded option.
3. Treat an item as confirmed only when the authorized owner clearly agrees; otherwise keep it pending.
4. Normalize each confirmed decision into decision, reason, impact, owner, effective date, follow-up, and tracking state.
5. Normalize each action into verb-led result, accountable owner, absolute deadline, completion evidence, dependency, and escalation condition.
6. Compare with the existing log; update, supersede, or link rather than duplicate.
7. Identify downstream documents whose truth changed and prepare a synchronization list.

## Rules

- Do not infer consensus from silence or discussion volume.
- Separate the person doing work from the person authorized to decide or accept it.
- Do not create dates, owners, or final wording absent from evidence; mark them `待确认`.
- Omit debate details unless needed to explain the final rationale or risk.
- Preserve dissent or unresolved alternatives only when they affect execution.

## Output

- meeting metadata and inputs
- confirmed decisions table
- pending decisions table
- action table
- risks/blockers
- superseded items
- downstream synchronization checklist
- missing-information list

## Boundary and Failure Handling

AI structures evidence and drafts log updates. Humans validate ambiguous authority and approve material decisions. If notes are incomplete, output a provisional record with confidence and exact confirmation questions; never present it as final.

## Completion Check

Every confirmed decision has authority evidence; every action has an owner, date or explicit gap, and evidence standard; changed project truth has a synchronization target.
