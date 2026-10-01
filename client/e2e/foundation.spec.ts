import { expect, test } from '@playwright/test';

for (const width of [360, 768, 1280]) {
  test(`foundation fits ${width}px and renders Vietnamese font`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/design-system');
    await expect(
      page.getByRole('heading', { name: 'Hệ thống thiết kế', exact: true }),
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(() => getComputedStyle(document.body).fontFamily),
    ).toContain('Plus Jakarta Sans');
    const fontLoaded = await page.evaluate(() =>
      [...document.fonts].some(
        (font) => font.status === 'loaded' && font.family.includes('Jakarta'),
      ),
    );
    expect(fontLoaded).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`foundation-${width}.png`),
    });
    await page.locator('#typography').scrollIntoViewIfNeeded();
    await page.screenshot({
      path: testInfo.outputPath(`typography-${width}.png`),
    });
    await page.locator('#fields').scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`fields-${width}.png`) });
    expect(errors).toEqual([]);
  });
}

test('keyboard focus, dialog escape and focus restoration', async ({
  page,
}) => {
  await page.goto('/design-system');
  await expect(
    page.getByRole('heading', { name: 'Hệ thống thiết kế', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Đến nội dung chính' }),
  ).toBeFocused();
  const trigger = page.getByRole('button', {
    name: 'Mở hộp thoại',
    exact: true,
  });
  await trigger.focus();
  expect(
    await trigger.evaluate((node) => getComputedStyle(node).outlineColor),
  ).toBe('rgb(0, 240, 255)');
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Hộp thoại mẫu' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Tab');
  expect(
    await dialog.evaluate((node) => node.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('primitive input interaction and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/design-system');
  const input = page.getByLabel('Mật khẩu', { exact: true });
  await input.fill('kiểm-tra');
  await page.getByRole('button', { name: 'Hiện mật khẩu' }).click();
  await expect(input).toHaveAttribute('type', 'text');
  await page.getByRole('combobox', { name: 'Chọn mật độ' }).click();
  await page.getByRole('option', { name: 'Thoáng', exact: true }).click();
  await expect(
    page.getByRole('combobox', { name: 'Chọn mật độ' }),
  ).toContainText('Thoáng');
  await page.getByRole('tab', { name: 'Thành phần', exact: true }).click();
  await expect(page.getByRole('tabpanel')).toContainText(
    'Các primitive tương tác độc lập.',
  );
  expect(
    await page
      .locator('.skeleton')
      .first()
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe('none');
  await page.getByRole('button', { name: 'Kiểm tra dữ liệu rỗng' }).click();
  await expect(page.locator('#mock pre')).toContainText('"items": []');
  await expect(page.locator('#mock pre')).toContainText('"total": 0');
});

test('design-system is unavailable in production', async ({ request }) => {
  const response = await request.get('http://localhost:3001/design-system');
  expect(response.status()).toBe(404);
  expect(await response.text()).not.toContain('Token có chủ đích');
});
