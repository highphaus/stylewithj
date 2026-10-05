# Enterprise Windows Agent Deployment Guide

## 1. Overview
The Highphaus Desktop Agent can be installed manually by staff or distributed across enterprise Windows workstations via Microsoft Endpoint Manager (Intune), Group Policy Objects (GPO), or PowerShell scripts.

---

## 2. Building the Windows Installer
To package the standalone Windows executable and installer:
```powershell
# From the repository root:
npm run build:agent
```
The output installers (`.exe` / `.msi`) are generated in `desktop-agent/release/`.

---

## 3. Configuration & Enrollment
The agent reads its API connection URL via environment configuration or enrollment profile:
- **Default Dev Endpoint**: `http://localhost:5000`
- **Production Endpoint**: `https://api.highphaus.com`

---

## 4. Windows Startup Integration
The agent registers a standard Windows Run registry entry or Startup shortcut (`shell:startup`) for transparent, automatic startup on workstation login without security bypasses or clandestine background persistence.
