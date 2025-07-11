/**
 * Application configuration with secure credential management
 */

export interface EmailJSConfig {
  publicKey: string;
  serviceId: string;
  templateId: string;
}

/**
 * Get EmailJS configuration from environment or secure storage
 * In production, these should come from environment variables
 */
export const getEmailJSConfig = (): EmailJSConfig => {
  // For client-side apps, credentials can be stored in localStorage
  // or fetched from a secure configuration endpoint
  const stored = localStorage.getItem('emailjs-config');
  
  if (stored) {
    try {
      const config = JSON.parse(stored);
      if (config.publicKey && config.serviceId && config.templateId) {
        return config;
      }
    } catch (error) {
      console.warn('Invalid stored EmailJS configuration');
    }
  }

  // Fallback configuration - in production, remove these and use env vars
  return {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID'
  };
};

/**
 * Validate EmailJS configuration
 */
export const validateEmailJSConfig = (config: EmailJSConfig): boolean => {
  return !!(
    config.publicKey && 
    config.serviceId && 
    config.templateId &&
    config.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
    config.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
    config.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID'
  );
};

/**
 * Set EmailJS configuration securely
 */
export const setEmailJSConfig = (config: EmailJSConfig): void => {
  if (validateEmailJSConfig(config)) {
    localStorage.setItem('emailjs-config', JSON.stringify(config));
  } else {
    throw new Error('Invalid EmailJS configuration');
  }
};