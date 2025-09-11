import React, { createContext, useContext, useReducer } from 'react';

// Error types
export const ERROR_TYPES = {
  API_ERROR: 'API_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

// Initial state
const initialState = {
  errors: [],
  isLoading: false,
  globalError: null
};

// Error reducer
const errorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'ADD_ERROR':
      return {
        ...state,
        errors: [...state.errors, {
          id: Date.now(),
          type: action.payload.type || ERROR_TYPES.UNKNOWN_ERROR,
          message: action.payload.message,
          timestamp: new Date(),
          context: action.payload.context
        }]
      };

    case 'REMOVE_ERROR':
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.payload)
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: []
      };

    case 'SET_GLOBAL_ERROR':
      return {
        ...state,
        globalError: action.payload
      };

    case 'CLEAR_GLOBAL_ERROR':
      return {
        ...state,
        globalError: null
      };

    default:
      return state;
  }
};

// Create context
const ErrorContext = createContext();

// Error provider component
export const ErrorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  // Helper functions
  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const addError = (error) => {
    dispatch({ type: 'ADD_ERROR', payload: error });
  };

  const removeError = (errorId) => {
    dispatch({ type: 'REMOVE_ERROR', payload: errorId });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const setGlobalError = (error) => {
    dispatch({ type: 'SET_GLOBAL_ERROR', payload: error });
  };

  const clearGlobalError = () => {
    dispatch({ type: 'CLEAR_GLOBAL_ERROR' });
  };

  // Handle API errors with specific logic
  const handleAPIError = (error, context = '') => {
    let errorType = ERROR_TYPES.API_ERROR;
    let message = 'حدث خطأ غير متوقع';

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
          errorType = ERROR_TYPES.AUTH_ERROR;
          message = 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى';
          // Redirect to login
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          window.location.href = '/login';
          break;
        case 403:
          message = 'ليس لديك صلاحية للوصول إلى هذا المورد';
          break;
        case 404:
          message = 'المورد المطلوب غير موجود';
          break;
        case 422:
          errorType = ERROR_TYPES.VALIDATION_ERROR;
          message = data.message || 'بيانات غير صالحة';
          break;
        case 500:
          message = 'خطأ في الخادم. يرجى المحاولة لاحقاً';
          break;
        default:
          message = data.message || `خطأ ${status}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      // Network error
      errorType = ERROR_TYPES.NETWORK_ERROR;
      message = 'فشل في الاتصال بالخادم. تحقق من اتصالك بالإنترنت';
    }

    addError({
      type: errorType,
      message,
      context
    });

    return { type: errorType, message };
  };

  // Auto-remove errors after timeout
  React.useEffect(() => {
    const timeouts = state.errors.map(error => {
      return setTimeout(() => {
        removeError(error.id);
      }, 10000); // Remove after 10 seconds
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [state.errors]);

  const value = {
    ...state,
    setLoading,
    addError,
    removeError,
    clearErrors,
    setGlobalError,
    clearGlobalError,
    handleAPIError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

// Hook to use error context
export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

// Error boundary component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">حدث خطأ غير متوقع</h3>
              <div className="mt-2 text-sm text-gray-500">
                عذراً، حدث خطأ في التطبيق. يرجى إعادة تحميل الصفحة أو المحاولة لاحقاً.
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                إعادة تحميل الصفحة
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}