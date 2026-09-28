/**
 * Formats Firebase and custom authentication errors into user-friendly,
 * beautifully worded explanations and actionable guidance.
 */

export const formatAuthError = (error) => {
  if (!error) return null;

  // Extract error code and raw message
  let code = '';
  let rawMsg = '';

  if (typeof error === 'string') {
    rawMsg = error;
    // Check if error code is embedded in string e.g. "(auth/invalid-credential)"
    const match = error.match(/\((auth\/[^)]+)\)/);
    if (match) code = match[1];
  } else if (typeof error === 'object') {
    code = error.code || '';
    rawMsg = error.message || '';
  }

  // Common Firebase Auth error mappings
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return {
        title: 'Incorrect Email or Password',
        description: 'The email or password you entered does not match our records. Please double-check your credentials and try again.',
        actionType: 'forgot-password',
        actionText: 'Reset your password'
      };

    case 'auth/user-not-found':
      return {
        title: 'Account Not Found',
        description: 'No BUILTD account is associated with this email address. Please make sure the email is typed correctly or create a new account.',
        actionType: 'signup',
        actionText: 'Create a free account'
      };

    case 'auth/email-already-in-use':
      return {
        title: 'Email Already In Use',
        description: 'An account with this email address already exists. Try logging in instead, or reset your password if you forgot it.',
        actionType: 'login',
        actionText: 'Log in to your account'
      };

    case 'auth/invalid-email':
      return {
        title: 'Invalid Email Address',
        description: 'Please enter a valid email format (e.g., student@college.edu).',
        actionType: null
      };

    case 'auth/weak-password':
      return {
        title: 'Password Too Short',
        description: 'Your password must be at least 6 characters long for security.',
        actionType: null
      };

    case 'auth/too-many-requests':
      return {
        title: 'Account Temporarily Locked',
        description: 'Too many unsuccessful attempts. For your security, access has been temporarily paused. Please wait a few moments or reset your password.',
        actionType: 'forgot-password',
        actionText: 'Reset password now'
      };

    case 'auth/popup-closed-by-user':
      return {
        title: 'Google Sign-In Cancelled',
        description: 'The Google authentication window was closed before completing. Please click "Continue with Google" again.',
        actionType: null
      };

    case 'auth/popup-blocked':
      return {
        title: 'Popup Blocked',
        description: 'Your browser blocked the Google sign-in popup. Please allow popups for this site and try again.',
        actionType: null
      };

    case 'auth/network-request-failed':
      return {
        title: 'Network Connection Error',
        description: 'Unable to connect to authentication servers. Please verify your internet connection and try again.',
        actionType: null
      };

    case 'auth/user-disabled':
      return {
        title: 'Account Suspended',
        description: 'This account has been disabled. If you believe this is an error, please reach out to support.',
        actionType: null
      };

    default:
      break;
  }

  // Secondary string check if code wasn't standard
  const lowerMsg = rawMsg.toLowerCase();
  if (lowerMsg.includes('invalid-credential') || lowerMsg.includes('wrong-password')) {
    return {
      title: 'Incorrect Email or Password',
      description: 'The email or password you entered does not match our records. Please verify and try again.',
      actionType: 'forgot-password',
      actionText: 'Reset your password'
    };
  }
  if (lowerMsg.includes('user-not-found')) {
    return {
      title: 'Account Not Found',
      description: 'No account found with this email. Please check your spelling or sign up.',
      actionType: 'signup',
      actionText: 'Create an account'
    };
  }
  if (lowerMsg.includes('too-many-requests')) {
    return {
      title: 'Too Many Attempts',
      description: 'Access is temporarily restricted due to multiple failed attempts. Please wait a few minutes or reset your password.',
      actionType: 'forgot-password',
      actionText: 'Reset password'
    };
  }
  if (lowerMsg.includes('popup-closed')) {
    return {
      title: 'Sign-in Cancelled',
      description: 'The Google sign-in window was closed before completing.',
      actionType: null
    };
  }

  // Clean raw Firebase boilerplate text: "Firebase: Error (auth/xyz)."
  const cleaned = rawMsg
    .replace(/^Firebase:\s*/i, '')
    .replace(/^Error\s*:\s*/i, '')
    .replace(/\s*\(auth\/[^)]+\)\.?/i, '')
    .trim();

  return {
    title: 'Unable to Sign In',
    description: cleaned || 'An unexpected authentication error occurred. Please try again.',
    actionType: null
  };
};
