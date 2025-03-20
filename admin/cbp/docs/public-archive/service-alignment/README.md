# Service API Alignment Documentation

This directory contains API alignment documentation for each service in the CBP Admin application. Each document follows this structure:

## Structure
```markdown
# ServiceName API Alignment

## Current TypeScript Implementation
- Base URL: [what the service is using]
- Endpoints Called: [list from the TS code]
- TypeScript Types Used: [list of types]

## C# Implementation
- Controller: [actual C# controller]
- Available Endpoints: [what exists in C#]
- C# Types: [list of types]

## Gaps and Actions Needed
- [List mismatches]
- [Suggested fixes]
```

## Services
1. [Audit Service](audit-service.md)
2. [Auth Service](auth-service.md)
3. [Bill Pay Service](bill-pay-service.md)
4. [Client Service](client-service.md)
5. [Dashboard Service](dashboard-service.md)
6. [Exception Service](exception-service.md)
7. [FIS Exception Service](fis-exception-service.md)
8. [Holiday Service](holiday-service.md)
9. [Notification Service](notification-service.md)
10. [Payee Service](payee-service.md)
11. [Payment Processor Service](payment-processor-service.md)
12. [Payment Service](payment-service.md)
13. [Permission Service](permission-service.md)
14. [Report Service](report-service.md)
15. [Security Service](security-service.md)
16. [User Service](user-service.md)
