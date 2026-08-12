---
name: project-acceptance-gate
description: Run an evidence-based milestone, delivery, launch, handover, or final acceptance gate and return PASS, CONDITIONAL PASS, or FAIL with blockers and residual obligations. Use for acceptance gate, go/no-go, launch readiness, milestone acceptance, handover acceptance, 验收闸门, 交付准入, 上线检查, or 移交验收.
---

# Project Acceptance Gate

## Purpose

Make a strict, traceable readiness decision from predefined criteria and evidence.

## Inputs

- gate name, cutoff, scope, and authorized approvers
- acceptance criteria and P0/P1/P2 policy
- issue/control register and current state
- evidence such as files, photos, tests, approvals, training, handover records, and version baseline

## Workflow

1. Freeze the gate scope, cutoff time, criteria, and decision authority.
2. Build a criterion-to-evidence matrix; distinguish submitted, verified, accepted, rejected, expired, and missing evidence.
3. Check each criterion with a repeatable method and named acceptor.
4. Identify blockers: safety/compliance, core function, agreed P0, unstable operation, missing ownership, unbounded residual item, or absent required approval.
5. Decide:
   - `PASS`: all mandatory criteria accepted; no blocking residual.
   - `CONDITIONAL PASS`: no safety/core-function blocker; every residual has owner, absolute date, control, and authorized waiver.
   - `FAIL`: any mandatory blocker remains or evidence is insufficient for a safe decision.
6. Record residual items, conditions, expiry, re-test, rollback/containment, and final sign-off route.

## Rules

- Completion evidence is not acceptance evidence.
- Never convert missing evidence into PASS.
- Percent complete cannot override a failed mandatory criterion.
- The executor cannot self-accept unless governance explicitly allows it.
- AI must not issue professional safety, legal, regulatory, or contractual sign-off.

## Output

- gate decision and confidence
- criterion/evidence/result matrix
- blockers
- conditional residual register, if applicable
- required signatures/approvals
- re-test plan and next gate time
- source list and unresolved evidence gaps

## Boundary and Failure Handling

AI checks completeness, consistency, and policy logic and drafts the gate recommendation. Authorized humans sign. If criteria were never defined, output `BLOCKED—criteria missing`, propose a draft rubric, and require approval before running the real gate.

## Completion Check

The decision is reproducible from the matrix; every accepted criterion has evidence and acceptor; every residual is bounded; the final authority is named.
