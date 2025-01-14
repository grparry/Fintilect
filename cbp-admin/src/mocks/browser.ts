import { setupWorker } from 'msw/browser';
import { handlers } from './index';

export const worker = setupWorker(...handlers);

// Start the worker
worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
        url: '/mockServiceWorker.js'
    }
});
