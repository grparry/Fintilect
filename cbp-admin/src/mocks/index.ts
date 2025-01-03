export async function initMocks() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./browser');
    try {
      await worker.start({
        onUnhandledRequest(request, print) {
          // Ignore hot-update files, static assets, and non-API calls
          const shouldIgnore = request.url.includes('.hot-update.') ||
            request.url.endsWith('.js') ||
            request.url.endsWith('.css') ||
            request.url.endsWith('.png') ||
            request.url.endsWith('.svg') ||
            request.url.endsWith('.jpg') ||
            request.url.endsWith('.jpeg') ||
            request.url.endsWith('.gif') ||
            request.url.endsWith('.json');

          if (!shouldIgnore) {
            console.log('MSW: Unhandled request', {
              method: request.method,
              url: request.url,
              headers: Object.fromEntries(request.headers.entries())
            });
            print.warning();
          }
        },
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/',
          }
        }
      });
      console.log('MSW: Started successfully');
    } catch (error) {
      console.error('MSW: Failed to start:', error);
    }
  }
}
