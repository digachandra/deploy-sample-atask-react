import { test, expect } from '@playwright/test';

test.describe('GitHub username input behavior', () => {
  test('should disable submit on invalid input', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder('Type github username');
    const submitButton = page.getByRole('button', { name: 'Search' });

    await expect(page.getByText(/Username is required/)).toBeHidden();
    await expect(submitButton).toBeDisabled();

    await searchInput.fill('vercel');
    await searchInput.fill('');
    await expect(searchInput).toHaveValue('');
    await expect(page.getByText(/Username is required/)).toBeVisible({ timeout: 5000 });
    await expect(submitButton).toBeDisabled();
  });

  test('should enable submit on valid input', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder('Type github username');
    const submitButton = page.getByRole('button', { name: 'Search' });

    await searchInput.fill('vercel');
    await expect(searchInput).toHaveValue('vercel');
    await expect(page.getByText(/Username is required/)).toBeHidden();
    await expect(submitButton).toBeEnabled({ timeout: 5000 });
  });
});

