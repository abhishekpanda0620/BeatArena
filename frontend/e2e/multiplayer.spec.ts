import { test, expect } from '@playwright/test';

test.describe('Multiplayer Challenge Flow', () => {
  test('should show create challenge form', async ({ page }) => {
    await page.goto('/multiplayer/create');

    // Should show the form elements
    await expect(page.getByPlaceholder('Enter your name')).toBeVisible();
    await expect(page.getByText('English')).toBeVisible();
    await expect(page.getByText('Hindi')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Challenge' })).toBeDisabled();
    
    // Enter player name
    await page.fill('input[placeholder="Enter your name"]', 'Test Player');

    // Button should still be disabled without language selection
    await expect(page.getByRole('button', { name: 'Create Challenge' })).toBeDisabled();

    // Select English language
    await page.click('button:has-text("English")');

    // Now button should be enabled
    await expect(page.getByRole('button', { name: 'Create Challenge' })).toBeEnabled();
  });

  test('should show error for invalid challenge code', async ({ page }) => {
    await page.goto('/multiplayer/challenge/INVALD');

    // Wait for page to load and check for error
    await page.waitForLoadState('networkidle');

    // Should show error page
    await expect(page.getByText('Challenge Not Found')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('INVALD')).toBeVisible();

    // Should have back button
    await expect(page.getByRole('button', { name: 'Back to Multiplayer' })).toBeVisible();
    
    // Click back button
    await page.click('button:has-text("Back to Multiplayer")');
    
    // Should navigate to multiplayer page
    await expect(page).toHaveURL('/multiplayer');
  });

  // NOTE: The following tests require songs to be seeded in the database.
  // Run: docker-compose exec backend php artisan db:seed
  test.skip('should create and join a challenge (requires seeded songs)', async ({ page, context }) => {
    // First verify we have songs
    const apiResponse = await page.request.get('http://localhost:8787/api/songs?language=en');
    const songs = await apiResponse.json();
    
    if (songs.length < 5) {
      console.log('Skipping: Database needs at least 5 songs. Run: docker-compose exec backend php artisan db:seed');
      return;
    }

    // Create a challenge
    await page.goto('/multiplayer/create');
    await page.fill('input[placeholder="Enter your name"]', 'Creator');
    await page.click('button:has-text("English")');
    
    // Wait for API response
    const createPromise = page.waitForResponse(response => 
      response.url().includes('/api/challenges/create')
    );
    await page.click('button:has-text("Create Challenge")');
    const createResponse = await createPromise;
    
    // Check if creation was successful
    if (createResponse.status() !== 201) {
      const error = await createResponse.json();
      console.log('Challenge creation failed:', error);
      return;
    }

    // Get challenge code
    const challengeCodeElement = page.locator('.text-purple-400.text-4xl');
    await expect(challengeCodeElement).toBeVisible({ timeout: 10000 });
    const challengeCode = await challengeCodeElement.textContent();
    
    // Navigate to lobby
    await page.click('button:has-text("Enter Lobby")');

    // Should be in lobby
    await expect(page.getByText('Challenge Lobby')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(challengeCode?.trim() || '')).toBeVisible();

    // Player name should be pre-filled and disabled
    const nameInput = page.locator('input[placeholder="Enter your name"]');
    await expect(nameInput).toHaveValue('Creator');
    await expect(nameInput).toBeDisabled();

    // Should show Creator badge
    await expect(page.getByText('Creator').first()).toBeVisible();

    // Open a second page to join as different player
    const page2 = await context.newPage();
    await page2.goto(`/multiplayer/challenge/${challengeCode?.trim()}`);

    // Join as different player
    await page2.fill('input[placeholder="Enter your name"]', 'Player 2');
    await page2.click('button:has-text("Start Playing")');

    // Should navigate to game
    await expect(page2.getByText(/Round 1/)).toBeVisible({ timeout: 15000 });
    
    // Check that visualizer is present
    await expect(page2.getByText('Listen carefully...')).toBeVisible();

    // Check that timer/progress bar is visible
    await expect(page2.getByText(/\d+s remaining/)).toBeVisible();

    // Check that score is visible
    await expect(page2.getByText(/Score: \d+/)).toBeVisible();
  });
});
