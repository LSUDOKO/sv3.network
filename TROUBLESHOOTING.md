# Troubleshooting Guide (Issue #85)

This guide provides solutions for common issues encountered when setting up, running, or contributing to the sv3.network project.

## 1. Dependency and Setup Errors

### Problem: Node/NPM/Yarn Commands Not Found

When running setup commands like `npm install` or `yarn install`, you get an error such as: `'npm' is not recognized as an internal or external command`.

**Solution:**

Ensure you have **Node.js** installed correctly on your system. If Node.js is installed, verify that its installation directory is correctly added to your system's **PATH** environment variable.


## 2. Network and Configuration Errors

### Problem: Failed to Connect / Port Already in Use

The application fails to start with an error indicating a port is already in use (e.g., Port 3000 or 8080).

**Solution:**

1.  **Identify the Process:** Use system tools to find which process is currently using the required port.
    * **Windows (PowerShell):** `Get-Process -Id (Get-NetTCPConnection -LocalPort <PORT_NUMBER>).OwningProcess`
    * **macOS/Linux:** `sudo lsof -i :<PORT_NUMBER>`
    
2.  **Terminate or Change:** Terminate the conflicting process, or modify the project's configuration file (e.g., `.env` or `config.json`) to run the application on a different port.
