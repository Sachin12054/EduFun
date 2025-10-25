/**
 * Validation utilities for forms
 */

export const ValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    required: true,
    minLength: 8,
    pattern: {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /\d/,
      special: /[!@#$%^&*(),.?":{}|<>]/
    },
    message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
  },
  name: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Please enter a valid name (letters only, minimum 2 characters)'
  }
};

export const validateEmail = (email) => {
  const rule = ValidationRules.email;
  
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  
  if (!rule.pattern.test(email.trim())) {
    return rule.message;
  }
  
  return '';
};

export const validatePassword = (password, isSignUp = false) => {
  const rule = ValidationRules.password;
  
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < rule.minLength) {
    return `Password must be at least ${rule.minLength} characters long`;
  }
  
  if (isSignUp) {
    const checks = {
      hasUppercase: rule.pattern.uppercase.test(password),
      hasLowercase: rule.pattern.lowercase.test(password),
      hasNumber: rule.pattern.number.test(password),
      hasSpecial: rule.pattern.special.test(password)
    };
    
    const failedChecks = [];
    if (!checks.hasUppercase) failedChecks.push('uppercase letter');
    if (!checks.hasLowercase) failedChecks.push('lowercase letter');
    if (!checks.hasNumber) failedChecks.push('number');
    if (!checks.hasSpecial) failedChecks.push('special character');
    
    if (failedChecks.length > 0) {
      return `Password must include: ${failedChecks.join(', ')}`;
    }
  }
  
  return '';
};

export const validateName = (name) => {
  const rule = ValidationRules.name;
  
  if (!name || !name.trim()) {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (name.trim().length < rule.minLength) {
    return { isValid: false, message: `Name must be at least ${rule.minLength} characters long` };
  }
  
  if (!rule.pattern.test(name.trim())) {
    return { isValid: false, message: rule.message };
  }
  
  return { isValid: true, message: '' };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true, message: '' };
};

export const validateForm = (formData, isLogin = true) => {
  const errors = {};
  
  try {
    // Email validation
    const emailError = validateEmail(formData.email || '');
    if (emailError) {
      errors.email = emailError;
    }
    
    // Password validation
    const passwordError = validatePassword(formData.password || '', !isLogin);
    if (passwordError) {
      errors.password = passwordError;
    }
    
    if (!isLogin) {
      // Name validation for sign up
      if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      
      // Employee ID validation for sign up (only for teacher)
      if (formData.hasOwnProperty('employeeId')) {
        if (!formData.employeeId || formData.employeeId.trim().length === 0) {
          errors.employeeId = 'Employee ID is required';
        }
      }
      
      // Department validation for sign up (only for teacher)
      if (formData.hasOwnProperty('department')) {
        if (!formData.department || formData.department.trim().length === 0) {
          errors.department = 'Department is required';
        }
      }
      
      // Confirm password validation for sign up
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
  } catch (error) {
    console.error('Validation error:', error);
    errors.general = 'Validation failed. Please check your inputs.';
  }
  
  return errors;
};

export default {
  ValidationRules,
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validateForm
};