import mysql from 'mysql2/promise';
import { User } from './auth.js';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export class DatabaseService {
  private connection: mysql.Connection | null = null;

  constructor() {
    // Don't initialize connection in constructor
    // Will be initialized when first needed
  }

  private async initializeConnection() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'laravel_app',
      });

      console.error('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  private async ensureConnection(): Promise<mysql.Connection> {
    if (!this.connection) {
      await this.initializeConnection();
    }
    return this.connection!;
  }

  async createUser(userData: CreateUserData): Promise<number> {
    const connection = await this.ensureConnection();
    
    const query = `
      INSERT INTO users (name, email, password, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await connection.execute(query, [
      userData.name,
      userData.email,
      userData.password,
      userData.role
    ]);

    return (result as mysql.ResultSetHeader).insertId;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const connection = await this.ensureConnection();
    
    const query = `
      SELECT id, name, email, password, role, created_at, updated_at
      FROM users 
      WHERE email = ?
    `;

    const [rows] = await connection.execute(query, [email]);
    const users = rows as User[];
    
    return users.length > 0 ? users[0] : null;
  }

  async findUserById(id: number): Promise<User | null> {
    const connection = await this.ensureConnection();
    
    const query = `
      SELECT id, name, email, password, role, created_at, updated_at
      FROM users 
      WHERE id = ?
    `;

    const [rows] = await connection.execute(query, [id]);
    const users = rows as User[];
    
    return users.length > 0 ? users[0] : null;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<void> {
    const connection = await this.ensureConnection();
    
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }

    fields.push('updated_at = NOW()');
    values.push(id);

    const query = `
      UPDATE users 
      SET ${fields.join(', ')} 
      WHERE id = ?
    `;

    await connection.execute(query, values);
  }

  async deleteUser(id: number): Promise<void> {
    const connection = await this.ensureConnection();
    
    const query = 'DELETE FROM users WHERE id = ?';
    await connection.execute(query, [id]);
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const connection = await this.ensureConnection();
    
    const query = `
      SELECT id, name, email, password, role, created_at, updated_at
      FROM users 
      WHERE role = ?
    `;

    const [rows] = await connection.execute(query, [role]);
    return rows as User[];
  }

  async getAllUsers(limit: number = 100, offset: number = 0): Promise<User[]> {
    const connection = await this.ensureConnection();
    
    const query = `
      SELECT id, name, email, password, role, created_at, updated_at
      FROM users 
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await connection.execute(query, [limit, offset]);
    return rows as User[];
  }

  async createUsersTable(): Promise<void> {
    const connection = await this.ensureConnection();
    
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(query);
    console.error('Users table created/verified successfully');
  }

  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}