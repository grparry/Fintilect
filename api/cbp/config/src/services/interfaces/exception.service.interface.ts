import { ServiceResponse } from '../../types/common';
import {
  ExceptionSearchRequest,
  ExceptionSearchResponse,
  ExceptionUpdateRequest,
  ExceptionRefundRequest,
  ExceptionRefundResponse,
  ExceptionNotificationRequest,
  FisException
} from '../../types/fis-exception';

export interface IExceptionService {
  searchExceptions(request: ExceptionSearchRequest): Promise<ServiceResponse<ExceptionSearchResponse>>;
  getException(id: number): Promise<ServiceResponse<FisException>>;
  updateException(request: ExceptionUpdateRequest): Promise<ServiceResponse<void>>;
  checkRefundAdjustment(request: ExceptionRefundRequest): Promise<ServiceResponse<ExceptionRefundResponse>>;
  sendNotification(request: ExceptionNotificationRequest): Promise<ServiceResponse<void>>;
}
