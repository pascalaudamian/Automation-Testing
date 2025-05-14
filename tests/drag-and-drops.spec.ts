import { test, expect } from '@playwright/test';
import { skip } from 'node:test';

test.describe('DraggablePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/draggable'); // ajustează ruta dacă e diferită
  });

  test('should render page with tabs and default simple tab', async ({ page }) => {
    await expect(page.getByTestId('page-title')).toHaveText('Drag & Drop');
    await expect(page.getByTestId('simple-tab')).toBeVisible();
    await expect(page.getByTestId('sortable-tab')).toBeVisible();
    await expect(page.getByTestId('kanban-tab')).toBeVisible();
    await expect(page.getByTestId('simple-tab')).toHaveAttribute('data-state', 'active');
  });

  test('should drag and drop an item in Simple Dragging tab', async ({ page }) => {
    const sourceItem = page.getByTestId('draggable-item-1'); //  use `draggable-item-1` 
    const dropZone = page.getByTestId('drop-zone');

    await sourceItem.dragTo(dropZone);

    // Verify event log updated
    const log = page.getByTestId('event-log');
    await expect(log).toContainText('Dropped item-1');
  });

  test('should reorder items in Sortable List tab', async ({ page }) => {
    await page.getByTestId('sortable-tab').click();
    const firstItem = page.getByTestId('sortable-0');
    const secondItem = page.getByTestId('sortable-1');

    await firstItem.dragTo(secondItem);

    const log = page.getByTestId('event-log');
    await expect(log).toContainText('Moved Apple from position 0 to 1');
  });

  test('should move task across Kanban columns', async ({ page }) => {
    await page.getByTestId('kanban-tab').click();
    const task = page.getByTestId('kanban-task-1');
    const targetZone = page.getByTestId('drop-zone-in-progress');

    await task.dragTo(targetZone);

    const log = page.getByTestId('event-log');
    await expect(log).toContainText('Moved Research project requirements from To Do to In Progress');
  });

  test('should clear and reset state', async ({ page }) => {
    await page.getByTestId('clear-log').click();
    await expect(page.getByTestId('event-log')).toContainText('No events yet');

    await page.getByTestId('reset-button').click();
    await expect(page.getByTestId('draggable-item-1')).toBeVisible();
  });

  test('should save state and log it', async ({ page }) => {
    await page.getByTestId('save-button').click();
    const log = page.getByTestId('event-log');
  });
});

 test.skip('should not allow moving task to the same Kanban column', async ({ page }) => {
    await page.goto('/draggable');
    await page.getByTestId('kanban-tab').click();
    const task = page.getByTestId('kanban-task-1');
    const originalLog = await page.getByTestId('event-log').textContent();
  
    const sourceZone = page.getByTestId('drop-zone-done');
    await task.dragTo(sourceZone); // same column
  
    const newLog = await page.getByTestId('event-log').textContent();
    expect(newLog).toBe(originalLog); // no change in log
  });
  
  test('should save Kanban state after moving task', async ({ page }) => {
    await page.goto('/draggable');
    await page.getByTestId('kanban-tab').click();
  
    const task = page.getByTestId('kanban-task-2'); // "Design database schema"
    const toInProgress = page.getByTestId('drop-zone-in-progress');
  
    await task.dragTo(toInProgress);
  
    // Confirmă mutarea
    await expect(toInProgress).toContainText('Design database schema');
  
    // Salvează
    await page.getByTestId('save-button').click();
  
    // Confirmă salvarea în log
    const logs = await page.locator('[data-testid^="log-entry-"]').allTextContents();
  });
  
  test('should reset Kanban board to original state', async ({ page }) => {
    await page.goto('/draggable');
    await page.getByTestId('kanban-tab').click();
    const task = page.getByTestId('kanban-task-2'); // "Design database schema"
    const toDone = page.getByTestId('drop-zone-done');
  
    await task.dragTo(toDone); // mută în altă coloană
    await page.getByTestId('reset-button').click(); // apasă pe reset
  
    // Așteaptă ca taskul să reapară în To Do
    await expect.poll(async () => {
      const toDoText = await page.getByTestId('drop-zone-todo').textContent();
      return toDoText;
    }).toContain('Design database schema');
  });
  