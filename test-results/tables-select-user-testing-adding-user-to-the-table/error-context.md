# Test info

- Name: testing adding user to the table
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\tables-select-user.spec.ts:3:5

# Error details

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('add-user-name')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\tables-select-user.spec.ts:6:43
```

# Page snapshot

```yaml
- navigation:
  - heading "Damian's Platform" [level=2]
  - paragraph: for Automation Testing Practice
  - link "Home":
    - /url: /
  - button "Core Modules ▼"
  - button "Advanced Modules ▼"
- heading "Tables" [level=1]
- paragraph: Manage users with add, edit, delete, and export functionality.
- text: User Management A sortable and filterable user table with add, edit, delete, and export actions.
- textbox "Search users..."
- button "Add User":
  - img
  - text: Add User
- button "Delete Selected (0)" [disabled]:
  - img
  - text: Delete Selected (0)
- button "Export Selected" [disabled]:
  - img
  - text: Export Selected
- table:
  - rowgroup:
    - row "ID Name Email Status Role Last Login Actions":
      - cell:
        - checkbox
      - cell "ID":
        - text: ID
        - img
      - cell "Name":
        - text: Name
        - img
      - cell "Email":
        - text: Email
        - img
      - cell "Status":
        - text: Status
        - img
      - cell "Role":
        - text: Role
        - img
      - cell "Last Login":
        - text: Last Login
        - img
      - cell "Actions"
  - rowgroup:
    - row "c766515c... John Smith john.smith@example.com active Admin 2023-03-15 Edit user John Smith":
      - cell:
        - checkbox
      - cell "c766515c..."
      - cell "John Smith"
      - cell "john.smith@example.com"
      - cell "active"
      - cell "Admin"
      - cell "2023-03-15"
      - cell "Edit user John Smith":
        - button "Edit user John Smith":
          - img
    - row "f7bca1d6... Sarah Johnson sarah@example.com active Editor 2023-03-12 Edit user Sarah Johnson":
      - cell:
        - checkbox
      - cell "f7bca1d6..."
      - cell "Sarah Johnson"
      - cell "sarah@example.com"
      - cell "active"
      - cell "Editor"
      - cell "2023-03-12"
      - cell "Edit user Sarah Johnson":
        - button "Edit user Sarah Johnson":
          - img
    - row "68bb88c5... Michael Brown mbrown@example.com inactive Viewer 2023-02-28 Edit user Michael Brown":
      - cell:
        - checkbox
      - cell "68bb88c5..."
      - cell "Michael Brown"
      - cell "mbrown@example.com"
      - cell "inactive"
      - cell "Viewer"
      - cell "2023-02-28"
      - cell "Edit user Michael Brown":
        - button "Edit user Michael Brown":
          - img
    - row "ed748456... Jessica Williams jwilliams@example.com pending Editor 2023-03-14 Edit user Jessica Williams":
      - cell:
        - checkbox
      - cell "ed748456..."
      - cell "Jessica Williams"
      - cell "jwilliams@example.com"
      - cell "pending"
      - cell "Editor"
      - cell "2023-03-14"
      - cell "Edit user Jessica Williams":
        - button "Edit user Jessica Williams":
          - img
    - row "4211afe3... David Miller david@example.com active Admin 2023-03-10 Edit user David Miller":
      - cell:
        - checkbox
      - cell "4211afe3..."
      - cell "David Miller"
      - cell "david@example.com"
      - cell "active"
      - cell "Admin"
      - cell "2023-03-10"
      - cell "Edit user David Miller":
        - button "Edit user David Miller":
          - img
    - row "ed833ac4... Emma Davis emma@example.com inactive Viewer 2023-02-15 Edit user Emma Davis":
      - cell:
        - checkbox
      - cell "ed833ac4..."
      - cell "Emma Davis"
      - cell "emma@example.com"
      - cell "inactive"
      - cell "Viewer"
      - cell "2023-02-15"
      - cell "Edit user Emma Davis":
        - button "Edit user Emma Davis":
          - img
    - row "7df8b536... Robert Wilson rwilson@example.com active Editor 2023-03-08 Edit user Robert Wilson":
      - cell:
        - checkbox
      - cell "7df8b536..."
      - cell "Robert Wilson"
      - cell "rwilson@example.com"
      - cell "active"
      - cell "Editor"
      - cell "2023-03-08"
      - cell "Edit user Robert Wilson":
        - button "Edit user Robert Wilson":
          - img
    - row "48acdaef... Jennifer Taylor jtaylor@example.com pending Viewer 2023-03-01 Edit user Jennifer Taylor":
      - cell:
        - checkbox
      - cell "48acdaef..."
      - cell "Jennifer Taylor"
      - cell "jtaylor@example.com"
      - cell "pending"
      - cell "Viewer"
      - cell "2023-03-01"
      - cell "Edit user Jennifer Taylor":
        - button "Edit user Jennifer Taylor":
          - img
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('testing adding user to the table', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/tables');
   5 |   await page.getByTestId('add-user-button').click();
>  6 |   await page.getByTestId('add-user-name').fill('admin');
     |                                           ^ Error: locator.fill: Test timeout of 30000ms exceeded.
   7 |   await page.getByTestId('add-user-email').click();
   8 |   await page.getByTestId('add-user-email').fill('admin@admin.com');
   9 |   await page.getByTestId('add-user-status-trigger').click();
  10 |   await page.getByRole('option', { name: 'Pending' }).click();
  11 |   await page.getByTestId('add-user-role').click();
  12 |   await page.getByTestId('add-user-role').fill('admin');
  13 |   await page.getByTestId('add-user-save').click();
  14 | })
```