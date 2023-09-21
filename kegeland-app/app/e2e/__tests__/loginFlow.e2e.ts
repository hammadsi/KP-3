/* istanbul ignore file */
import detox from 'detox';

import {signInCredentials} from '~state/ducks/__mocks__/auth.mocks';

describe('Test Sign in flow', () => {
  const HOME_SCREEN_ID = 'DevicesScreen';
  const LOGIN_SCREEN_ID = 'LoginScreen';
  const NAV_TO_LOGIN_BTN_ID = 'AuthStack';
  const EMAIL_INPUT_ID = 'LoginEmailInput';
  const PASSWORD_INPUT_ID = 'LoginPasswordInput';
  const SUBMIT_BTN_ID = 'LoginSubmit';
  beforeAll(async () => {
    await detox.device.launchApp();
  });

  beforeEach(async () => {
    await detox.device.reloadReactNative();
  });

  it('should sign in the user and return to home screen', async () => {
    const authNav = element(by.id(NAV_TO_LOGIN_BTN_ID));
    await authNav.tap();
    await detox.expect(element(by.id(LOGIN_SCREEN_ID))).toBeVisible();

    // Declare ui-elements
    const emailInput = element(by.id(EMAIL_INPUT_ID));
    const pwdInput = element(by.id(PASSWORD_INPUT_ID));
    const submitBtn = element(by.id(SUBMIT_BTN_ID));

    // Submit sign-in form
    await detox.expect(emailInput).toBeVisible();
    await emailInput.typeText(signInCredentials.email);
    await emailInput.tapReturnKey();
    await detox.expect(pwdInput).toBeVisible();
    await pwdInput.typeText(signInCredentials.password);
    await pwdInput.tapReturnKey();
    await detox.expect(submitBtn).toBeVisible();
    await submitBtn.tap();

    // Return home
    const home = element(by.id(HOME_SCREEN_ID));
    await detox.waitFor(home).toBeVisible().withTimeout(5000);
    await detox.expect(home).toBeVisible();
  });
});
