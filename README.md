# AI Project Operating System Skills

[中文](#中文说明) · [English](#english)

A clean, reusable collection of eight Codex skills for evidence-based project governance—from kickoff scheduling and daily decisions to acceptance, closeout, and retrospective asset creation.

## 中文说明

### 这是什么

这是一套可组合使用的 AI 项目管理 Skill。它们帮助 Codex 从项目事实中生成可编辑排期表，并识别决策、风险、行动、验收状态和可复用资产，同时保留明确的人工决策与签署边界。

本仓库按私有 GitHub 仓库发布准备，但内容已按可公开级标准脱敏，不包含原始客户、项目、人员、供应商、合同或本机路径信息。

### Skill 列表

| Skill | 适用场景 | 主要交付 |
| --- | --- | --- |
| `project-schedule-workbook` | 项目启动排期、WBS、里程碑与甘特图 | 可编辑项目管理表、联动甘特图、进展与工作量分析 |
| `project-daily-decision` | 每日决策滚动、项目日清、会前决策卡 | Daily Decision、决策台账更新、总控同步、一致性报告 |
| `meeting-to-decision` | 会议纪要、转录或群聊转执行结论 | 已确认/待确认决策、Action、风险、同步清单 |
| `project-risk-review` | 周期性健康度、里程碑或交付风险复核 | RAG状态、风险台账、Blocker、缓解方案、预测 |
| `project-acceptance-gate` | 阶段验收、上线、交付、移交 | PASS/CONDITIONAL PASS/FAIL、证据矩阵、复验计划 |
| `vendor-feedback-to-action` | Punch list、供应商/客户/监理反馈闭环 | 去重行动台账、优先级、Owner、证据、验收队列 |
| `project-final-closeout` | 项目结项、运营移交、归档 | Closeout判断、交付物索引、遗留项、移交与归档包 |
| `project-retrospective` | 项目复盘、职业案例、Project OS与Skill审计 | Timeline、Outcome、PM Ownership、Project OS、Workflow Audit |

### 安装

将整个仓库克隆后，把需要的 Skill 复制到目标项目的 `.agents/skills/`：

```bash
git clone <your-private-repository-url>
mkdir -p <target-project>/.agents/skills
cp -R ai-project-operating-system/skills/* <target-project>/.agents/skills/
```

只安装一个 Skill：

```bash
cp -R ai-project-operating-system/skills/project-risk-review <target-project>/.agents/skills/
```

安装后重新加载项目或开启新任务，使 Skill 被重新发现。

### 调用方式

最稳定的方法是显式写出 Skill 名：

```text
请使用 project-risk-review。

项目：Aurora客户体验中心
事实截止时间：2026-09-15 18:00
输入：项目计划、Decision Log、Issue Register、供应商状态和验收证据
目标里程碑：2026-09-20试运营

请输出项目健康度、优先风险、Blocker、缓解措施、升级事项和里程碑预测。
```

更多虚构案例见 [`examples/fictional-project-examples.md`](examples/fictional-project-examples.md)。

### 组合使用

```text
会议闭环：meeting-to-decision → project-daily-decision → project-risk-review
供应商整改：vendor-feedback-to-action → project-daily-decision → project-acceptance-gate
项目资产化：project-acceptance-gate → project-final-closeout → project-retrospective
```

### 人工边界

Skill 可以发现、分类、对账、草拟、生成和同步已授权文件，但不会代替有权限的人完成最终决策、安全/法律/合同判断、供应商工期承诺、正式验收或签署。

## English

### What this is

This repository contains eight composable Codex skills for evidence-based project governance. They create editable project schedules and structure facts, decisions, actions, risks, acceptance evidence, closeout obligations, and reusable assets while preserving human approval boundaries.

The repository is prepared for private GitHub hosting, but its content is sanitized to a public-safe standard.

### Installation

Clone the repository and copy all or selected skill folders into a project's `.agents/skills/` directory:

```bash
git clone <your-private-repository-url>
mkdir -p <target-project>/.agents/skills
cp -R ai-project-operating-system/skills/* <target-project>/.agents/skills/
```

Reload the project or start a new task after installation.

### Invocation

Explicitly name the skill and provide the project, evidence cutoff, input paths, milestone, and requested output:

```text
Use project-acceptance-gate.

Project: Aurora Experience Center
Gate: Pilot-operation readiness
Evidence cutoff: 2026-09-18 17:00
Inputs: acceptance criteria, issue register, test evidence, training records, and version baseline

Return PASS, CONDITIONAL PASS, or FAIL with the evidence matrix, blockers, residual obligations, required approvals, and retest plan.
```

See [`examples/fictional-project-examples.md`](examples/fictional-project-examples.md) for one fictional prompt per skill.

### License

MIT. See [`LICENSE`](LICENSE).

### Privacy

See [`docs/privacy-scan.md`](docs/privacy-scan.md). Never commit real credentials, private customer data, contracts, personal data, or confidential project evidence with example prompts.
