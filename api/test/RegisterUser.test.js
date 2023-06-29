const { registerUser } = require('../services/userService');
const User = require('../models/userModel');
const { passwordCrypt } = require('../config/password');

jest.mock('../models/userModel', () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}));

jest.mock('../config/password', () => ({
  passwordCrypt: jest.fn(),
}));

describe('registerUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if any field is missing', async () => {
    await expect(registerUser('', 'test@example.com', 'password', 'password')).rejects.toThrow(
      'All fields are required'
    );

    await expect(registerUser('John Doe', '', 'password', 'password')).rejects.toThrow(
      'All fields are required'
    );

    await expect(registerUser('John Doe', 'test@example.com', '', 'password')).rejects.toThrow(
      'All fields are required'
    );

    await expect(registerUser('John Doe', 'test@example.com', 'password', '')).rejects.toThrow(
      'All fields are required'
    );
  });

  it('should throw an error if password does not match', async () => {
    await expect(
      registerUser('John Doe', 'test@example.com', 'password1', 'password2')
    ).rejects.toThrow('Password does not match');
  });

  it('should throw an error if user already exists', async () => {
    User.findOne.mockResolvedValue(true);

    await expect(
      registerUser('John Doe', 'test@example.com', 'password', 'password')
    ).rejects.toThrow('User already exists');

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  });
});
