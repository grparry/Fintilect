# State Management TODO

## Overview
This TODO tracks the necessary changes to improve state management patterns and data flow across the codebase.

**Created**: 2024-12-31T06:03:29-07:00
**Status**: Pending
**Priority**: High
**Category**: State Management
**Related Pattern**: core/state-management.md

## Current Issues

### 1. State Organization
- **Issue**: Scattered state
- **Current**: Local state
- **Required**: Global state
- **Impact**: Poor maintainability

### 2. State Patterns
- **Issue**: Mixed patterns
- **Current**: Basic hooks
- **Required**: Advanced patterns
- **Impact**: Poor scalability

### 3. State Persistence
- **Issue**: No persistence
- **Current**: Memory only
- **Required**: Storage system
- **Impact**: Poor reliability

### 4. State Synchronization
- **Issue**: No sync
- **Current**: Manual sync
- **Required**: Auto sync
- **Impact**: Poor consistency

### 5. State Testing
- **Issue**: Limited testing
- **Current**: Basic tests
- **Required**: Full coverage
- **Impact**: Poor quality

## Required Changes

### 1. State Architecture
```typescript
// src/state/core/Store.ts
export class Store<T extends object> {
  private state: T;
  private subscribers: Set<(state: T) => void>;
  private persistKey?: string;
  
  constructor(initialState: T, options?: StoreOptions) {
    this.state = initialState;
    this.subscribers = new Set();
    
    if (options?.persist) {
      this.persistKey = options.persistKey;
      this.loadPersistedState();
    }
  }
  
  getState(): T {
    return this.state;
  }
  
  setState(updater: (state: T) => T): void {
    this.state = updater(this.state);
    this.notifySubscribers();
    this.persistState();
  }
  
  subscribe(callback: (state: T) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
  
  private notifySubscribers(): void {
    for (const callback of this.subscribers) {
      callback(this.state);
    }
  }
  
  private persistState(): void {
    if (this.persistKey) {
      localStorage.setItem(
        this.persistKey,
        JSON.stringify(this.state)
      );
    }
  }
  
  private loadPersistedState(): void {
    if (this.persistKey) {
      const stored = localStorage.getItem(this.persistKey);
      if (stored) {
        this.state = JSON.parse(stored);
      }
    }
  }
}

// src/state/features/bill-pay/PaymentStore.ts
interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

export class PaymentStore extends Store<PaymentState> {
  constructor() {
    super(
      {
        payments: [],
        loading: false,
        error: null,
      },
      {
        persist: true,
        persistKey: 'payment-store',
      }
    );
  }
  
  async loadPayments(): Promise<void> {
    this.setState(state => ({
      ...state,
      loading: true,
      error: null,
    }));
    
    try {
      const payments = await paymentService.getPayments();
      this.setState(state => ({
        ...state,
        payments,
        loading: false,
      }));
    } catch (error) {
      this.setState(state => ({
        ...state,
        error: error.message,
        loading: false,
      }));
    }
  }
}
```

### 2. State Hook System
```typescript
// src/state/hooks/useStore.ts
export function useStore<T extends object>(
  store: Store<T>
): [T, (updater: (state: T) => T) => void] {
  const [state, setState] = useState(store.getState());
  
  useEffect(() => {
    return store.subscribe(setState);
  }, [store]);
  
  return [state, store.setState.bind(store)];
}

// src/state/hooks/usePayments.ts
export function usePayments() {
  const store = useMemo(() => new PaymentStore(), []);
  const [state, setState] = useStore(store);
  
  const actions = useMemo(
    () => ({
      loadPayments: () => store.loadPayments(),
      addPayment: (payment: Payment) =>
        setState(state => ({
          ...state,
          payments: [...state.payments, payment],
        })),
      removePayment: (id: string) =>
        setState(state => ({
          ...state,
          payments: state.payments.filter(p => p.id !== id),
        })),
    }),
    [setState]
  );
  
  return {
    ...state,
    ...actions,
  };
}
```

### 3. State Persistence System
```typescript
// src/state/persistence/Storage.ts
export interface Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export class LocalStorage implements Storage {
  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }
  
  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }
  
  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

// src/state/persistence/Persistence.ts
export class Persistence<T> {
  constructor(
    private storage: Storage,
    private key: string
  ) {}
  
  async load(): Promise<T | null> {
    const stored = await this.storage.getItem(this.key);
    return stored ? JSON.parse(stored) : null;
  }
  
  async save(state: T): Promise<void> {
    await this.storage.setItem(
      this.key,
      JSON.stringify(state)
    );
  }
  
  async clear(): Promise<void> {
    await this.storage.removeItem(this.key);
  }
}
```

### 4. State Synchronization
```typescript
// src/state/sync/SyncManager.ts
export class SyncManager<T> {
  private syncTimeout?: number;
  
  constructor(
    private store: Store<T>,
    private service: Service<T>,
    private options: SyncOptions = {}
  ) {
    this.setupSync();
  }
  
  private setupSync(): void {
    if (this.options.autoSync) {
      this.store.subscribe(() => {
        if (this.syncTimeout) {
          clearTimeout(this.syncTimeout);
        }
        
        this.syncTimeout = window.setTimeout(
          () => this.sync(),
          this.options.syncDelay ?? 1000
        );
      });
    }
  }
  
  async sync(): Promise<void> {
    const state = this.store.getState();
    await this.service.save(state);
  }
}

// Usage
const paymentSync = new SyncManager(
  paymentStore,
  paymentService,
  {
    autoSync: true,
    syncDelay: 2000,
  }
);
```

### 5. State Testing
```typescript
// src/state/__tests__/PaymentStore.test.ts
describe('PaymentStore', () => {
  let store: PaymentStore;
  let mockService: jest.Mocked<PaymentService>;
  
  beforeEach(() => {
    mockService = {
      getPayments: jest.fn(),
      savePayment: jest.fn(),
    };
    
    store = new PaymentStore(mockService);
  });
  
  describe('loadPayments', () => {
    it('loads payments successfully', async () => {
      const mockPayments = [{ id: '1' }];
      mockService.getPayments.mockResolvedValue(mockPayments);
      
      await store.loadPayments();
      
      expect(store.getState().payments).toBe(mockPayments);
      expect(store.getState().loading).toBe(false);
      expect(store.getState().error).toBe(null);
    });
    
    it('handles errors', async () => {
      const error = new Error('Failed');
      mockService.getPayments.mockRejectedValue(error);
      
      await store.loadPayments();
      
      expect(store.getState().payments).toEqual([]);
      expect(store.getState().loading).toBe(false);
      expect(store.getState().error).toBe(error.message);
    });
  });
});
```

## Implementation Plan

1. **Phase 1: Architecture**
   - Create store system
   - Add persistence
   - Update components
   - Add documentation

2. **Phase 2: Hooks**
   - Create hook system
   - Add store hooks
   - Update components
   - Add examples

3. **Phase 3: Persistence**
   - Create storage system
   - Add persistence
   - Update stores
   - Add migration

4. **Phase 4: Sync**
   - Create sync system
   - Add auto sync
   - Update stores
   - Add monitoring

5. **Phase 5: Testing**
   - Create test utils
   - Add unit tests
   - Add integration tests
   - Add benchmarks

## Notes
- Use TypeScript
- Add persistence
- Document patterns
- Monitor sync
- Consider scale
