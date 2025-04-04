# Authentication Implementation Guide

## Overview
cxentral uses a secure authentication system based on JWT tokens with OAuth 2.0 support. This guide covers implementation details for both client-side and server-side authentication.

## Client-Side Implementation

### React Authentication Hook
```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import { cxentralAuth } from '@cxentral/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  useEffect(() => {
    // Check for existing session
    const session = cxentralAuth.getSession();
    if (session) {
      setAuthState({
        isAuthenticated: true,
        user: session.user,
        token: session.token
      });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await cxentralAuth.login(credentials);
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        token: response.token
      });
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    await cxentralAuth.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Login Component Implementation
```typescript
import { useState } from 'react';
import { useAuth } from './useAuth';

export function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      // Redirect to dashboard
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({
          ...prev,
          email: e.target.value
        }))}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({
          ...prev,
          password: e.target.value
        }))}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
        Login
      </button>
    </form>
  );
}
```

## Server-Side Implementation

### Authentication Middleware
```typescript
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Token Management
```typescript
import { sign } from 'jsonwebtoken';

class TokenManager {
  private readonly JWT_SECRET: string;
  private readonly TOKEN_EXPIRY: string = '1h';

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET!;
  }

  generateToken(user: User): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      this.JWT_SECRET,
      { expiresIn: this.TOKEN_EXPIRY }
    );
  }

  verifyToken(token: string): DecodedToken {
    return verify(token, this.JWT_SECRET) as DecodedToken;
  }
}
```

## Security Best Practices

### Password Hashing
```typescript
import { hash, compare } from 'bcrypt';

class PasswordManager {
  private readonly SALT_ROUNDS = 12;

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.SALT_ROUNDS);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
```

### Session Management
```typescript
import { Redis } from 'ioredis';

class SessionManager {
  private readonly redis: Redis;
  private readonly SESSION_EXPIRY = 3600; // 1 hour

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async createSession(userId: string, token: string): Promise<void> {
    await this.redis.set(
      `session:${userId}`,
      token,
      'EX',
      this.SESSION_EXPIRY
    );
  }

  async validateSession(userId: string, token: string): Promise<boolean> {
    const storedToken = await this.redis.get(`session:${userId}`);
    return storedToken === token;
  }

  async invalidateSession(userId: string): Promise<void> {
    await this.redis.del(`session:${userId}`);
  }