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

test.describe('Github username searching', () => {
  test('has no public repository information', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder('Type github username');
    const submitButton = page.getByRole('button', { name: 'Search' });

    await searchInput.fill('exampleuser');
    await submitButton.click();

    await expect(submitButton).toHaveText('Searching...');
    await expect(page.getByText(/Searching users for "@exampleuser"/)).toBeVisible({
      timeout: 2500,
    });
    await expect(page.getByText(/Showing users for "@exampleuser"/)).toBeVisible({ timeout: 5000 });

    const exampleUser = page.getByTestId(`user-exampleuser`);
    await expect(exampleUser.getByText('User has no public repository')).toBeVisible();
    await expect(exampleUser.getByTestId('user-exampleuser-repos')).toBeHidden();
  });

  test('has public repositories', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder('Type github username');
    const submitButton = page.getByRole('button', { name: 'Search' });

    await searchInput.fill('atask');
    await submitButton.click();

    await expect(submitButton).toHaveText('Searching...');
    await expect(page.getByText(/Searching users for "@atask"/)).toBeVisible({
      timeout: 2500,
    });
    await expect(page.getByText(/Showing users for "@atask"/)).toBeVisible({ timeout: 5000 });

    const ataskUser = page.getByTestId(`user-atask`);
    await expect(ataskUser.getByText('Click to see public repositories')).toBeVisible();
    await expect(ataskUser.getByTestId('user-atask-repos')).toBeHidden();
    await expect(ataskUser.getByTestId('user-repo-title')).toBeHidden();
    await expect(ataskUser.getByTestId('user-repo-description')).toBeHidden();
    await expect(ataskUser.getByTestId('user-repo-star')).toBeHidden();

    await ataskUser.click();
    test.setTimeout(3000);
    await expect(ataskUser.getByTestId('user-atask-repos')).toBeVisible();
    await expect(ataskUser.getByTestId('user-repo-title').first()).toBeVisible();
    await expect(ataskUser.getByTestId('user-repo-description').first()).toBeVisible();
    await expect(ataskUser.getByTestId('user-repo-star').first()).toBeVisible();
  });

  test('no result', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder('Type github username');
    const submitButton = page.getByRole('button', { name: 'Search' });

    await searchInput.fill('notfound404xyz');
    await submitButton.click();

    await expect(submitButton).toHaveText('Searching...');
    await expect(page.getByText(/Searching users for "@notfound404xyz"/)).toBeVisible({
      timeout: 2500,
    });
    await expect(page.getByText(/No result for "@notfound404xyz"/)).toBeVisible({ timeout: 5000 });
  });

  test('Github error API response', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder('Type github username');
    const submitButton = page.getByRole('button', { name: 'Search' });

    await searchInput.fill('test');
    await submitButton.click();

    await expect(submitButton).toHaveText('Searching...');
    await expect(page.getByText(/Searching users for "@test"/)).toBeVisible({
      timeout: 2500,
    });
    await expect(
      page.getByText(/Unable to fetch GitHub data for "@test"\. Please try again later\./)
    ).toBeVisible({ timeout: 5000 });
  });
});
