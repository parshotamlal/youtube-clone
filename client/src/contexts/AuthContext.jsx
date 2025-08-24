import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/dummyData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored JWT token on app load
    const token = localStorage.getItem('youtube-token');
    const userData = localStorage.getItem('youtube-user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('youtube-token');
        localStorage.removeItem('youtube-user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in dummy data
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('User not found');
    }
    
    // In a real app, you'd verify the password hash
    if (foundUser.password !== password) {
      setIsLoading(false);
      throw new Error('Invalid password');
    }
    
    // Generate dummy JWT token
    const token = `jwt-token-${foundUser.userId}-${Date.now()}`;
    
    // Store token and user data
    localStorage.setItem('youtube-token', token);
    localStorage.setItem('youtube-user', JSON.stringify(foundUser));
    
    setUser(foundUser);
    setIsLoading(false);
    
    return { user: foundUser, token };
  };

  const register = async (username, email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email || u.username === username);
    
    if (existingUser) {
      setIsLoading(false);
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      userId: `user${Date.now()}`,
      username,
      email,
      password, // In a real app, this would be hashed
      avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000) + 1000000}/pexels-photo-${Math.floor(Math.random() * 1000000) + 1000000}.jpeg?auto=compress&cs=tinysrgb&w=150`,
      channels: [],
      subscribedChannels: [],
      likedVideos: []
    };
    
    // Add to users array (in a real app, this would be saved to database)
    users.push(newUser);
    
    // Generate dummy JWT token
    const token = `jwt-token-${newUser.userId}-${Date.now()}`;
    
    // Store token and user data
    localStorage.setItem('youtube-token', token);
    localStorage.setItem('youtube-user', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsLoading(false);
    
    return { user: newUser, token };
  };

  const logout = () => {
    localStorage.removeItem('youtube-token');
    localStorage.removeItem('youtube-user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};