---
name: project-schedule-workbook
description: Create an editable, formula-driven project management schedule workbook from known milestones, phases, tasks, owners, dates, dependencies, and progress. Use for project kickoff schedule, Gantt workbook, project plan spreadsheet, resource workload view, 项目启动排期, 项目管理表, 甘特图, 里程碑计划, 任务排期, or 可编辑联动项目表.
---

# Project Schedule Workbook

## Purpose

Turn known project kickoff information into an editable `.xlsx` project-control workbook with task hierarchy, formula-driven rollups, daily Gantt timeline, workload analysis, holiday settings, and clear editable boundaries.

## Required Inputs

- project name, project start, target milestone, and schedule horizon
- phases/milestones and tasks
- task owner, planned start, planned finish or duration
- known dependencies, status, progress, priority, and notes
- working calendar/holiday policy when relevant

If exact dates or owners are unknown, keep explicit `TBD` gaps. Do not invent commitments. AI may propose a draft sequence, but label every inferred dependency or date for human confirmation.

Use `references/input-schema.md` to normalize inputs. Use `references/workbook-contract.md` as the required workbook behavior.

## Workflow

1. Inspect the supplied project facts and separate confirmed inputs from assumptions and gaps.
2. Normalize the work breakdown structure: phase, milestone, task ID, parent ID, owner, dates, dependency, progress, status, priority, evidence, and notes.
3. Validate schedule logic: finish is not before start, dependencies exist, milestones have zero or one-day duration, owners and dates are explicit gaps when missing, and the timeline covers the target milestone.
4. Create a new workbook using the bundled spreadsheet runtime and the provided `scripts/build_project_schedule.mjs`; never overwrite a source workbook.
5. Generate at least:
   - `使用指南`
   - `项目总控甘特图`
   - `项目进展分析`
   - `节假日设置`
6. Keep editable cells visibly distinct. Derived duration, delay, health, summaries, and timeline bars must remain formula/conditional-format driven.
7. Apply validation lists for status, priority, progress, and task type where supported.
8. Inspect key ranges and scan for formula errors.
9. Render every sheet and visually verify legibility, frozen panes, widths, dates, timeline, and summary areas.
10. Export one final `.xlsx` to the requested output directory and report assumptions and unresolved gaps.

## Workbook Rules

- Preserve `task work complete` and `accepted/closed` as different states.
- Parent/phase dates and progress roll up from child tasks when child tasks exist.
- Editing task dates or progress must update duration, delay/health, summary metrics, workload, and Gantt bars.
- Use real date and numeric values, not date/percentage strings.
- Use absolute dates and bounded formula ranges.
- The calendar/timeline start and horizon are controlled by workbook settings or the normalized input; users may edit task fields without rebuilding.
- Weekends, configured holidays, today, milestones, critical/high-priority tasks, and overdue work must be visually distinguishable.
- Keep the workbook auditable: no hidden business rules or hardcoded derived results.
- Do not add macros, external links, credentials, real source-project data, or personal information not provided for the new project.

## Outputs

- editable project management workbook (`.xlsx`)
- input/assumption and schedule-gap summary
- validation result covering formulas, dates, dependencies, and visual rendering

## Boundary and Failure Handling

AI can structure the WBS, propose draft dependencies, create formulas, and generate the workbook. Humans confirm scope, task ownership, duration feasibility, resource capacity, contractual dates, and milestone commitments.

If the input lacks enough information for a credible baseline, generate a clearly labeled planning draft only when the user requests it; otherwise return a missing-input checklist. If formulas or rendering fail, repair the builder and rerun rather than delivering a static or broken workbook.

## Completion Check

- all supplied milestones and tasks are represented exactly once;
- confirmed versus inferred dates/dependencies are distinguishable;
- editable fields remain editable and derived fields are formulas;
- timeline responds to task dates;
- summary/workload values reconcile with the task list;
- no formula errors or broken references remain;
- every sheet passes visual review;
- source files remain unchanged.
