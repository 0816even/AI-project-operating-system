# Input Schema

The builder accepts a JSON file with this structure:

```json
{
  "project": {
    "name": "Aurora Experience Center",
    "manager": "Program Lead",
    "startDate": "2026-09-01",
    "targetDate": "2026-10-30",
    "timelineDays": 70,
    "viewStartDate": "2026-09-01"
  },
  "holidays": [
    { "name": "Public Holiday", "date": "2026-10-01" }
  ],
  "workdays": [],
  "tasks": [
    {
      "id": "P1",
      "parentId": "",
      "type": "Phase",
      "name": "Discovery and Definition",
      "description": "Confirm scope and operating requirements",
      "owner": "Program Lead",
      "startDate": "2026-09-01",
      "finishDate": "2026-09-12",
      "progress": 0.5,
      "status": "In Progress",
      "priority": "High",
      "dependency": "",
      "milestone": false,
      "confirmed": true,
      "notes": ""
    }
  ]
}
```

## Rules

- Dates use `YYYY-MM-DD`.
- Progress is a number from `0` to `1`.
- Type is `Phase`, `Task`, or `Milestone`.
- Parent IDs must refer to an existing Phase.
- A Milestone uses the same start and finish date.
- `confirmed: false` marks an AI proposal or unresolved planning assumption.
- Status values: `Not Started`, `In Progress`, `Ready for Acceptance`, `Accepted`, `Blocked`, `On Hold`.
- Priority values: `P0`, `High`, `Medium`, `Low`.
- Owner may be `TBD`; never invent a real person.
