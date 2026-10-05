using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

public class WindowHelper {
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr OpenInputDesktop(uint dwFlags, bool fInherit, uint dwDesiredAccess);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr OpenDesktop(string lpszDesktop, uint dwFlags, bool fInherit, uint dwDesiredAccess);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool SetThreadDesktop(IntPtr hDesktop);

    [DllImport("user32.dll")]
    public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

    [DllImport("user32.dll")]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    public static extern int GetClassName(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    public static extern bool IsWindowVisible(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();

    private const uint DESKTOP_ALL = 0x10000000 | 0x01FF;

    static void Attach() {
        try {
            IntPtr hDesk = OpenInputDesktop(0, false, DESKTOP_ALL);
            if (hDesk == IntPtr.Zero) {
                hDesk = OpenDesktop("default", 0, false, DESKTOP_ALL);
            }
            if (hDesk != IntPtr.Zero) {
                SetThreadDesktop(hDesk);
            }
        } catch {}
    }

    public static void Main(string[] args) {
        Attach();

        if (args.Length > 0 && args[0] == "focus") {
            string targetName = args.Length > 1 ? args[1].ToLower() : "";
            bool found = false;
            EnumWindows((hWnd, lParam) => {
                uint pid;
                GetWindowThreadProcessId(hWnd, out pid);
                try {
                    using (var p = Process.GetProcessById((int)pid)) {
                        string name = p.ProcessName.ToLower();
                        if (name.Contains(targetName)) {
                            ShowWindow(hWnd, 9); // SW_RESTORE
                            SetForegroundWindow(hWnd);
                            Console.WriteLine("FOCUSED: " + hWnd + " | PID: " + pid + " | " + p.ProcessName);
                            found = true;
                            return false; // stop enumeration
                        }
                    }
                } catch {}
                return true;
            }, IntPtr.Zero);
            if (!found) Console.WriteLine("NOT_FOUND: " + targetName);
            return;
        }

        IntPtr fg = GetForegroundWindow();
        Console.WriteLine("FOREGROUND HWND: " + fg);

        EnumWindows((hWnd, lParam) => {
            uint pid;
            GetWindowThreadProcessId(hWnd, out pid);
            StringBuilder sbTitle = new StringBuilder(512);
            GetWindowText(hWnd, sbTitle, 512);
            StringBuilder sbClass = new StringBuilder(256);
            GetClassName(hWnd, sbClass, 256);
            string title = sbTitle.ToString();
            try {
                using (var p = Process.GetProcessById((int)pid)) {
                    if (title.Length > 0 && !p.ProcessName.Equals("conhost", StringComparison.OrdinalIgnoreCase)) {
                        Console.WriteLine(string.Format("HWND:{0} | PID:{1} | PROC:{2} | CLASS:{3} | TITLE:{4}",
                            hWnd, pid, p.ProcessName, sbClass, title));
                    }
                }
            } catch {}
            return true;
        }, IntPtr.Zero);
    }
}
