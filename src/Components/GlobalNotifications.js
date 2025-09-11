import React from 'react';
import { useError } from '../contexts/ErrorContext';
import { AlertCircle, CheckCircle, XCircle, X } from 'lucide-react';

const GlobalNotifications = () => {
  const { errors, removeError } = useError();

  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {errors.map((error) => (
        <NotificationItem
          key={error.id}
          error={error}
          onRemove={() => removeError(error.id)}
        />
      ))}
    </div>
  );
};

const NotificationItem = ({ error, onRemove }) => {
  const getIcon = () => {
    switch (error.type) {
      case 'AUTH_ERROR':
        return <XCircle className="text-red-500" size={20} />;
      case 'NETWORK_ERROR':
        return <AlertCircle className="text-orange-500" size={20} />;
      case 'VALIDATION_ERROR':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'SUCCESS':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <AlertCircle className="text-red-500" size={20} />;
    }
  };

  const getBgColor = () => {
    switch (error.type) {
      case 'SUCCESS':
        return 'bg-green-50 border-green-200';
      case 'NETWORK_ERROR':
        return 'bg-orange-50 border-orange-200';
      case 'VALIDATION_ERROR':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${getBgColor()} animate-slide-in`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="mr-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {error.message}
          </p>
          {error.context && (
            <p className="text-xs text-gray-500 mt-1">
              {error.context}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 flex">
          <button
            onClick={onRemove}
            className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalNotifications;