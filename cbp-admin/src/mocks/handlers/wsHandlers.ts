import { http } from 'msw';

export const wsHandlers = [
  // Handle WebSocket connection upgrade
  http.get('/ws', () => {
    // Return a successful response to allow WebSocket upgrade
    return new Response(null, {
      status: 101, // Switching Protocols
      headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
      },
    });
  }),
];
