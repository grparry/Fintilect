import { TestContext } from '@/context/TestContext';
import { PaymentHelper } from '@/../../helpers/payment.helper';
import { PaymentTestHelper, mockPayments } from '@/payment.helper';

describe('PaymentHelper', () => {
  let helper: PaymentHelper;

  beforeEach(async () => {
    await TestContext.setup();
    const db = TestContext.getTestDatabase();
    helper = new PaymentHelper(db);
    PaymentTestHelper.setupPaymentMocks(db);
  });

  afterEach(async () => {
    await TestContext.cleanup();
  });

  describe('getPayments', () => {
    it('should return a list of payments', async () => {
      const payments = await helper.getPayments();
      expect(payments).toBeDefined();
      expect(Array.isArray(payments)).toBe(true);
      expect(payments.length).toBe(1);
      expect(payments[0].amount).toBe(mockPayments.standard.Amount);
      expect(payments[0].status).toBe(mockPayments.standard.Status.toLowerCase());
    });
  });

  describe('getPaymentDetails', () => {
    it('should return payment details for a valid ID', async () => {
      const details = await helper.getPaymentDetails(1);
      expect(details).toBeDefined();
      expect(details?.id).toBe(1);
      expect(details?.amount).toBe(mockPayments.standard.Amount);
      expect(details?.status).toBe(mockPayments.standard.Status.toLowerCase());
    });

    it('should return null for invalid ID', async () => {
      const details = await helper.getPaymentDetails(-1);
      expect(details).toBeNull();
    });
  });

  describe('insertPayment', () => {
    it('should create a new payment', async () => {
      const newPayment = {
        amount: 300,
        status: 'pending',
        description: 'Test payment'
      };

      const created = await helper.insertPayment(newPayment);
      expect(created).toBeDefined();
      expect(created.amount).toBe(newPayment.amount);
      expect(created.status).toBe(newPayment.status);
      expect(created.description).toBe(newPayment.description);
      expect(created.createdDate).toBeInstanceOf(Date);
      expect(created.modifiedDate).toBeInstanceOf(Date);
    });
  });

  describe('updatePayment', () => {
    it('should update an existing payment', async () => {
      const updates = {
        status: 'completed',
        description: 'Updated test payment'
      };

      const updated = await helper.updatePayment(1, updates);
      expect(updated).toBeDefined();
      expect(updated?.id).toBe(1);
      expect(updated?.amount).toBe(mockPayments.standard.Amount);
      expect(updated?.status).toBe(updates.status);
      expect(updated?.description).toBe(updates.description);
    });

    it('should return null for invalid ID', async () => {
      const updated = await helper.updatePayment(-1, { status: 'completed' });
      expect(updated).toBeNull();
    });
  });

  describe('deletePayment', () => {
    it('should delete an existing payment', async () => {
      const result = await helper.deletePayment(1);
      expect(result).toBe(true);
    });

    it('should return false for invalid ID', async () => {
      const result = await helper.deletePayment(-1);
      expect(result).toBe(false);
    });
  });
});
