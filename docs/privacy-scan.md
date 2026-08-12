# Privacy and Sensitive Information Scan

Scan date: 2026-08-12  
Repository target: Private GitHub repository  
Sanitization standard: Public-safe

## Scope

- all eight `skills/*/SKILL.md` files and the schedule builder/reference/example assets
- `README.md`
- `examples/fictional-project-examples.md`
- repository metadata files

## Checks

| Category | Result | Notes |
| --- | --- | --- |
| Real project/customer names | PASS | No source-project or customer identifiers retained |
| Real people or vendor names | PASS | None retained |
| Email, phone, address, ID numbers | PASS | None retained |
| Contracts, prices, invoices, payment data | PASS | None included |
| Credentials, tokens, secrets, `.env` values | PASS | None included; `.gitignore` blocks common env files |
| Local absolute paths/usernames | PASS | None retained |
| Proprietary project facts or metrics | PASS | None retained |
| Example data | PASS | Uses the explicitly fictional “Aurora Experience Center” project |
| External links or trackers | PASS | None embedded |

## Publication Decision

Approved for the user's selected **private repository**. The content is also sanitized to a public-safe standard, but changing repository visibility remains a human decision and should trigger a fresh scan of the actual Git commit contents.

## Before Every Push

1. Review `git diff --cached`.
2. Search staged content for credentials, emails, phone numbers, local paths, client names, contract terms, and copied project evidence.
3. Confirm repository visibility is Private on GitHub.
4. Do not add real project inputs to `examples/`.
5. Rotate any credential immediately if it is ever committed, even if the repository is private.
