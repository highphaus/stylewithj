# Workplace Privacy & Transparency Charter

## Principles of Ethical Workplace Telemetry
Highphaus Workforce Platform is an internal productivity aggregation and attendance system, **not spyware**. It enforces strict technical boundaries to respect employee privacy:

### 1. What We Collect
- **Active Work Hours**: Work session start/end timestamps and lunch/coffee breaks.
- **Presence & Idle State**: Aggregate active vs. idle intervals via OS input idle timers.
- **Application Focus**: Foreground process identity (e.g. `Figma.exe`, `Code.exe`, `slack.exe`, `chrome.exe`) to calculate department category distribution.
- **Device Health**: Workstation hostname, OS version, and agent version.

### 2. What We Strictly NEVER Collect
- ❌ **NO Keystroke Logging**: Keyloggers and typed text logging are physically absent from the codebase.
- ❌ **NO Screen Captures / Video**: No clandestine screenshot grabbing or video recording.
- ❌ **NO Webcam / Audio**: Zero microphone or camera hardware access.
- ❌ **NO Form / Password Extraction**: Passwords, banking inputs, and private message contents are never accessed or stored.
- ❌ **NO Covert Background Hiding**: The desktop agent runs openly with an interactive system tray icon and employee status panel.
