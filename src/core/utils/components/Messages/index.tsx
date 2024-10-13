import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Create a global message container in the document
let container: HTMLDivElement | null = null;

const getContainer = () => {
  if (!container) {
    container = document.createElement('div');
    container.className = 'global-message-container';
    document.body.appendChild(container);
  }
  return container;
};

// Show the message
export const message = {
  success: (msg: string, duration = 3) => showMessage('success', msg, duration),
  error: (msg: string, duration = 3) => showMessage('error', msg, duration),
  info: (msg: string, duration = 3) => showMessage('info', msg, duration),
  warning: (msg: string, duration = 3) => showMessage('warning', msg, duration),
};

const showMessage = (type: string, msg: string, duration: number) => {
  const container = getContainer();
  const div = document.createElement('div');
  container.appendChild(div);

  const root = createRoot(div);

  const MessageComponent = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration * 1000);

      return () => clearTimeout(timer);
    }, [duration]);

    useEffect(() => {
      if (!visible) {
        container.removeChild(div);
      }
    }, [visible]);

    if (!visible) return <></>;

    return <div className={`custom-message bg-${type}`}>{msg}</div>;
  };

  root.render(<MessageComponent />);
};
