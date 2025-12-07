import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { DatabaseService } from './database.js';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthResult {
  success: boolean;
  user?: Omit<User, 'password'>;
  token?: string;
  message?: string;
}

export interface UpdateUserProfile {
  userId: number;
  name?: string;
  email?: string;
  password?: string;
}

export class AuthService {
  private jwtSecret: string;

  constructor(private dbService: DatabaseService) {
    this.jwtSecret = process.env.JWT_SECRET || 'default-secret-key-please-change-in-production';
    
    if (!process.env.JWT_SECRET) {
      console.warn('Warning: JWT_SECRET not set in environment variables. Using default secret.');
    }
  }

  async registerUser(name: string, email: string, password: string, role: string = 'user'): Promise<AuthResult> {
    try {
      // Check if user already exists
      const existingUser = await this.dbService.findUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists'
        };
      }

      // Hash password
      const hashedPassword = await this.hashPassword(password);

      // Create user
      const userId = await this.dbService.createUser({
        name,
        email,
        password: hashedPassword,
        role
      });

      // Get created user (without password)
      const user = await this.dbService.findUserById(userId);
      if (!user) {
        throw new Error('Failed to create user');
      }

      // Generate token
      const token = await this.generateJWT(userId);

      return {
        success: true,
        user: this.sanitizeUser(user),
        token,
        message: 'User registered successfully'
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  async authenticateUser(email: string, password: string): Promise<AuthResult> {
    try {
      // Find user by email
      const user = await this.dbService.findUserByEmail(email);
      if (!user) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      // Generate token
      const token = await this.generateJWT(user.id);

      return {
        success: true,
        user: this.sanitizeUser(user),
        token,
        message: 'Authentication successful'
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  }

  async updateUserProfile(data: UpdateUserProfile): Promise<AuthResult> {
    try {
      const updates: Partial<User> = {};

      if (data.name) updates.name = data.name;
      if (data.email) updates.email = data.email;
      if (data.password) updates.password = await this.hashPassword(data.password);

      await this.dbService.updateUser(data.userId, updates);
      
      const updatedUser = await this.dbService.findUserById(data.userId);
      if (!updatedUser) {
        throw new Error('User not found');
      }

      return {
        success: true,
        user: this.sanitizeUser(updatedUser),
        message: 'Profile updated successfully'
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Profile update failed'
      };
    }
  }

  async getUserProfile(userId: number): Promise<AuthResult> {
    try {
      const user = await this.dbService.findUserById(userId);
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      return {
        success: true,
        user: this.sanitizeUser(user),
        message: 'Profile retrieved successfully'
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to retrieve profile'
      };
    }
  }

  async assignUserRole(userId: number, role: string): Promise<AuthResult> {
    try {
      await this.dbService.updateUser(userId, { role });
      
      const user = await this.dbService.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      return {
        success: true,
        user: this.sanitizeUser(user),
        message: `Role '${role}' assigned successfully`
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Role assignment failed'
      };
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcryptjs.hash(password, saltRounds);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(password, hash);
  }

  async generateJWT(userId: number, expiresIn: string = '24h'): Promise<string> {
    const payload = { userId, iat: Math.floor(Date.now() / 1000) };
    return jsonwebtoken.sign(payload, this.jwtSecret, { expiresIn } as any);
  }

  async validateJWT(token: string): Promise<{ valid: boolean; payload?: any; message?: string }> {
    try {
      const payload = jsonwebtoken.verify(token, this.jwtSecret);
      return {
        valid: true,
        payload,
        message: 'Token is valid'
      };
    } catch (error) {
      return {
        valid: false,
        message: error instanceof Error ? error.message : 'Invalid token'
      };
    }
  }

  private sanitizeUser(user: User): Omit<User, 'password'> {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}