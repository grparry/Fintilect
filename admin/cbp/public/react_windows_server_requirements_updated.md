# Run-time Requirements for React.js / TypeScript / MUI / Webpack Web Application on Windows Server

## 1. Windows Server Version
- Windows Server 2016, 2019, or 2022 (Latest recommended).
- Ensure all necessary updates are installed.

## 2. Required Software

### A. Node.js & NPM
- Install Node.js LTS.
- Verify installation:
  ```sh
  node -v
  npm -v
  ```
- Used for managing dependencies and building the React app.

### B. Web Server for Serving React
You need a way to serve the React `build/` folder:

1. **IIS (Internet Information Services)**
   - Enable IIS and configure it to serve static files.
   - Use the URL Rewrite Module to route requests to `index.html`.

2. **Node.js with Serve**
   - Install `serve` globally:
     ```sh
     npm install -g serve
     ```
   - Serve the app:
     ```sh
     serve -s build -l 3000
     ```
   - Requires a way to keep Node.js running as a service.

3. **Third-Party Web Servers (Optional)**
   - **NGINX for Windows**
   - **Apache HTTP Server**

## 3. Building & Deploying the React App
1. **Build the React application**:
   ```sh
   npm install
   npm run build
   ```
2. **Move the `build/` folder** to the server.
3. **Serve it using IIS, Serve, or NGINX.**

## 4. Firewall & Networking
- Ensure the required ports are open:
  - **80 (HTTP)**
  - **443 (HTTPS)**
- If using IIS, configure routing to handle SPA navigation.

## 5. Logging & Monitoring
- **IIS logs** (if using IIS).
- **PM2** (if running a Node.js server).
- **Windows Event Viewer** for tracking issues.

---

# Multi-Tenant URL Handling

## 1. Host Header-Based Tenant Identification
Since the legacy system relies on host headers (subdomains) to determine tenant access, the new React application must:
- Identify which tenant a request belongs to.
- Dynamically adjust behavior based on the subdomain.

## 2. Deployment & URL Handling
Your production and test environments will have unique URLs:
```
https://{tenantId}-adminsvc.cfssinternal.com/
https://{tenantId}-adminsvc-test.cfssinternal.com/
```
Each tenant's admin portal should:
- Detect the subdomain or host header from the request.
- Load the correct tenant-specific settings (e.g., branding, API endpoints).
- Ensure proper routing without breaking React’s single-page application (SPA) behavior.

### **Fintilect Admin URLs**
- **Production:** [https://cfssadminsvc.cfssinternal.com/AdminPortal/Login](https://cfssadminsvc.cfssinternal.com/AdminPortal/Login)
- **Test:** [https://cfssadminsvc-test.cfssinternal.com/AdminPortal/Login](https://cfssadminsvc-test.cfssinternal.com/AdminPortal/Login)

## 3. Web Server & Routing Configurations

### A. IIS Configuration (If Used)
- Each subdomain should **map to the same React app** but pass the hostname.
- **IIS URL Rewrite** can be configured to rewrite requests dynamically.

### B. React Application Considerations
- Inside React, extract the **subdomain** from `window.location.hostname`.
- Example logic in TypeScript:
  ```typescript
  const getTenantId = () => {
    const hostname = window.location.hostname;
    const tenantPattern = /^([a-zA-Z0-9-]+)-adminsvc/;
    const match = hostname.match(tenantPattern);
    return match ? match[1] : "defaultTenant";
  };

  const tenantId = getTenantId();
  ```

## 4. Environment-Specific API Configuration
- Store API base URLs in `.env` files:
  ```
  REACT_APP_API_BASE_URL=https://api.cfssinternal.com
  ```
- Adjust based on detected tenant.

## 5. Authentication & Authorization
- Each tenant should authenticate using a **shared identity provider** or **separate authentication instances**.
- Ensure token-based access aligns with tenant-specific permissions.

---

# Next Steps
- Define where tenant-specific configurations (branding, API endpoints, etc.) are stored.
- Decide whether **tenants will share the same backend instance** or have isolated services.
- Implement **middleware or server-side routing** to handle multi-tenant logic before reaching React.
