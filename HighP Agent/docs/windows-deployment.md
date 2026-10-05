# Windows Desktop Agent Deployment Guide

This guide details both manual and centralized enterprise deployment procedures for the Highphaus Windows Desktop Monitoring Agent.

---

## 1. Prerequisites

- **Target Operating System**: Windows 10 / Windows 11 / Windows Server 2019+ (x64 / arm64).
- **Network Access**: Outbound HTTPS (Port 443) and WSS (WebSocket Secure) to `https://api.highphaus.com`.
- **Administrative Rights**: Not required for user-level tray execution; required only for machine-wide Program Files installation.

---

## 2. Generating the Windows Installer

From the monorepo root:

```powershell
# 1. Build shared packages and Electron TypeScript assets
npm run build --workspace=@highp/shared
npm run build --workspace=@highp/desktop-agent

# 2. Package standalone Windows NSIS installer
npm run build:agent
```

The output installer is generated in:
`desktop-agent/release/HighPhaus-Workforce-Setup.exe`

---

## 3. Manual Installation & Enrollment

1. Double-click `HighPhaus-Workforce-Setup.exe`.
2. The installer creates a Start Menu shortcut and launches the application into the **Windows System Tray**.
3. Click the Tray Icon and select **Login / Link Account**.
4. Enter your employee email and password.
5. The agent registers the local device and begins transparent workstation activity tracking.

---

## 4. Centralized Enterprise Deployment (GPO & Microsoft Intune)

For managed corporate workstations:

### Microsoft Intune (Win32 App Packaging)
1. Wrap `HighPhaus-Workforce-Setup.exe` using the Microsoft Win32 Content Prep Tool (`IntuneWinAppUtil.exe`).
2. Set Install Command: `HighPhaus-Workforce-Setup.exe /S /ALLUSERS`
3. Set Uninstall Command: `"%ProgramFiles%\HighPhaus Workforce\Uninstall.exe" /S`
4. Set Detection Rule: File exists at `"%ProgramFiles%\HighPhaus Workforce\HighPhaus Workforce.exe"`.

### Active Directory Group Policy (GPO)
1. Place the MSI/installer package on a secure UNC share (`\\ad.domain\SysVol\deploy\HighPhaus-Setup.exe`).
2. Create a GPO under **Computer Configuration > Policies > Software Settings > Software installation**.
3. Target all organizational employee workstation groups.
