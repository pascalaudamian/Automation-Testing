# Test info

- Name: DraggablePage >> should reorder items in Sortable List tab
- Location: C:\Users\damian.pascalau\Projects\automation-test-site\tests\drag-and-drops.spec.ts:28:7

# Error details

```
Error: locator.dragTo: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('sortable-0')

    at C:\Users\damian.pascalau\Projects\automation-test-site\tests\drag-and-drops.spec.ts:33:21
```

# Page snapshot

```yaml
- navigation:
  - heading "Damian's Platform" [level=2]
  - paragraph: for Automation Testing Practice
  - link "Home":
    - /url: /
  - button "Core Modules ▼"
  - button "Advanced Modules▼"
- heading "Drag & Drop" [level=1]
- paragraph: Practice with draggable elements and drop zones.
- tablist:
  - tab "Simple Dragging" [selected]
  - tab "Sortable List"
  - tab "Kanban Board"
- tabpanel "Simple Dragging":
  - text: Simple Dragging Drag items from the source container to the drop zone Item 1 Item 2 Item 3 Item 4 Item 5
  - paragraph: No items here. Drag items into this drop zone.
- text: Drag Event Log
- button "Clear"
- paragraph: No events yet
- button "Reset All"
- button "Save All"
- region "Notifications (F8)":
  - list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { skip } from 'node:test';
   3 |
   4 | test.describe('DraggablePage', () => {
   5 |   test.beforeEach(async ({ page }) => {
   6 |     await page.goto('/draggable'); // ajustează ruta dacă e diferită
   7 |   });
   8 |
   9 |   test('should render page with tabs and default simple tab', async ({ page }) => {
   10 |     await expect(page.getByTestId('page-title')).toHaveText('Drag & Drop');
   11 |     await expect(page.getByTestId('simple-tab')).toBeVisible();
   12 |     await expect(page.getByTestId('sortable-tab')).toBeVisible();
   13 |     await expect(page.getByTestId('kanban-tab')).toBeVisible();
   14 |     await expect(page.getByTestId('simple-tab')).toHaveAttribute('data-state', 'active');
   15 |   });
   16 |
   17 |   test('should drag and drop an item in Simple Dragging tab', async ({ page }) => {
   18 |     const sourceItem = page.getByTestId('draggable-item-1'); //  use `draggable-item-1` 
   19 |     const dropZone = page.getByTestId('drop-zone');
   20 |
   21 |     await sourceItem.dragTo(dropZone);
   22 |
   23 |     // Verify event log updated
   24 |     const log = page.getByTestId('event-log');
   25 |     await expect(log).toContainText('Dropped item-1');
   26 |   });
   27 |
   28 |   test('should reorder items in Sortable List tab', async ({ page }) => {
   29 |     await page.getByTestId('sortable-tab').click();
   30 |     const firstItem = page.getByTestId('sortable-0');
   31 |     const secondItem = page.getByTestId('sortable-1');
   32 |
>  33 |     await firstItem.dragTo(secondItem);
      |                     ^ Error: locator.dragTo: Test timeout of 30000ms exceeded.
   34 |
   35 |     const log = page.getByTestId('event-log');
   36 |     await expect(log).toContainText('Moved Apple from position 0 to 1');
   37 |   });
   38 |
   39 |   test('should move task across Kanban columns', async ({ page }) => {
   40 |     await page.getByTestId('kanban-tab').click();
   41 |     const task = page.getByTestId('kanban-task-1');
   42 |     const targetZone = page.getByTestId('drop-zone-in-progress');
   43 |
   44 |     await task.dragTo(targetZone);
   45 |
   46 |     const log = page.getByTestId('event-log');
   47 |     await expect(log).toContainText('Moved Research project requirements from To Do to In Progress');
   48 |   });
   49 |
   50 |   test('should clear and reset state', async ({ page }) => {
   51 |     await page.getByTestId('clear-log').click();
   52 |     await expect(page.getByTestId('event-log')).toContainText('No events yet');
   53 |
   54 |     await page.getByTestId('reset-button').click();
   55 |     await expect(page.getByTestId('draggable-item-1')).toBeVisible();
   56 |   });
   57 |
   58 |   test('should save state and log it', async ({ page }) => {
   59 |     await page.getByTestId('save-button').click();
   60 |     const log = page.getByTestId('event-log');
   61 |   });
   62 | });
   63 |
   64 |  test.skip('should not allow moving task to the same Kanban column', async ({ page }) => {
   65 |     await page.goto('/draggable');
   66 |     await page.getByTestId('kanban-tab').click();
   67 |     const task = page.getByTestId('kanban-task-1');
   68 |     const originalLog = await page.getByTestId('event-log').textContent();
   69 |   
   70 |     const sourceZone = page.getByTestId('drop-zone-done');
   71 |     await task.dragTo(sourceZone); // same column
   72 |   
   73 |     const newLog = await page.getByTestId('event-log').textContent();
   74 |     expect(newLog).toBe(originalLog); // no change in log
   75 |   });
   76 |   
   77 |   test('should save Kanban state after moving task', async ({ page }) => {
   78 |     await page.goto('/draggable');
   79 |     await page.getByTestId('kanban-tab').click();
   80 |   
   81 |     const task = page.getByTestId('kanban-task-2'); // "Design database schema"
   82 |     const toInProgress = page.getByTestId('drop-zone-in-progress');
   83 |   
   84 |     await task.dragTo(toInProgress);
   85 |   
   86 |     // Confirmă mutarea
   87 |     await expect(toInProgress).toContainText('Design database schema');
   88 |   
   89 |     // Salvează
   90 |     await page.getByTestId('save-button').click();
   91 |   
   92 |     // Confirmă salvarea în log
   93 |     const logs = await page.locator('[data-testid^="log-entry-"]').allTextContents();
   94 |   });
   95 |   
   96 |   test('should reset Kanban board to original state', async ({ page }) => {
   97 |     await page.goto('/draggable');
   98 |     await page.getByTestId('kanban-tab').click();
   99 |     const task = page.getByTestId('kanban-task-2'); // "Design database schema"
  100 |     const toDone = page.getByTestId('drop-zone-done');
  101 |   
  102 |     await task.dragTo(toDone); // mută în altă coloană
  103 |     await page.getByTestId('reset-button').click(); // apasă pe reset
  104 |   
  105 |     // Așteaptă ca taskul să reapară în To Do
  106 |     await expect.poll(async () => {
  107 |       const toDoText = await page.getByTestId('drop-zone-todo').textContent();
  108 |       return toDoText;
  109 |     }).toContain('Design database schema');
  110 |   });
  111 |   
```