const { loginUser } = require('../services/userService');
const User = require('../models/userModel');
const { matchPassword } = require('../config/password');

jest.mock('../models/userModel', () => ({
  findOne: jest.fn(),
}));

jest.mock('../config/password', () => ({
  matchPassword: jest.fn(),
}));

describe('loginUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login a user if email and password are valid', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password';
    const mockUser = {
      _id: 'user-id',
      name: 'John Doe',
      email: mockEmail,
      password: 'hashedPassword',
    };

    User.findOne.mockResolvedValue(mockUser);
    matchPassword.mockResolvedValue(true);

    const result = await loginUser(mockEmail, mockPassword);

    expect(User.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(matchPassword).toHaveBeenCalledWith(mockPassword, mockUser.password);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if email or password is missing', async () => {
    const mockEmail = '';
    const mockPassword = 'password';

    await expect(loginUser(mockEmail, mockPassword)).rejects.toThrow('All fields are required');

    expect(User.findOne).not.toHaveBeenCalled();
    expect(matchPassword).not.toHaveBeenCalled();
  });

  it('should throw an error if email or password is invalid', async () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password';
    const mockUser = {
      _id: 'user-id',
      name: 'John Doe',
      email: mockEmail,
      password: 'hashedPassword',
    };

    User.findOne.mockResolvedValue(mockUser);
    matchPassword.mockResolvedValue(false);

    await expect(loginUser(mockEmail, mockPassword)).rejects.toThrow('Invalid email or password');

    expect(User.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(matchPassword).toHaveBeenCalledWith(mockPassword, mockUser.password);
  });
});
