import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { render, screen, waitFor } from '@testing-library/react';

import App from 'App.jsx';
import LoginSignup from 'LoginSignup.jsx';
import SavedPage from 'SearchPage.jsx';
import UserPage from 'UserPage.jsx';

describe('Unit testing React components', () => {
  /*describe('App', () => {
    beforeEach(async () => {
      const app = await render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
  });

  describe('LoginSignup', () => {
    let text;
    const props = {
      onLogin,
      setUser,
    };

    beforeAll(() => {
      text = render(<LoginSignup {...props} />);
    });
  });

  describe('SavedPage', () => {
    let page;
    const props = {};

    beforeAll(() => {
      text = render(<SavedPage {...props} />);
    });
  });

  describe('UserPage', () => {
    let text;
    const props = {
      username,
    };

    beforeAll(() => {
      text = render(<UserPage {...props} />);
    });
  });*/
});
