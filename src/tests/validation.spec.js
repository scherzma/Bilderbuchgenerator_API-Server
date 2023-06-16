/* eslint-disable no-restricted-syntax */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { validateUsername, validateEmail, validatePassword } from '../shared/utils/index.js';

const usernameInputs = [
  {
    username: 'asdasd',
    expect: true,
  },
  {
    username: 'up1n5p4c3 rm',
    expect: false,
  },
  {
    username: 'up1n5p4c3',
    expect: true,
  },
  {
    username: 'up1n5p4c3 huhn',
    expect: false,
  },
];

const emailInputs = [
  {
    email: 'email@gmail.de',
    expect: true,
  },
  {
    email: 'up1n5p4c3 rm',
    expect: false,
  },
  {
    email: 'q@',
    expect: false,
  },
  {
    email: 'a@a',
    expect: false,
  },
  {
    email: 'a@a.a.a',
    expect: true,
  },
];

const passwordInputs = [
  {
    password: 'asdfg',
    expect: false,
  },
  {
    password: 'asdfghjk',
    expect: false,
  },
  {
    password: 'Asdfghjk',
    expect: false,
  },
  {
    password: '1Acdfrtss',
    expect: false,
  },
  {
    password: '1Acdfrts!',
    expect: true,
  },
  {
    password: '1Acdfrt!!',
    expect: true,
  },
];

describe('test username input validation', () => {
  for (const user of usernameInputs) {
    it(`test username validation username: ${user.username}`, () => {
      expect(validateUsername(user.username)).to.equal(user.expect);
    });
  }
});

describe('test email input validation', () => {
  for (const email of emailInputs) {
    it(`test email validation email: ${email.email}`, () => {
      expect(validateEmail(email.email)).to.equal(email.expect);
    });
  }
});

describe('test password input validation', () => {
  for (const password of passwordInputs) {
    it(`test password validation password: ${password.password}`, () => {
      expect(validatePassword(password.password)).to.equal(password.expect);
    });
  }
});
