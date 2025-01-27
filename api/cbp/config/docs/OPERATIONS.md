# Operational Procedures

This document outlines the operational procedures for maintaining and supporting the CBP Config API in production.

## Monitoring and Alerting

### Key Metrics

#### 1. System Health
- CPU Usage (Alert: >80%)
- Memory Usage (Alert: >85%)
- Disk Space (Alert: >90%)
- Network I/O (Alert: >80% bandwidth)

#### 2. Application Metrics
- Request Rate
- Error Rate (Alert: >1%)
- Response Time (Alert: >500ms p95)
- Active Connections

#### 3. Database Metrics
- Connection Pool Usage
- Query Performance
- Lock Contention
- Deadlocks

#### 4. Cache Metrics
- Hit Rate
- Memory Usage
- Eviction Rate
- Connection Status

### Monitoring Dashboard
```typescript
interface DashboardMetrics {
  system: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  application: {
    requests: number;
    errors: number;
    latency: number;
    connections: number;
  };
  database: {
    connections: number;
    queryTime: number;
    locks: number;
    deadlocks: number;
  };
  cache: {
    hitRate: number;
    memory: number;
    evictions: number;
    status: string;
  };
}
```

## Logging Strategy

### Log Levels
1. ERROR: System errors requiring immediate attention
2. WARN: Potential issues requiring investigation
3. INFO: Normal operational events
4. DEBUG: Detailed information for troubleshooting

### Log Format
```typescript
interface LogEntry {
  timestamp: string;
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  service: string;
  traceId: string;
  message: string;
  context: {
    path: string;
    method: string;
    statusCode: number;
    duration: number;
    userId?: string;
    error?: Error;
  };
}
```

### Log Storage
- Short-term: Local disk (7 days)
- Medium-term: Elasticsearch (30 days)
- Long-term: Cloud storage (1 year)

## Backup Procedures

### Database Backups

#### Full Backup (Daily)
```sql
BACKUP DATABASE cbp_config
TO DISK = 'N:\Backups\cbp_config_full.bak'
WITH INIT, NAME = 'CBP Config Full Backup';
```

#### Transaction Log Backup (Hourly)
```sql
BACKUP LOG cbp_config
TO DISK = 'N:\Backups\cbp_config_log.bak';
```

#### Verification
```sql
RESTORE VERIFYONLY
FROM DISK = 'N:\Backups\cbp_config_full.bak';
```

### Configuration Backups

#### System Configuration
```bash
#!/bin/bash
# Backup configuration files
tar -czf /backup/config_$(date +%Y%m%d).tar.gz /etc/cbp-config/

# Rotate backups (keep last 30 days)
find /backup -name "config_*.tar.gz" -mtime +30 -delete
```

#### SSL Certificates
```bash
#!/bin/bash
# Backup SSL certificates
cp -r /etc/ssl/certs/ /backup/ssl/$(date +%Y%m%d)/

# Backup private keys
cp -r /etc/ssl/private/ /backup/ssl/$(date +%Y%m%d)/
```

## Incident Response

### Severity Levels

#### Severity 1 (Critical)
- System down
- Data loss
- Security breach
- Response time: 15 minutes
- Resolution time: 2 hours

#### Severity 2 (High)
- Degraded performance
- Partial system failure
- Response time: 30 minutes
- Resolution time: 4 hours

#### Severity 3 (Medium)
- Minor functionality issues
- Non-critical errors
- Response time: 2 hours
- Resolution time: 8 hours

#### Severity 4 (Low)
- Cosmetic issues
- Feature requests
- Response time: 24 hours
- Resolution time: 5 days

### Incident Response Process

1. Detection and Reporting
```typescript
interface Incident {
  id: string;
  severity: 1 | 2 | 3 | 4;
  status: 'new' | 'investigating' | 'resolved' | 'closed';
  description: string;
  affectedComponents: string[];
  startTime: Date;
  resolvedTime?: Date;
  actions: {
    timestamp: Date;
    action: string;
    performer: string;
  }[];
}
```

2. Initial Assessment
- Identify affected components
- Determine severity level
- Assign response team
- Start incident log

3. Investigation
- Gather system metrics
- Review error logs
- Analyze database state
- Check recent changes

4. Resolution
- Implement fix
- Verify solution
- Update documentation
- Notify stakeholders

5. Post-Mortem
- Root cause analysis
- Prevention measures
- Documentation updates
- Team review

## Performance Optimization

### Query Optimization
```sql
-- Identify slow queries
SELECT 
    qs.execution_count,
    qs.total_elapsed_time / qs.execution_count as avg_elapsed_time,
    st.text
FROM 
    sys.dm_exec_query_stats qs
CROSS APPLY 
    sys.dm_exec_sql_text(qs.sql_handle) st
ORDER BY 
    avg_elapsed_time DESC;
```

### Cache Optimization
```typescript
// Cache strategy
const cacheStrategy = {
  // Frequently accessed, rarely changed
  static: {
    ttl: 24 * 60 * 60, // 1 day
    strategy: 'cache-aside'
  },
  // Frequently changed
  dynamic: {
    ttl: 5 * 60, // 5 minutes
    strategy: 'write-through'
  },
  // User-specific
  personal: {
    ttl: 15 * 60, // 15 minutes
    strategy: 'cache-aside'
  }
};
```

### Connection Pool Optimization
```typescript
// Pool configuration
const poolConfig = {
  min: 5,
  max: 10,
  idleTimeoutMillis: 30000,
  createTimeoutMillis: 30000,
  acquireTimeoutMillis: 30000,
  propagateCreateError: false
};
```

## Security Procedures

### Access Control
```typescript
interface AccessControl {
  roles: {
    admin: string[];
    operator: string[];
    viewer: string[];
  };
  permissions: {
    read: string[];
    write: string[];
    execute: string[];
  };
  audit: {
    enabled: boolean;
    retention: number;
    events: string[];
  };
}
```

### Security Scanning
```bash
#!/bin/bash
# Run security scans
npm audit
snyk test
docker scan cbp-config-api:latest

# Update dependencies
npm audit fix
npm update
```

### Certificate Management
```bash
#!/bin/bash
# Check certificate expiration
openssl x509 -enddate -noout -in /etc/ssl/certs/server.crt

# Generate new certificate
openssl req -new -newkey rsa:4096 -nodes \
  -keyout /etc/ssl/private/server.key \
  -out /etc/ssl/certs/server.crt
```

## Maintenance Procedures

### Database Maintenance
```sql
-- Index maintenance
ALTER INDEX ALL ON TableName REBUILD;

-- Statistics update
UPDATE STATISTICS TableName WITH FULLSCAN;

-- Data file shrink
DBCC SHRINKFILE (N'DataFileName' , 0);
```

### Log Rotation
```bash
#!/bin/bash
# Rotate application logs
logrotate /etc/logrotate.d/cbp-config-api

# Clean old logs
find /var/log/cbp-config-api -type f -mtime +30 -delete
```

### System Updates
```bash
#!/bin/bash
# Update system packages
apt update
apt upgrade -y

# Update Node.js
nvm install node --latest-npm
nvm alias default node
```

## Recovery Procedures

### Database Recovery
```sql
-- Point-in-time recovery
RESTORE DATABASE cbp_config
FROM DISK = 'N:\Backups\cbp_config_full.bak'
WITH NORECOVERY;

RESTORE LOG cbp_config
FROM DISK = 'N:\Backups\cbp_config_log.bak'
WITH RECOVERY,
STOPAT = '2025-01-04 12:00:00';
```

### Application Recovery
```bash
#!/bin/bash
# Rollback to previous version
docker pull cbp-config-api:previous
docker-compose down
docker-compose up -d

# Verify recovery
curl -f http://localhost:3000/health
```

### System State Recovery
```bash
#!/bin/bash
# Restore configuration
tar -xzf /backup/config_latest.tar.gz -C /

# Restore certificates
cp -r /backup/ssl/latest/* /etc/ssl/

# Restart services
systemctl restart nginx
docker-compose restart
```
