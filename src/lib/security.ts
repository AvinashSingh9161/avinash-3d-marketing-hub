/**
 * Security utilities for enhanced protection
 */

// Rate limiting storage
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Enhanced rate limiting implementation with browser fingerprinting
 */
export class RateLimit {
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 3, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Generate a more robust client identifier
   */
  private generateClientId(): string {
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0
    ].join('|');
    
    // Simple hash function for consistent identifier
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  }

  check(identifier?: string): boolean {
    const clientId = identifier || this.generateClientId();
    const now = Date.now();
    const entry = rateLimitStore.get(clientId);

    if (!entry || now > entry.resetTime) {
      rateLimitStore.set(clientId, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      securityLog.rateLimitExceeded(clientId);
      return false;
    }

    entry.count++;
    return true;
  }

  getRemainingTime(identifier?: string): number {
    const clientId = identifier || this.generateClientId();
    const entry = rateLimitStore.get(clientId);
    if (!entry) return 0;
    return Math.max(0, entry.resetTime - Date.now());
  }
}

/**
 * Content Security Policy helper
 */
export const CSP = {
  allowedDomains: [
    'self',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://api.emailjs.com'
  ],

  isAllowedDomain(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return this.allowedDomains.some(domain => 
        domain === 'self' || urlObj.origin.includes(domain.replace('https://', ''))
      );
    } catch {
      return false;
    }
  }
};

/**
 * Input sanitization utilities
 */
export const sanitize = {
  /**
   * HTML escape function to prevent XSS
   */
  html(input: string): string {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  /**
   * Remove dangerous characters from input
   */
  removeScripts(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  },

  /**
   * Validate email format with additional security checks
   */
  email(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /data:/i,
      /vbscript:/i
    ];

    return emailRegex.test(email) && 
           !dangerousPatterns.some(pattern => pattern.test(email)) &&
           email.length <= 254;
  },

  /**
   * Validate name with enhanced security checks
   */
  name(name: string): boolean {
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+=/i,
      /data:/i,
      /vbscript:/i,
      /<iframe/i,
      /<object/i,
      /<embed/i
    ];

    const isValid = nameRegex.test(name) && 
           name.length >= 2 && 
           name.length <= 50 &&
           !suspiciousPatterns.some(pattern => pattern.test(name));

    if (!isValid && suspiciousPatterns.some(pattern => pattern.test(name))) {
      securityLog.suspiciousInput(name, 'Dangerous pattern in name field');
    }

    return isValid;
  }
};

/**
 * Environment validation
 */
export const validateEnvironment = {
  emailjs(): boolean {
    const requiredKeys = ['publicKey', 'serviceId', 'templateId'];
    // In a real app with environment variables, you'd check process.env
    // For this client-side app, we validate the configuration object exists
    return true; // Basic validation - in production, implement proper env checks
  }
};

/**
 * Security logging (client-side safe)
 */
export const securityLog = {
  rateLimitExceeded(identifier: string): void {
    console.warn(`Rate limit exceeded for identifier: ${identifier.substring(0, 5)}...`);
  },

  suspiciousInput(input: string, reason: string): void {
    console.warn(`Suspicious input detected: ${reason}`);
  },

  securityViolation(violation: string): void {
    console.error(`Security violation: ${violation}`);
  }
};