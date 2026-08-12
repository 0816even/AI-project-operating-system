import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error("Usage: node build_project_schedule.mjs <input.json> <output.xlsx>");
}

const input = JSON.parse(await fs.readFile(inputPath, "utf8"));
const project = input.project || {};
const tasks = input.tasks || [];
const holidays = input.holidays || [];
const workdays = input.workdays || [];
const horizon = Math.max(28, Math.min(Number(project.timelineDays || 84), 180));
const reservedRows = Math.max(100, tasks.length + 20);
const firstTaskRow = 8;
const lastTaskRow = firstTaskRow + reservedRows - 1;

function parseDate(value) {
  if (!value) return null;
  const [y, m, d] = String(value).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function colName(n) {
  let s = "";
  while (n > 0) {
    n--;
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26);
  }
  return s;
}

function assertInputs() {
  if (!project.name || !project.startDate) throw new Error("project.name and project.startDate are required");
  const ids = new Set();
  for (const task of tasks) {
    if (!task.id || ids.has(task.id)) throw new Error(`Task IDs must be present and unique: ${task.id || "missing"}`);
    ids.add(task.id);
    const start = parseDate(task.startDate);
    const finish = parseDate(task.finishDate);
    if (start && finish && finish < start) throw new Error(`Finish precedes start for ${task.id}`);
  }
  for (const task of tasks) {
    if (task.parentId && !ids.has(task.parentId)) throw new Error(`Unknown parentId ${task.parentId} for ${task.id}`);
  }
}
assertInputs();

const wb = Workbook.create();
const guide = wb.worksheets.add("使用指南");
const gantt = wb.worksheets.add("项目总控甘特图");
const analysis = wb.worksheets.add("项目进展分析");
const calendar = wb.worksheets.add("节假日设置");
for (const sheet of [guide, gantt, analysis, calendar]) {
  sheet.showGridLines = false;
}

const navy = "#17324D";
const blue = "#2F75B5";
const lightBlue = "#D9EAF7";
const greenInput = "#E2F0D9";
const yellowInput = "#FFF2CC";
const gray = "#E7E6E6";
const darkGray = "#666666";
const white = "#FFFFFF";
const red = "#C00000";

// Guide
guide.getRange("A1:H1").merge();
guide.getRange("A1").values = [["项目排期管理表｜使用指南"]];
guide.getRange("A1:H1").format = { fill: navy, font: { bold: true, color: white, size: 18 }, horizontalAlignment: "center", verticalAlignment: "center" };
guide.getRange("A1:H1").format.rowHeight = 34;
guide.getRange("A3:B11").values = [
  ["区域/颜色", "使用方式"],
  ["绿色单元格", "可编辑的任务输入：任务、Owner、日期、进度、状态、优先级、依赖、备注。"],
  ["黄色单元格", "需要人工确认的假设或未确认计划。"],
  ["灰蓝单元格", "公式自动计算，不建议覆盖。"],
  ["Phase", "阶段行的起止时间、进度和状态由其直接子任务自动汇总。"],
  ["Task", "普通执行任务；完成工作后可标 Ready for Acceptance，验收后才标 Accepted。"],
  ["Milestone", "里程碑使用同一天作为开始与结束，在时间轴显示菱形。"],
  ["时间轴", "由计划日期自动生成；修改任务日期后甘特条自动移动。"],
  ["新增任务", `已预留至第 ${lastTaskRow} 行。请在空白准备行填入完整字段，不要删除公式列。`],
];
guide.getRange("A3:B3").format = { fill: blue, font: { bold: true, color: white } };
guide.getRange("A4:A11").format = { fill: lightBlue, font: { bold: true } };
guide.getRange("A3:B11").format.borders = { preset: "all", style: "thin", color: "#B4C6D7" };
guide.getRange("A13:H13").merge();
guide.getRange("A13").values = [["人工边界：AI可生成排期草案和联动公式；项目负责人、任务Owner、供应商和验收人必须确认范围、工期、资源、依赖与里程碑承诺。"]];
guide.getRange("A13:H13").format = { fill: yellowInput, font: { bold: true, color: "#7F6000" }, wrapText: true };
guide.getRange("A13:H13").format.rowHeight = 44;
guide.getRange("A:A").format.columnWidth = 20;
guide.getRange("B:B").format.columnWidth = 88;
guide.freezePanes.freezeRows(3);

// Calendar
calendar.getRange("A1:F1").merge();
calendar.getRange("A1").values = [["节假日与调休设置"]];
calendar.getRange("A1:F1").format = { fill: navy, font: { bold: true, color: white, size: 16 }, horizontalAlignment: "center" };
calendar.getRange("A2:D2").values = [["节假日名称", "节假日日期", "调休说明", "调休工作日"]];
calendar.getRange("A2:D2").format = { fill: blue, font: { bold: true, color: white } };
const holidayRows = Array.from({ length: 50 }, (_, i) => [holidays[i]?.name || "", parseDate(holidays[i]?.date), workdays[i]?.name || "", parseDate(workdays[i]?.date)]);
calendar.getRange("A3:D52").values = holidayRows;
calendar.getRange("A3:D52").format.fill = greenInput;
calendar.getRange("B3:B52").format.numberFormat = "yyyy-mm-dd";
calendar.getRange("D3:D52").format.numberFormat = "yyyy-mm-dd";
calendar.getRange("A2:D52").format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };
calendar.getRange("F2:F6").values = [["说明"], ["周六、周日默认非工作日。"], ["B列日期会从工作日计算中扣除。"], ["D列调休日期会重新计入工作日。"], ["修改日期后，主表工时与时间轴底色自动更新。"]];
calendar.getRange("F2").format = { fill: blue, font: { bold: true, color: white } };
calendar.getRange("F3:F6").format = { fill: lightBlue, wrapText: true };
calendar.getRange("A:A").format.columnWidth = 22;
calendar.getRange("B:B").format.columnWidth = 16;
calendar.getRange("C:C").format.columnWidth = 24;
calendar.getRange("D:D").format.columnWidth = 16;
calendar.getRange("F:F").format.columnWidth = 48;
calendar.freezePanes.freezeRows(2);

// Main Gantt
const timelineStartCol = 18; // R
const timelineEndCol = timelineStartCol + horizon - 1;
const timelineStartLetter = colName(timelineStartCol);
const timelineEndLetter = colName(timelineEndCol);
gantt.getRange(`A1:${timelineEndLetter}1`).merge();
gantt.getRange("A1").values = [[project.name]];
gantt.getRange(`A1:${timelineEndLetter}1`).format = { fill: navy, font: { bold: true, color: white, size: 18 }, horizontalAlignment: "left" };
gantt.getRange("A2:Q3").values = [
  ["项目负责人", project.manager || "TBD", "项目启动", parseDate(project.startDate), "目标节点", parseDate(project.targetDate), "时间轴起点", parseDate(project.viewStartDate || project.startDate), "显示天数", horizon, "任务总数", null, "整体进度", null, "Blocker", null, null],
  ["填写绿色区域；黄色表示未确认假设；灰蓝为公式。", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
];
gantt.getRange("A2:Q2").format = { fill: lightBlue, font: { bold: true }, verticalAlignment: "center" };
for (const cell of ["B2", "D2", "F2", "H2", "J2"]) gantt.getRange(cell).format.fill = greenInput;
gantt.getRange("D2:H2").format.numberFormat = "yyyy-mm-dd";
gantt.getRange("L2").formulas = [[`=COUNTIF($A$${firstTaskRow}:$A$${lastTaskRow},"<>")`]];
gantt.getRange("N2").formulas = [[`=IFERROR(AVERAGEIF($C$${firstTaskRow}:$C$${lastTaskRow},"<>Phase",$K$${firstTaskRow}:$K$${lastTaskRow}),0)`]];
gantt.getRange("N2").format.numberFormat = "0%";
gantt.getRange("P2").formulas = [[`=COUNTIF($L$${firstTaskRow}:$L$${lastTaskRow},"Blocked")`]];
gantt.getRange("L2:P2").format.fill = gray;
gantt.getRange("A3:Q3").merge();
gantt.getRange("A3").format = { fill: yellowInput, font: { color: "#7F6000" }, wrapText: true };

const headers = ["ID", "Parent ID", "Type", "Task / Phase / Milestone", "Description / Deliverable", "Owner", "Planned Start", "Planned Finish", "Calendar Days", "Workdays", "Progress", "Status", "Priority", "Dependency", "Schedule Health", "Confirmed", "Notes"];
gantt.getRange("A5:Q5").values = [headers];
gantt.getRange("A5:Q5").format = { fill: blue, font: { bold: true, color: white }, wrapText: true, horizontalAlignment: "center", verticalAlignment: "center" };
gantt.getRange("A5:Q5").format.rowHeight = 38;

// Timeline headers
gantt.getRange(`${timelineStartLetter}4`).formulas = [["=$H$2"]];
if (horizon > 1) {
  gantt.getRange(`${colName(timelineStartCol + 1)}4`).formulas = [[`=${timelineStartLetter}4+1`]];
  gantt.getRange(`${colName(timelineStartCol + 1)}4:${timelineEndLetter}4`).fillRight();
}
gantt.getRange(`${timelineStartLetter}5`).formulas = [[`=CHOOSE(WEEKDAY(${timelineStartLetter}4,1),"Sun","Mon","Tue","Wed","Thu","Fri","Sat")`]];
if (horizon > 1) gantt.getRange(`${timelineStartLetter}5:${timelineEndLetter}5`).fillRight();
gantt.getRange(`${timelineStartLetter}4:${timelineEndLetter}4`).format = { fill: navy, font: { bold: true, color: white }, numberFormat: "mm-dd", horizontalAlignment: "center" };
gantt.getRange(`${timelineStartLetter}5:${timelineEndLetter}5`).format = { fill: blue, font: { bold: true, color: white, size: 9 }, horizontalAlignment: "center" };

const rows = Array.from({ length: reservedRows }, () => Array(17).fill(null));
tasks.forEach((t, idx) => {
  rows[idx] = [t.id, t.parentId || "", t.type || (t.milestone ? "Milestone" : "Task"), t.name || "", t.description || "", t.owner || "TBD", parseDate(t.startDate), parseDate(t.finishDate), null, null, Number(t.progress || 0), t.status || "Not Started", t.priority || "Medium", t.dependency || "", null, t.confirmed === false ? "Assumption" : "Confirmed", t.notes || ""];
});
gantt.getRange(`A${firstTaskRow}:Q${lastTaskRow}`).values = rows;

// Formula-driven phase rollups and all derived columns
for (let i = 0; i < reservedRows; i++) {
  const row = firstTaskRow + i;
  const task = tasks[i];
  if (task?.type === "Phase") {
    gantt.getRange(`G${row}`).formulas = [[`=IFERROR(MINIFS($G$${firstTaskRow}:$G$${lastTaskRow},$B$${firstTaskRow}:$B$${lastTaskRow},$A${row}),"")`]];
    gantt.getRange(`H${row}`).formulas = [[`=IFERROR(MAXIFS($H$${firstTaskRow}:$H$${lastTaskRow},$B$${firstTaskRow}:$B$${lastTaskRow},$A${row}),"")`]];
    gantt.getRange(`K${row}`).formulas = [[`=IFERROR(AVERAGEIF($B$${firstTaskRow}:$B$${lastTaskRow},$A${row},$K$${firstTaskRow}:$K$${lastTaskRow}),0)`]];
    gantt.getRange(`L${row}`).formulas = [[`=IF(COUNTIFS($B$${firstTaskRow}:$B$${lastTaskRow},$A${row},$L$${firstTaskRow}:$L$${lastTaskRow},"Blocked")>0,"Blocked",IF($K${row}=1,"Accepted",IF($K${row}>0,"In Progress","Not Started")))`]];
  }
  gantt.getRange(`I${row}`).formulas = [[`=IF(OR($A${row}="",$G${row}="",$H${row}=""),"",$H${row}-$G${row}+1)`]];
  gantt.getRange(`J${row}`).formulas = [[`=IF(OR($A${row}="",$G${row}="",$H${row}=""),"",NETWORKDAYS.INTL($G${row},$H${row},1,'节假日设置'!$B$3:$B$52)+COUNTIFS('节假日设置'!$D$3:$D$52,">="&$G${row},'节假日设置'!$D$3:$D$52,"<="&$H${row}))`]];
  gantt.getRange(`O${row}`).formulas = [[`=IF($A${row}="","",IF($L${row}="Accepted","Accepted",IF($L${row}="Blocked","Blocked",IF($H${row}<TODAY(),"Overdue",IF($H${row}-TODAY()<=3,"Due Soon","On Track")))))`]];
  gantt.getRange(`${timelineStartLetter}${row}`).formulas = [[`=IF($A${row}="","",IF($C${row}="Milestone",IF(${timelineStartLetter}$4=$G${row},"◆",""),IF(AND(${timelineStartLetter}$4>=$G${row},${timelineStartLetter}$4<=$H${row}),"■","")))`]];
  if (horizon > 1) gantt.getRange(`${timelineStartLetter}${row}:${timelineEndLetter}${row}`).fillRight();
}

gantt.getRange(`G${firstTaskRow}:H${lastTaskRow}`).format.numberFormat = "yyyy-mm-dd";
gantt.getRange(`I${firstTaskRow}:J${lastTaskRow}`).format.numberFormat = "0";
gantt.getRange(`K${firstTaskRow}:K${lastTaskRow}`).format.numberFormat = "0%";
gantt.getRange(`A${firstTaskRow}:H${lastTaskRow}`).format.fill = greenInput;
gantt.getRange(`K${firstTaskRow}:N${lastTaskRow}`).format.fill = greenInput;
gantt.getRange(`P${firstTaskRow}:Q${lastTaskRow}`).format.fill = greenInput;
gantt.getRange(`I${firstTaskRow}:J${lastTaskRow}`).format.fill = gray;
gantt.getRange(`O${firstTaskRow}:O${lastTaskRow}`).format.fill = gray;
for (let i = 0; i < tasks.length; i++) {
  const row = firstTaskRow + i;
  if (tasks[i].type === "Phase") gantt.getRange(`A${row}:Q${row}`).format = { fill: "#B4C6E7", font: { bold: true, color: navy } };
  if (tasks[i].confirmed === false) gantt.getRange(`A${row}:Q${row}`).format.fill = yellowInput;
}

gantt.getRange(`C${firstTaskRow}:C${lastTaskRow}`).dataValidation = { rule: { type: "list", values: ["Phase", "Task", "Milestone"] } };
gantt.getRange(`K${firstTaskRow}:K${lastTaskRow}`).dataValidation = { rule: { type: "decimal", operator: "between", formula1: 0, formula2: 1 } };
gantt.getRange(`L${firstTaskRow}:L${lastTaskRow}`).dataValidation = { rule: { type: "list", values: ["Not Started", "In Progress", "Ready for Acceptance", "Accepted", "Blocked", "On Hold"] } };
gantt.getRange(`M${firstTaskRow}:M${lastTaskRow}`).dataValidation = { rule: { type: "list", values: ["P0", "High", "Medium", "Low"] } };
gantt.getRange(`P${firstTaskRow}:P${lastTaskRow}`).dataValidation = { rule: { type: "list", values: ["Confirmed", "Assumption"] } };

gantt.getRange(`O${firstTaskRow}:O${lastTaskRow}`).conditionalFormats.add("containsText", { text: "Overdue", format: { fill: "#F4CCCC", font: { color: red, bold: true } } });
gantt.getRange(`O${firstTaskRow}:O${lastTaskRow}`).conditionalFormats.add("containsText", { text: "Blocked", format: { fill: "#E6B8AF", font: { color: red, bold: true } } });
gantt.getRange(`O${firstTaskRow}:O${lastTaskRow}`).conditionalFormats.add("containsText", { text: "On Track", format: { fill: "#D9EAD3", font: { color: "#274E13" } } });
gantt.getRange(`${timelineStartLetter}${firstTaskRow}:${timelineEndLetter}${lastTaskRow}`).conditionalFormats.add("containsText", { text: "■", format: { fill: "#5B9BD5", font: { color: "#5B9BD5" } } });
gantt.getRange(`${timelineStartLetter}${firstTaskRow}:${timelineEndLetter}${lastTaskRow}`).conditionalFormats.add("containsText", { text: "◆", format: { fill: "#FFD966", font: { color: "#BF9000", bold: true } } });
gantt.getRange(`${timelineStartLetter}4:${timelineEndLetter}5`).conditionalFormats.addCustom(`${timelineStartLetter}$4=TODAY()`, { fill: "#E06666", font: { color: white, bold: true } });
gantt.getRange(`${timelineStartLetter}4:${timelineEndLetter}5`).conditionalFormats.addCustom(`COUNTIF('节假日设置'!$B$3:$B$52,${timelineStartLetter}$4)>0`, { fill: "#FCE5CD", font: { color: "#783F04" } });

gantt.getRange(`A5:Q${lastTaskRow}`).format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };
gantt.getRange(`${timelineStartLetter}4:${timelineEndLetter}${lastTaskRow}`).format.borders = { preset: "all", style: "thin", color: "#E7E6E6" };
const widths = [10, 11, 12, 28, 34, 18, 13, 13, 11, 11, 11, 20, 11, 16, 16, 12, 30];
widths.forEach((w, i) => gantt.getRange(`${colName(i + 1)}:${colName(i + 1)}`).format.columnWidth = w);
gantt.getRange(`${timelineStartLetter}:${timelineEndLetter}`).format.columnWidth = 4.2;
gantt.getRange(`D${firstTaskRow}:Q${lastTaskRow}`).format.wrapText = true;
gantt.freezePanes.freezeRows(5);
gantt.freezePanes.freezeColumns(17);

// Analysis
analysis.getRange("A1:H1").merge();
analysis.getRange("A1").values = [[`${project.name}｜项目进展分析`]];
analysis.getRange("A1:H1").format = { fill: navy, font: { bold: true, color: white, size: 17 }, horizontalAlignment: "center" };
analysis.getRange("A3:F3").values = [["Total Items", "Accepted", "In Progress", "Blocked", "Overdue", "Overall Progress"]];
analysis.getRange("A3:F3").format = { fill: blue, font: { bold: true, color: white }, horizontalAlignment: "center" };
analysis.getRange("A4:F4").formulas = [[
  `=COUNTIF('项目总控甘特图'!$A$${firstTaskRow}:$A$${lastTaskRow},"<>")`,
  `=COUNTIF('项目总控甘特图'!$L$${firstTaskRow}:$L$${lastTaskRow},"Accepted")`,
  `=COUNTIF('项目总控甘特图'!$L$${firstTaskRow}:$L$${lastTaskRow},"In Progress")`,
  `=COUNTIF('项目总控甘特图'!$L$${firstTaskRow}:$L$${lastTaskRow},"Blocked")`,
  `=COUNTIF('项目总控甘特图'!$O$${firstTaskRow}:$O$${lastTaskRow},"Overdue")`,
  `=IFERROR(AVERAGEIF('项目总控甘特图'!$C$${firstTaskRow}:$C$${lastTaskRow},"<>Phase",'项目总控甘特图'!$K$${firstTaskRow}:$K$${lastTaskRow}),0)`
]];
analysis.getRange("A4:F4").format = { fill: lightBlue, font: { bold: true, size: 14 }, horizontalAlignment: "center" };
analysis.getRange("F4").format.numberFormat = "0%";

const owners = [...new Set(tasks.filter(t => t.type !== "Phase").map(t => t.owner || "TBD"))];
analysis.getRange("A7:C7").values = [["Owner", "Task Count", "Planned Workdays"]];
analysis.getRange("A7:C7").format = { fill: blue, font: { bold: true, color: white } };
owners.forEach((owner, i) => {
  const row = 8 + i;
  analysis.getRange(`A${row}`).values = [[owner]];
  analysis.getRange(`B${row}`).formulas = [[`=COUNTIFS('项目总控甘特图'!$F$${firstTaskRow}:$F$${lastTaskRow},$A${row},'项目总控甘特图'!$C$${firstTaskRow}:$C$${lastTaskRow},"<>Phase")`]];
  analysis.getRange(`C${row}`).formulas = [[`=SUMIFS('项目总控甘特图'!$J$${firstTaskRow}:$J$${lastTaskRow},'项目总控甘特图'!$F$${firstTaskRow}:$F$${lastTaskRow},$A${row},'项目总控甘特图'!$C$${firstTaskRow}:$C$${lastTaskRow},"<>Phase")`]];
});
const ownerEnd = Math.max(8, 7 + owners.length);
analysis.getRange(`A7:C${ownerEnd}`).format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };

const statuses = ["Not Started", "In Progress", "Ready for Acceptance", "Accepted", "Blocked", "On Hold"];
analysis.getRange("E7:F7").values = [["Status", "Count"]];
analysis.getRange("E7:F7").format = { fill: blue, font: { bold: true, color: white } };
statuses.forEach((status, i) => {
  const row = 8 + i;
  analysis.getRange(`E${row}`).values = [[status]];
  analysis.getRange(`F${row}`).formulas = [[`=COUNTIF('项目总控甘特图'!$L$${firstTaskRow}:$L$${lastTaskRow},$E${row})`]];
});
analysis.getRange("E7:F13").format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };

const milestones = tasks.filter(t => t.type === "Milestone" || t.milestone);
analysis.getRange("A18:E18").values = [["Milestone", "Owner", "Target Date", "Status", "Confirmed"]];
analysis.getRange("A18:E18").format = { fill: blue, font: { bold: true, color: white } };
milestones.forEach((m, i) => analysis.getRange(`A${19 + i}:E${19 + i}`).values = [[m.name, m.owner || "TBD", parseDate(m.finishDate), m.status || "Not Started", m.confirmed === false ? "Assumption" : "Confirmed"]]);
if (milestones.length) {
  analysis.getRange(`C19:C${18 + milestones.length}`).format.numberFormat = "yyyy-mm-dd";
  analysis.getRange(`A18:E${18 + milestones.length}`).format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };
}
analysis.getRange("A:A").format.columnWidth = 28;
analysis.getRange("B:C").format.columnWidth = 18;
analysis.getRange("E:E").format.columnWidth = 24;
analysis.getRange("F:F").format.columnWidth = 16;
analysis.freezePanes.freezeRows(3);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(outputPath);

const check = await wb.inspect({ kind: "table", range: "'项目总控甘特图'!A1:Z20", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 26, maxChars: 12000 });
const errors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" });
console.log(check.ndjson);
console.log(errors.ndjson);
