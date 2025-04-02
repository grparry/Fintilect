

/**
 * Base interface for all entities in the system
 */
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}
/**
 * Common audit information interface
 */
export interface AuditInfo extends Pick<BaseEntity, 'createdAt' | 'updatedAt'> {
    createdBy: string;
    updatedBy?: string;
    version: number;
}
/**
 * Common status types
 */
export type Status = 'active' | 'inactive' | 'pending' | 'suspended';
/**
 * Common sort direction type
 */
export type SortDirection = 'ASC' | 'DESC';
/**
 * Common sort options interface
 */
export interface SortOptions {
    field: string;
    direction: SortDirection;
}
/**
 * Common filter options interface
 */
export interface FilterOptions {
    [key: string]: string | number | boolean | null | undefined;
}
/**
 * Common pagination options interface
 */
export interface PaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortDirection;
}
/**
 * Common paginated response interface
 */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}