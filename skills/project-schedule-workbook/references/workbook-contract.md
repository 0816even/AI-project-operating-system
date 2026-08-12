# Workbook Contract

## 使用指南

Explain editable colors, task hierarchy, formula areas, schedule states, timeline behavior, and the difference between work complete and acceptance.

## 项目总控甘特图

Required left-side fields:

- ID, Parent ID, Type
- Task/Phase/Milestone
- Description/Deliverable
- Owner
- Planned Start, Planned Finish
- Calendar Days, Workdays
- Progress, Status, Priority
- Dependency
- Schedule Health/Delay
- Confirmed/Assumption
- Notes

Required timeline behavior:

- daily columns from the configured view start for the requested horizon
- date and weekday headers
- task bars driven by planned dates
- milestone marker
- weekend/holiday shading
- today marker when today falls inside the view
- phase rows visually distinct
- frozen task columns and header rows

Editable fields must use a consistent green or light-yellow input fill. Formula cells use neutral gray/blue. Timeline cells are presentation-only and driven by formulas/conditional formats.

## 项目进展分析

At minimum show:

- total tasks, accepted tasks, in-progress tasks, blocked tasks, overdue tasks
- overall progress
- task count and planned workdays by owner
- task count by status
- milestone list and current readiness

All summaries must reference the task sheet rather than duplicate static values.

## 节假日设置

Editable holiday and adjusted-workday dates. The main timeline and workday formulas must reference this sheet.

## Editing Behavior

- Users may edit task fields, insert additional prepared rows, change dates/progress/status/owner, and update holidays.
- Formulas must cover a reserved task range so newly populated prepared rows remain linked.
- Adding dates beyond the existing horizon requires rerunning the skill or explicitly extending the prepared timeline columns.
