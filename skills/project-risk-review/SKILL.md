---
name: project-risk-review
description: Review project health and produce an evidence-based risk register, red-amber-green status, blockers, mitigations, escalation decisions, and next-review triggers. Use for project risk review, health assessment, milestone risk, delivery risk, pre-release review, 项目风险复核, 健康度评估, 里程碑风险, or 交付风险.
---

# Project Risk Review

## Purpose

Convert current project evidence into prioritized, actionable risk control without confusing incomplete data with failure.

## Inputs

- scope, milestone, acceptance criteria, and delivery lines
- latest schedule, decisions, issues, dependencies, vendor status, and evidence register
- prior risk review and changes since that review

## Workflow

1. Establish the review cutoff time and evidence set.
2. Review scope, schedule, quality, safety/compliance, system stability, content/version, resource/ownership, dependency, evidence, and acceptance.
3. Separate fact, risk, active issue, and blocker.
4. Score likelihood and impact as Low/Medium/High; assign RAG using project-specific thresholds.
5. Identify leading indicator, trigger, mitigation, contingency, owner, deadline, residual risk, and escalation owner.
6. Compare with the prior review: new, increased, unchanged, reduced, closed, or converted to issue.
7. State the milestone forecast and decisions needed now.

## Rules

- Cite the exact local source for material claims.
- “Mostly complete” is not an acceptance result.
- Missing evidence lowers confidence; it does not automatically prove failure.
- A risk owner must be able to drive mitigation; an escalation owner holds decision authority.
- No green status when a P0 gate lacks evidence or acceptance.

## Output

1. executive conclusion and confidence;
2. dimension health table;
3. prioritized risk register;
4. blockers and decisions required;
5. mitigation/action plan;
6. milestone forecast with assumptions;
7. deltas since prior review and next review trigger.

## Boundary and Failure Handling

AI assesses evidence and recommends controls. Humans accept safety, compliance, budget, contractual, and release risk. When data is stale or contradictory, show the data-quality risk and provide conditional scenarios instead of a single false-precision forecast.

## Completion Check

Every red/amber item has evidence, owner, response, deadline/trigger, and escalation path; closed risks have closure evidence; unknowns are explicit.
