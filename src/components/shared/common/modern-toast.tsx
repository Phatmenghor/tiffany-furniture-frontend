'use client';

import React, { CSSProperties, useEffect, useState } from 'react';
import { useBusinessColors } from '@/hooks/use-business-colors';

interface ModernToastProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'order' | 'payment' | 'user' | 'validation';
  title: string;
  message: string;
  timestamp?: string;
  details?: Record<string, any>;
  validationData?: ValidationData;
}

interface ValidationData {
  nid?: string;
  score?: number;
  status?: 'SUCCESS' | 'FAILURE';
  incorrectFields?: string[];
  nameKH?: string;
  nameEN?: string;
  dob?: string;
  gender?: string;
  issued?: string;
  expired?: string;
  phoneNumber?: string;
}

export function ModernToastContent({
  type,
  title,
  message,
  timestamp = new Date().toLocaleString(),
  details,
  validationData,
}: ModernToastProps) {
  const { primary } = useBusinessColors();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return { bg: '#dcfce7', border: '#86efac', text: '#166534', left: '#22c55e' };
      case 'error':
        return { bg: '#fee2e2', border: '#fca5a5', text: '#7f1d1d', left: '#ef4444' };
      case 'warning':
        return { bg: '#fef3c7', border: '#fcd34d', text: '#92400e', left: '#eab308' };
      case 'info':
        return { bg: '#dbeafe', border: '#93c5fd', text: '#0c2d6b', left: '#3b82f6' };
      case 'order':
        return { bg: '#f3e8ff', border: '#ddd6fe', text: '#4c1d95', left: primary };
      case 'payment':
        return { bg: '#d1fae5', border: '#a7f3d0', text: '#065f46', left: '#10b981' };
      case 'user':
        return { bg: '#e0e7ff', border: '#c7d2fe', text: '#312e81', left: primary };
      case 'validation':
        return validationData?.status === 'SUCCESS'
          ? { bg: '#dcfce7', border: '#86efac', text: '#166534', left: '#22c55e' }
          : { bg: '#fed7aa', border: '#fdba74', text: '#7c2d12', left: '#f97316' };
      default:
        return { bg: '#f3f4f6', border: '#d1d5db', text: '#111827', left: primary };
    }
  };

  const typeColor = getTypeColor();

  const containerStyle: CSSProperties = {
    backgroundColor: typeColor.bg,
    borderColor: typeColor.border,
    borderLeft: `4px solid ${typeColor.left}`,
    borderTop: `1px solid ${typeColor.border}`,
    borderRight: `1px solid ${typeColor.border}`,
    borderBottom: `1px solid ${typeColor.border}`,
  };

  const titleStyle: CSSProperties = {
    color: typeColor.text,
  };

  if (isMobile) {
    return (
      <div
        style={containerStyle}
        className="rounded-md px-3 py-2 shadow-lg max-w-[90vw] mx-auto pointer-events-auto"
      >
        <p className="text-gray-700 text-xs leading-relaxed">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div
      style={containerStyle}
      className="rounded-md p-4 w-96 shadow-lg"
    >
      {/* Header with Title and ID */}
      <div className="flex justify-between items-start mb-3 pb-3" style={{ borderBottomColor: typeColor.border, borderBottom: '1px solid' }}>
        <div className="flex-1">
          <h4 style={titleStyle} className="font-semibold text-base leading-tight">
            {title}
          </h4>
        </div>
      </div>

      {/* Message */}
      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        {message}
      </p>

      {/* Validation Data if provided */}
      {validationData && (
        <div style={{ borderTopColor: typeColor.border, borderTop: '1px solid' }} className="pt-3 mb-3">
          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-2">
              <span style={{ color: typeColor.text }} className="font-medium">NID:</span>
              <span style={{ color: typeColor.text }} className="font-mono">{validationData.nid}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: typeColor.text }} className="font-medium">Score:</span>
              <span style={{ color: typeColor.text }} className="font-mono">{validationData.score}</span>
            </div>
            {validationData.incorrectFields && validationData.incorrectFields.length > 0 && (
              <div className="text-xs mt-2">
                <span style={{ color: typeColor.text }} className="font-medium">Incorrect Fields:</span>
                <ul className="list-disc list-inside">
                  {validationData.incorrectFields.map((field, idx) => (
                    <li key={idx} style={{ color: typeColor.text }} className="text-xs">{field}</li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ borderTopColor: typeColor.border, borderTop: '1px solid' }} className="pt-2 mt-2">
              <div className="text-xs space-y-1">
                {validationData.nameKH && (
                  <div className="flex justify-between">
                    <span style={{ color: typeColor.text }}className="opacity-70">Name KH:</span>
                    <span style={{ color: typeColor.text }}>{validationData.nameKH}</span>
                  </div>
                )}
                {validationData.nameEN && (
                  <div className="flex justify-between">
                    <span style={{ color: typeColor.text }} className="opacity-70">Name EN:</span>
                    <span style={{ color: typeColor.text }}>{validationData.nameEN}</span>
                  </div>
                )}
                {validationData.dob && (
                  <div className="flex justify-between">
                    <span style={{ color: typeColor.text }} className="opacity-70">DOB:</span>
                    <span style={{ color: typeColor.text }}>{validationData.dob}</span>
                  </div>
                )}
                {validationData.gender && (
                  <div className="flex justify-between">
                    <span style={{ color: typeColor.text }} className="opacity-70">Gender:</span>
                    <span style={{ color: typeColor.text }}>{validationData.gender}</span>
                  </div>
                )}
                {validationData.issued && (
                  <div className="flex justify-between">
                    <span style={{ color: typeColor.text }} className="opacity-70">Issued:</span>
                    <span style={{ color: typeColor.text }}>{validationData.issued}</span>
                  </div>
                )}
                {validationData.expired && (
                  <div className="flex justify-between">
                    <span style={{ color: typeColor.text }} className="opacity-70">Expired:</span>
                    <span style={{ color: typeColor.text }}>{validationData.expired}</span>
                  </div>
                )}
                {validationData.phoneNumber && (
                  <div className="flex justify-between">
                    <span style={{ color: typeColor.text }} className="opacity-70">Phone:</span>
                    <span style={{ color: typeColor.text }}>{validationData.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Details if provided */}
      {details && Object.keys(details).length > 0 && !validationData && (
        <div style={{ borderTopColor: typeColor.border, borderTop: '1px solid' }} className="pt-3 mb-3">
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(details).map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs">
                <span style={{ color: typeColor.text }} className="font-medium">{key}:</span>
                <span style={{ color: typeColor.text }} className="font-mono">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer with Timestamp */}
      <div style={{ borderTopColor: typeColor.border, borderTop: '1px solid' }} className="pt-2 mt-3">
        <div className="flex justify-between text-xs">
          <span style={{ color: typeColor.text, opacity: 0.7 }}>Time</span>
          <span style={{ color: typeColor.text }} className="text-xs">{timestamp}</span>
        </div>
      </div>
    </div>
  );
}
