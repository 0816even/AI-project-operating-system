# Fictional Usage Examples｜虚构使用示例

All names, dates, organizations, and project details below are fictional.

## 0. project-schedule-workbook

```text
请使用 project-schedule-workbook。

项目：Aurora客户体验中心
项目启动：2026-09-01
目标里程碑：2026-10-30完成运营移交
已知阶段：需求定义、设计与制作、安装联调、验收移交
已知任务：请读取 inputs/kickoff-notes.md
排期范围：70天

请把已确认信息与AI建议分开，生成一张可编辑的项目管理Excel。需要包含任务层级、Owner、起止日期、自然日/工作日、依赖、进度、状态、优先级、每日甘特图、Owner工作量、里程碑和节假日设置。所有汇总和甘特条必须联动，输出前检查公式和视觉效果。
```

Expected delivery: editable `.xlsx` schedule workbook, assumptions/gaps, formula validation, and visual QA result.

## 1. project-daily-decision

```text
请使用 project-daily-decision。

项目：Aurora客户体验中心
事实截止时间：2026-09-12 18:00
输入：最新主计划、昨日Daily Decision、今日供应商回报、Issue Register和验收台账
项目总控：docs/master-control.md
Decision Log：docs/decision-log.md

请区分事实、待决策、已确认决策、Action、Risk、Blocker和非Decision事项，生成今天的Daily Decision，并列出需要同步的文件。不要虚构Owner或日期。
```

Expected delivery: dated Daily Decision, decision-log delta, master-control delta, actions, risks/blockers, and consistency report.

## 2. meeting-to-decision

```text
Use meeting-to-decision.

Meeting: Aurora pilot-readiness review
Date: 2026-09-13
Inputs: notes/2026-09-13-readiness-review.md
Authority: Program Sponsor approves scope; Delivery Lead owns actions; QA Lead accepts tests
Existing logs: docs/decision-log.md and docs/action-register.md

Extract confirmed and pending decisions, actions with owners and deadlines, risks/blockers, superseded items, and downstream files requiring synchronization. Do not infer consensus from silence.
```

Expected delivery: confirmed/pending decisions, action table, risks, superseded items, sync checklist, and missing-information questions.

## 3. project-risk-review

```text
请使用 project-risk-review。

项目：Aurora客户体验中心
Review截止时间：2026-09-15 18:00
目标里程碑：2026-09-20试运营
输入：计划、决策台账、Issue Register、供应商状态、测试与验收证据、上一版Risk Review

请检查范围、进度、质量、安全/合规、系统稳定、版本、Owner、依赖、证据和验收，输出RAG状态、优先风险、Blocker、缓解措施、应急方案和里程碑预测。
```

Expected delivery: executive conclusion, health table, prioritized risk register, mitigation plan, forecast, deltas, and next-review triggers.

## 4. project-acceptance-gate

```text
Use project-acceptance-gate.

Project: Aurora Experience Center
Gate: Pilot-operation readiness
Cutoff: 2026-09-18 17:00
Scope: visitor route, control system, safety checks, content baseline, operator training
Inputs: acceptance criteria, issue register, test evidence, approvals, training record, and version baseline
Authorized acceptors: QA Lead, Operations Lead, Program Sponsor

Return PASS, CONDITIONAL PASS, or FAIL. Provide a criterion-to-evidence matrix, blockers, residual obligations, required approvals, and retest plan. Missing evidence must not become PASS.
```

Expected delivery: gate decision, evidence matrix, blockers, residual register, signatures, gaps, and retest plan.

## 5. vendor-feedback-to-action

```text
请使用 vendor-feedback-to-action。

项目：Aurora客户体验中心
原始反馈：inputs/vendor-punch-list.xlsx、inputs/qa-walkthrough.md、inputs/client-comments.md
现有台账：docs/issue-register.xlsx
里程碑：2026-09-20试运营
优先级：P0影响安全或核心运营；P1影响客户体验；P2为后续优化

请保留所有Source ID，标准化并去重，区分缺陷、变更、澄清、偏好、风险和范围争议，输出Owner、日期缺口、证据标准、验收人、状态和升级条件。供应商完成声明不能直接等于关闭。
```

Expected delivery: intake reconciliation, normalized action register, merge map, milestone batches, ambiguity/dispute list, and acceptance queue.

## 6. project-final-closeout

```text
Use project-final-closeout.

Project: Aurora Experience Center
Closeout cutoff: 2026-10-05 18:00
Inputs: charter, final gate report, deliverable inventory, decision/risk/issue/change logs, training and handover records, warranty requirements
Commercial closeout: explicitly out of scope

Return READY FOR CLOSEOUT or NOT READY FOR CLOSEOUT with the sign-off matrix, version inventory, residual/dispute register, operational handover checklist, archive index, lessons learned, and post-close review date.
```

Expected delivery: closeout decision, inventories, residual controls, handover, log reconciliation, archive index, and lessons.

## 7. project-retrospective

```text
请使用 project-retrospective。

项目：Aurora客户体验中心
资产目录：projects/aurora-experience-center/
项目周期：2026-03-01至2026-10-05
我的角色：甲方项目经理
目标受众：内部能力复盘和匿名职业案例
权威来源顺序：签署文件 > 项目总控 > Decision/Risk/Acceptance记录 > 周报 > 工作文件
公开边界：匿名组织、人员、金额和未公开业务内容

请输出Timeline、Outcome、PM Ownership、Career Assets、Project OS、Efficiency Review、Workflow Audit、Skill Candidate，以及Workflow → Maturity → Action总表。区分Fact、Inference、Claim和Gap，不夸大个人贡献。
```

Expected delivery: evidence map, timeline/outcome, ownership/career assets, Project OS, efficiency review, workflow maturity, skill candidates, and consistency gaps.
