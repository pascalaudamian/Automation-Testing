import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs'; // Use node:fs for file system operations

// Define the path to the dummy file relative to the project root
const DUMMY_FILE_NAME = 'dummy-upload-test.txt';
const DUMMY_FILE_PATH = path.join(__dirname, '..', DUMMY_FILE_NAME);
const DUMMY_FILE_CONTENT = 'This is a dummy file for testing uploads only.'; // Changed content slightly

// Ensure the dummy file exists before running tests
test.beforeAll(() => {
  // Corrected typo here: changed Dummy_FILE_PATH to DUMMY_FILE_PATH
  if (!fs.existsSync(DUMMY_FILE_PATH)) {
    fs.writeFileSync(DUMMY_FILE_PATH, DUMMY_FILE_CONTENT);
    console.log(`Created dummy file for upload test: ${DUMMY_FILE_PATH}`);
  }
});

// Optional: Clean up the dummy file after tests
test.afterAll(() => {
   if (fs.existsSync(DUMMY_FILE_PATH)) {
     // fs.unlinkSync(DUMMY_FILE_PATH); // Uncomment if you want to delete the local dummy file after tests
     // console.log(`Deleted dummy file: ${DUMMY_FILE_PATH}`);
   }
});

test.describe('File Upload Only', () => { // Updated test description

  // Navigate to the upload page before each test
  test.beforeEach(async ({ page }) => {
    // *** IMPORTANT: Replace '/your-upload-page-path' with the actual URL path to your upload page ***
    await page.goto('/file-uploads');
    await expect(page.getByText('Upload Files')).toBeVisible();
  });

  test('should upload a dummy file and verify its status', async ({ page }) => { // Updated test name

    // --- Step 1: Upload the file ---
    console.log('Starting file upload test...');

    // Use the hidden file input directly
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(DUMMY_FILE_PATH);

    // Find the list item for the uploaded file by name
    const uploadListItem = page.locator('li', { has: page.getByText(DUMMY_FILE_NAME) }).first();
    await expect(uploadListItem).toBeVisible();
    await expect(uploadListItem.getByText('pending')).toBeVisible();

    // Find and click the Upload button within the list item
    const uploadButton = uploadListItem.getByRole('button', { name: 'Upload' });
    await uploadButton.click();

    console.log(`File "${DUMMY_FILE_NAME}" uploaded and status verified.`);
  });
});
