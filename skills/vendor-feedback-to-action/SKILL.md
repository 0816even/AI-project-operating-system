---
name: vendor-feedback-to-action
description: Convert vendor feedback, punch lists, inspection comments, or rectification requests into a traceable action register with priority, ownership, dates, evidence, acceptance, dependencies, and escalation. Use for vendor feedback to action, punch-list control, review comments to actions, 供应商反馈转行动, 整改清单, 验收意见归并, or 外部反馈闭环.
---

# Vendor Feedback to Action

## Purpose

Turn mixed external feedback into one controlled closure register while preserving source traceability and responsibility boundaries.

## Inputs

- raw feedback files and source/date/reviewer
- contract/scope boundary when available
- project priority policy, milestone, responsibility matrix, and acceptance rules
- existing issue register to prevent duplication

## Workflow

1. Preserve raw sources; assign each feedback item a stable source ID.
2. Normalize into location/component, problem, expected outcome, source, date, and attachments.
3. Deduplicate only when items share the same defect and closure evidence; otherwise cross-link related items.
4. Classify as defect, change request, clarification, preference, risk, or out-of-scope claim.
5. Assign impact priority, accountable execution owner, dependencies, proposed/confirmed date, acceptor, and evidence standard.
6. Separate vendor commitment, work-complete claim, ready-for-acceptance, accepted, rejected, and closed.
7. Batch by milestone or work area without losing stable IDs.
8. Flag scope/contract disputes, missing locations, vague commitments, and systemic defects requiring multi-point sampling.

## Rules

- Do not invent locations, root causes, liability, dates, or contract conclusions.
- The client PM sets impact priority; the vendor confirms method, sequence, resources, and feasible dates.
- The vendor may mark ready for acceptance but not self-close an item.
- A photo proves a visible condition only; functional or systemic items need the relevant test.
- Preserve total counts and show merge/split mappings.

## Output

- intake summary and source reconciliation
- normalized action register
- duplicate/merge map
- priority and milestone batches
- ambiguity/scope-dispute list
- daily commitment and closure summaries
- acceptance and escalation queue

## Boundary and Failure Handling

AI structures, maps, and proposes classification. Humans decide contractual liability, professional acceptance, and disputed scope. If sources cannot be reconciled, keep both IDs and open a reconciliation task rather than overwriting history.

## Completion Check

Every source item is represented; counts reconcile; every actionable item has an owner or owner gap, date or commitment gap, evidence standard, acceptor, and state.
