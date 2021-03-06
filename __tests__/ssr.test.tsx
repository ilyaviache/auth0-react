/**
 * @jest-environment node
 */
import { renderHook } from '@testing-library/react-hooks';
import { createWrapper } from './helpers';
import { useAuth0 } from '../src';

jest.unmock('@ilyaviache/auth0-spa-js');

describe('In a Node SSR environment', () => {
  it('auth state is initialised', async () => {
    const wrapper = createWrapper();
    const {
      result: {
        current: { isLoading, isAuthenticated, user, loginWithRedirect },
      },
    } = renderHook(useAuth0, { wrapper });
    expect(isLoading).toBeFalsy();
    expect(isAuthenticated).toBeFalsy();
    expect(user).toBeUndefined();
    await expect(loginWithRedirect).rejects.toThrowError(
      'window is not defined'
    );
  });
});
