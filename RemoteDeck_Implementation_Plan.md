# RemoteDeck — Windows + Android Remote Keyboard & FL Studio Companion

## 1. Product Idea

**RemoteDeck** is a two-part system consisting of:

1. A lightweight **Windows companion application** installed on the laptop.
2. An **Android phone application** that acts as a remote keyboard, shortcut deck, and workstation control surface.

The primary goal is to make the phone behave like an intelligent companion keyboard for the Windows laptop.

When the user selects a text input field on the laptop, the Windows companion detects the focused editable field and signals the phone. The phone can then automatically reveal the remote keyboard or notify the user that keyboard input is available.

For FL Studio, the behavior changes into a dedicated persistent workstation mode so the phone remains ready as a keyboard, shortcut deck, macro pad, and optional transport/controller surface until the user explicitly exits FL Studio mode.

The system should be fast, local-first, minimal, secure, and should not unnecessarily interrupt normal phone usage.

---

# 2. Core Product Goals

RemoteDeck should:

- Detect when the user clicks or focuses a text input field on Windows.
- Signal the phone immediately.
- Let the user type on the phone and have the text appear in the active Windows application.
- Work across standard Windows applications wherever practical.
- Provide a dedicated persistent **FL Studio Mode**.
- Allow the phone to remain usable for other apps at the same time.
- Keep the remote keyboard accessible through a compact floating control.
- Support custom shortcut pages and macros.
- Connect primarily over the local Wi-Fi network.
- Require no cloud server for normal operation.
- Pair devices securely.
- Reconnect automatically after the initial pairing.
- Keep latency low enough that typing feels immediate.
- Be extensible later to trackpad, clipboard, numpad, Photoshop, browser, and other workstation profiles.

---

# 3. High-Level System Architecture

```text
WINDOWS LAPTOP
      │
      │ Detect focus / active application
      ▼
Windows Companion
      │
      │ Encrypted local connection
      │ Wi-Fi / LAN
      ▼
Android Phone App
      │
      │ Keyboard / shortcut / macro input
      ▼
Windows Companion
      │
      │ Inject keyboard input
      ▼
Active Windows Application
```

There should be no requirement for an Internet connection after the devices have paired if they are on the same local network.

---

# 4. Recommended Platforms

## Phase 1

### Windows
Recommended stack:

- C#
- .NET
- Windows UI Automation
- Win32 APIs where necessary
- WPF or WinUI for the small desktop UI
- System tray integration

### Android
Recommended stack:

- Kotlin
- Jetpack Compose
- Foreground service where appropriate
- Overlay/floating widget support
- WebSocket or equivalent persistent socket connection
- Android Keystore for local credentials

Android should be the first mobile platform because the full floating/persistent experience is considerably more practical than on iOS.

---

# 5. Main Operating Modes

## 5.1 AUTO MODE

This is the normal Windows companion mode.

When the user focuses an editable field on Windows:

```text
User clicks text field
        ↓
Windows detects focused editable control
        ↓
Windows companion verifies that input is appropriate
        ↓
PC sends "INPUT_FOCUSED" event to phone
        ↓
Phone reacts according to user's keyboard behavior setting
```

Examples:

- Browser search bars
- Messaging applications
- File rename fields
- Windows Search
- Microsoft Word
- Standard form fields
- Text boxes
- Application search fields
- Supported editable UI controls

When the user leaves the editable field, the Windows companion can send:

```text
INPUT_BLURRED
```

The phone can then collapse the keyboard if the user has enabled auto-collapse.

---

# 6. Phone Keyboard Behavior Options

The user should be able to choose how aggressively the phone reacts.

## Option A — Auto Expand

When a supported Windows text field receives focus:

- Remote keyboard expands automatically.
- User can immediately type.
- Keyboard collapses when input focus leaves the field.

## Option B — Notify Only

When a Windows input becomes active:

- Floating keyboard control pulses, highlights, or displays a small visual indicator.
- User taps it to open the keyboard.

This may be the best default because it avoids unexpected interruptions.

## Option C — Never Auto Expand

- No automatic opening.
- Keyboard remains manually accessible through the floating control.

## Option D — FL Studio Pinned

- Keyboard/control interface stays active.
- Does not collapse when laptop focus changes.
- Remains active until the user exits FL Studio mode.

---

# 7. Floating Phone Control

The phone should not be locked inside the RemoteDeck app.

When RemoteDeck is connected but collapsed, show a small floating control:

```text
╭────╮
│ ⌨ │
╰────╯
```

The user can continue using:

- WhatsApp
- Chrome
- YouTube
- Spotify
- Social apps
- Any other phone application

The RemoteDeck floating control stays accessible.

Tapping it opens the keyboard.

Suggested gestures:

- Tap: open keyboard
- Drag: reposition floating control
- Swipe down: collapse keyboard
- Long press: quick mode menu
- Double tap: switch to last RemoteDeck page

The floating control should remember its preferred screen position.

---

# 8. FL Studio Mode

FL Studio requires different behavior from general text-entry mode.

When the user selects:

```text
MODE → FL STUDIO
```

RemoteDeck becomes a persistent workstation surface.

It should stay available until the user manually leaves FL Studio mode.

The Windows companion should also detect whether FL Studio is the foreground application and display that state on the phone.

Example header:

```text
FL STUDIO                       ●

Connected • MICHAEL-PC
```

---

# 9. FL Studio Keyboard Page

The first FL Studio page can expose a keyboard optimized for workstation use.

Example:

```text
┌───────────────────────────────────────┐
│ FL STUDIO                         ●   │
│ Connected • MICHAEL-PC                │
├───────────────────────────────────────┤
│                                       │
│ Q  W  E  R  T  Y  U  I  O  P         │
│                                       │
│  A  S  D  F  G  H  J  K  L           │
│                                       │
│    Z  X  C  V  B  N  M                │
│                                       │
│ CTRL     ALT      SPACE       ENTER   │
├───────────────────────────────────────┤
│ Keyboard │ Shortcuts │ Commands │ +   │
└───────────────────────────────────────┘
```

The keyboard should support:

- Shift
- Ctrl
- Alt
- Windows modifier if desired
- Enter
- Escape
- Backspace
- Delete
- Tab
- Arrow keys
- Function keys
- Key combinations

---

# 10. FL Studio Shortcut Deck

A second page should behave like a customizable Stream Deck.

Example:

```text
┌────────────┬────────────┬────────────┐
│    SAVE    │    UNDO    │    REDO    │
├────────────┼────────────┼────────────┤
│   MIXER    │ PLAYLIST   │ PIANO ROLL │
├────────────┼────────────┼────────────┤
│  CHANNEL   │  BROWSER   │   RECORD   │
├────────────┼────────────┼────────────┤
│    PLAY    │    STOP    │    LOOP    │
└────────────┴────────────┴────────────┘
```

Important:

**Do not hard-code the entire FL Studio experience around one FL Studio version.**

Instead, every shortcut tile should be configurable.

A tile should support:

- Label
- Icon
- Key
- Modifier combination
- Key sequence
- Macro
- Optional category
- Optional long-press behavior

Example:

```json
{
  "label": "Mixer",
  "actionType": "keyCombination",
  "keys": ["F9"]
}
```

Another example:

```json
{
  "label": "Save",
  "actionType": "keyCombination",
  "keys": ["CTRL", "S"]
}
```

---

# 11. Custom Workstation Profiles

The architecture should not be FL Studio-only.

Eventually support profiles such as:

- FL Studio
- Photoshop
- Chrome
- Windows
- File Explorer
- Premiere Pro
- After Effects
- Illustrator
- VS Code
- Custom profile

Each profile can define:

- Keyboard layout
- Shortcut pages
- Macros
- Trackpad behavior
- Numpad
- Clipboard controls
- App-specific actions

---

# 12. Windows Focus Detection

The Windows companion should monitor keyboard focus.

Recommended approach:

- Windows UI Automation
- FocusChanged events
- Inspect focused UI element
- Determine whether the element is editable
- Determine foreground process
- Apply exclusions and heuristics

Pseudo-flow:

```text
OnFocusChanged(element):
    app = GetForegroundProcess()

    if app is ignored:
        return

    if IsEditable(element):
        SendEventToPhone({
            type: "INPUT_FOCUSED",
            app: app.name,
            fieldType: DetectFieldType(element)
        })
    else:
        SendEventToPhone({
            type: "INPUT_BLURRED"
        })
```

The app should avoid triggering for:

- Non-editable buttons
- List items
- Menus
- Links
- Password/system fields when disabled by policy
- Unsupported secure environments

---

# 13. Active Application Detection

The Windows companion should continually know the active application.

Example:

```text
chrome.exe
FL64.exe
Photoshop.exe
explorer.exe
Code.exe
```

This provides context to the phone.

For example:

```text
Foreground app = FL Studio
↓
Phone automatically surfaces FL Studio profile
```

This behavior should be configurable.

Possible setting:

```text
Auto-switch profiles based on active Windows app
ON / OFF
```

---

# 14. Input Injection on Windows

The Windows application receives key events from the phone.

Example message:

```json
{
  "type": "KEY_DOWN",
  "key": "A"
}
```

Then:

```json
{
  "type": "KEY_UP",
  "key": "A"
}
```

The Windows companion converts those events into Windows keyboard input.

Likely implementation:

- Win32 `SendInput`
- Appropriate virtual-key / scan-code handling
- Unicode text injection for normal text
- Physical-style key events for shortcuts

Two input paths are recommended:

## Text Input Path

For typing ordinary characters:

```text
Phone string
↓
Unicode text message
↓
Windows companion
↓
Unicode input injection
```

This avoids depending exclusively on keyboard layout mapping.

## Shortcut Input Path

For commands:

```text
CTRL + SHIFT + S
```

Send explicit key-down and key-up events.

Example:

```text
CTRL down
SHIFT down
S down
S up
SHIFT up
CTRL up
```

---

# 15. Event Protocol

Use a lightweight structured protocol.

JSON is acceptable for the first version.

Examples:

## Device Connection

```json
{
  "type": "HELLO",
  "deviceId": "phone-123",
  "deviceName": "Michael Phone"
}
```

## Input Focused

```json
{
  "type": "INPUT_FOCUSED",
  "app": "chrome.exe",
  "fieldType": "text"
}
```

## Input Closed

```json
{
  "type": "INPUT_BLURRED"
}
```

## Text

```json
{
  "type": "TEXT",
  "value": "Hello world"
}
```

## Key

```json
{
  "type": "KEY",
  "key": "ENTER"
}
```

## Shortcut

```json
{
  "type": "SHORTCUT",
  "keys": ["CTRL", "S"]
}
```

## Mode

```json
{
  "type": "MODE_CHANGE",
  "mode": "FL_STUDIO"
}
```

---

# 16. Network Connection

Primary transport:

**Local Wi-Fi / LAN**

Architecture:

```text
PHONE
   │
   │ Wi-Fi
   ▼
ROUTER / LOCAL NETWORK
   │
   │ LAN / Wi-Fi
   ▼
WINDOWS LAPTOP
```

Internet access should not be required.

Possible technologies:

- WebSocket over TLS
- Secure TCP socket
- QUIC later if needed

For an MVP, WebSocket is practical because it supports:

- Persistent connection
- Bidirectional communication
- Simple event protocol
- Easy debugging
- Fast enough latency for remote typing

---

# 17. Device Discovery

The phone should not require manually entering the laptop IP every time.

Possible discovery mechanisms:

- mDNS
- Local UDP discovery broadcast
- QR pairing containing host details
- Saved local host identity

Recommended flow:

1. Windows companion starts local service.
2. Windows companion generates QR code.
3. User opens RemoteDeck on phone.
4. User selects **Pair New Computer**.
5. Phone scans QR.
6. QR contains:
   - computer ID
   - host/IP information
   - port
   - pairing token / public key info
7. Phone contacts laptop.
8. Laptop asks user to approve device.
9. Shared trust is established.
10. Credentials are stored securely.
11. Future reconnections are automatic.

---

# 18. Security Model

RemoteDeck effectively creates a remote input device, so security must be treated seriously.

Requirements:

- Only paired devices can inject input.
- Pairing should require physical interaction.
- Connection must be encrypted.
- Keys/tokens must be stored securely.
- No keyboard data should be sent to a cloud service.
- Disconnect control must always be available.
- The Windows tray icon should visibly show whether a phone is connected.
- The phone should show which PC it is controlling.

Example phone state:

```text
Connected to MICHAEL-PC
Encrypted
Local network
```

Example Windows tray state:

```text
RemoteDeck
● Michael Phone connected
```

---

# 19. Secure and Password Fields

Password inputs need special rules.

Default recommended behavior:

```text
Remote typing into password fields = OFF
```

The user can optionally enable it.

Possible settings:

```text
Allow password-field typing
[ OFF ]

Allow on trusted apps only
[ ON ]
```

Sensitive typing should never be logged.

The Windows companion must not create keyboard history.

---

# 20. Android App Architecture

Suggested module structure:

```text
RemoteDeck Android
│
├── ui/
│   ├── keyboard/
│   ├── shortcuts/
│   ├── trackpad/
│   ├── numpad/
│   ├── pairing/
│   └── settings/
│
├── connection/
│   ├── ConnectionService
│   ├── WebSocketClient
│   ├── DiscoveryService
│   └── PairingManager
│
├── overlay/
│   ├── FloatingKeyboardBubble
│   └── OverlayController
│
├── input/
│   ├── KeyboardController
│   ├── ShortcutController
│   └── MacroController
│
├── profiles/
│   ├── ProfileRepository
│   └── AppProfile
│
└── security/
    ├── CredentialStore
    └── EncryptionManager
```

---

# 21. Windows Companion Architecture

Suggested structure:

```text
RemoteDeck.Windows
│
├── AppDetection/
│   ├── ForegroundAppMonitor
│   └── ProcessResolver
│
├── FocusDetection/
│   ├── UIAutomationMonitor
│   └── EditableFieldDetector
│
├── Input/
│   ├── TextInjector
│   ├── KeyInjector
│   └── ShortcutExecutor
│
├── Network/
│   ├── WebSocketServer
│   ├── DiscoveryService
│   └── ConnectionManager
│
├── Pairing/
│   ├── PairingManager
│   ├── QRGenerator
│   └── TrustedDevicesStore
│
├── Security/
│   ├── CertificateManager
│   └── CredentialStore
│
├── Profiles/
│   ├── ProfileManager
│   └── AppMappings
│
└── UI/
    ├── TrayApplication
    ├── PairDeviceWindow
    └── SettingsWindow
```

---

# 22. Windows Tray Application

The Windows app should mostly stay out of the way.

System tray menu:

```text
RemoteDeck

● Michael Phone — Connected

Pair New Device
Devices
Profiles
Settings
Pause Remote Input

Open RemoteDeck
Exit
```

The app should launch automatically with Windows if the user enables:

```text
Start RemoteDeck with Windows
```

---

# 23. Suggested Android Navigation

Main navigation:

```text
Keyboard
Shortcuts
Trackpad
Profiles
Settings
```

When FL Studio mode is active:

```text
Keyboard
Shortcuts
Commands
Mixer
+
```

The interface should remain minimal and responsive.

Avoid unnecessary UI chrome.

---

# 24. Additional Natural Features

Because the connection layer already exists, several additional features become straightforward extensions.

## 24.1 Trackpad

Phone touchscreen becomes laptop trackpad.

Gestures:

- One finger move = pointer
- Tap = click
- Two-finger drag = scroll
- Two-finger tap = right click
- Long press = drag

## 24.2 Numpad

Dedicated number-pad view.

Useful for:

- Numeric entry
- Finance
- Excel
- FL Studio
- Editing tools

## 24.3 Clipboard

Two-way clipboard transfer.

Examples:

```text
Copy text on phone
→ Send to laptop clipboard
```

and:

```text
Copy text on laptop
→ Open on phone
```

Clipboard sync should be opt-in.

## 24.4 Macros

One RemoteDeck button can execute multiple inputs.

Example:

```text
CTRL + SHIFT + S
wait 100 ms
type filename
ENTER
```

Macros should support:

- key combinations
- delays
- text
- sequences

## 24.5 Application Profiles

RemoteDeck automatically changes based on active Windows app.

Example:

```text
FL Studio active
→ FL Studio deck

Photoshop active
→ Photoshop deck

Chrome active
→ General keyboard
```

---

# 25. FL Studio Advanced Possibilities

The first FL Studio version should use standard keyboard shortcuts.

Later versions could potentially support:

- MIDI messages
- MIDI-over-network
- Transport controls
- Velocity pads
- Knobs/sliders
- Playlist navigation
- Mixer navigation
- Custom macro pages

Do not make MIDI integration a requirement for MVP.

Start with reliable keyboard/shortcut functionality.

---

# 26. UX Rules

The system must feel invisible when not needed.

Rules:

1. Never unexpectedly cover the entire phone screen unless the user explicitly enabled auto-expand.
2. Always provide a fast collapse gesture.
3. Keep the floating bubble small.
4. Never steal phone focus unnecessarily.
5. Maintain the PC connection in the background where Android permits.
6. Reconnect automatically.
7. Show connection failures clearly.
8. Avoid modal dialogs during normal typing.
9. Make FL Studio mode persistent.
10. Remember the user's last selected mode.
11. Allow immediate manual disconnect.
12. The remote keyboard should respond instantly to touch.
13. Do not include advertising or cloud dependencies in the core input loop.

---

# 27. Connection States

Use clear states.

```text
Disconnected
Searching
Connecting
Pairing
Connected
Reconnecting
Connection Error
```

Phone header example:

```text
● Connected
MICHAEL-PC
```

Failure:

```text
○ Reconnecting to MICHAEL-PC
```

---

# 28. Latency Goals

Typing should feel immediate.

Target:

```text
Phone touch
→ network
→ Windows injection
```

Ideally under approximately 50 ms on a healthy local network.

The implementation should:

- maintain a persistent connection
- avoid reconnecting per keypress
- avoid HTTP request-per-key
- batch normal text where appropriate
- keep shortcut events ordered

---

# 29. Reliability Requirements

The application needs to handle:

- Laptop sleep/wake
- Phone screen lock/unlock
- Wi-Fi changes
- Windows network changes
- Router reconnect
- App restart
- Phone app being backgrounded
- Windows companion crash/restart
- FL Studio closing unexpectedly

Expected behavior:

```text
Connection lost
↓
Phone enters reconnecting state
↓
Windows becomes reachable
↓
Trust credentials reused
↓
Connection resumes automatically
```

---

# 30. Important Technical Edge Cases

The agent should account for:

- Different Windows keyboard layouts
- Unicode characters
- Caps Lock state
- Shift behavior
- Modifier keys becoming stuck
- Repeated keys
- Long press
- Backspace repeat
- Network packet ordering
- Duplicate messages
- Connection loss during modifier combination
- Windows admin/elevated applications
- UAC screens
- Secure desktop
- Password fields
- Games or apps using raw input
- FL Studio intercepting shortcuts differently depending on focused panel
- Non-standard UI controls not exposing editability through UI Automation

Always release held modifier keys when a connection is lost.

---

# 31. MVP Scope

The first working release should focus only on the essential concept.

## Windows MVP

- System tray application
- Local WebSocket server
- QR pairing
- Focus detection
- Foreground app detection
- Text injection
- Shortcut injection
- Trusted-device storage
- Auto-start setting

## Android MVP

- Pairing screen
- Connection management
- Standard keyboard
- Floating bubble
- Manual show/hide
- Auto keyboard event handling
- FL Studio mode
- FL Studio shortcut page
- Connection status
- Settings

Do not add every advanced feature before the keyboard connection is reliable.

---

# 32. Recommended Build Order

## Phase 1 — Connection Prototype

Goal:

```text
Phone button → Windows types "A"
```

Tasks:

1. Build Windows WebSocket server.
2. Build Android WebSocket client.
3. Connect over LAN.
4. Send simple JSON command.
5. Inject one key into Windows.
6. Test latency.

---

## Phase 2 — Full Keyboard

Goal:

```text
Phone keyboard → Windows application
```

Implement:

- letters
- numbers
- punctuation
- space
- enter
- backspace
- shift
- ctrl
- alt
- arrow keys
- tab
- escape
- Unicode text

---

## Phase 3 — Pairing and Security

Implement:

- QR pairing
- trusted device identity
- encryption
- approval screen
- secure token storage
- revoke device

---

## Phase 4 — Windows Input Detection

Implement:

- UI Automation focus listener
- editable-field detection
- INPUT_FOCUSED
- INPUT_BLURRED
- app detection
- exclusions

---

## Phase 5 — Android Floating Experience

Implement:

- overlay bubble
- keyboard panel
- collapse gestures
- auto-expand
- notify-only mode
- never-auto-expand mode

---

## Phase 6 — FL Studio Mode

Implement:

- persistent mode
- FL Studio detection
- shortcut grid
- configurable shortcuts
- profile persistence
- active-app feedback

---

## Phase 7 — Profiles

Add:

- custom profiles
- application mapping
- automatic switching
- custom layout editor

---

## Phase 8 — Extended Controls

Add:

- trackpad
- numpad
- clipboard
- macro engine
- custom icons
- workstation layouts

---

# 33. Suggested Project Structure

Repository:

```text
RemoteDeck/
│
├── windows/
│   ├── RemoteDeck.Windows.sln
│   └── src/
│
├── android/
│   ├── app/
│   └── gradle/
│
├── protocol/
│   ├── protocol.md
│   └── schemas/
│
├── docs/
│   ├── architecture.md
│   ├── security.md
│   └── pairing.md
│
└── README.md
```

Keep the protocol documentation shared between both applications.

---

# 34. Suggested Shared Protocol Envelope

Every message can use:

```json
{
  "version": 1,
  "id": "unique-message-id",
  "type": "KEY",
  "timestamp": 1786540000000,
  "payload": {}
}
```

This leaves room for future protocol changes.

Possible message types:

```text
HELLO
AUTH
PING
PONG

INPUT_FOCUSED
INPUT_BLURRED

TEXT
KEY_DOWN
KEY_UP
SHORTCUT

MODE_CHANGE
PROFILE_CHANGE

CLIPBOARD
TRACKPAD_MOVE
TRACKPAD_CLICK
SCROLL

STATE_REQUEST
STATE_RESPONSE

DISCONNECT
ERROR
```

---

# 35. Heartbeat

Use a heartbeat so each device knows the other is alive.

Example:

```text
PC → PING
Phone → PONG
```

If several heartbeats fail:

```text
Connected
→ Reconnecting
```

Do not immediately discard pairing credentials.

---

# 36. Profile Data Model

Example:

```json
{
  "id": "fl-studio-default",
  "name": "FL Studio",
  "processes": [
    "FL64.exe"
  ],
  "persistent": true,
  "pages": [
    {
      "id": "keyboard",
      "type": "keyboard"
    },
    {
      "id": "shortcuts",
      "type": "shortcutGrid"
    }
  ]
}
```

Shortcut:

```json
{
  "id": "save",
  "label": "Save",
  "action": {
    "type": "shortcut",
    "keys": ["CTRL", "S"]
  }
}
```

---

# 37. Settings

Suggested Android settings:

```text
Connection

Preferred PC
Auto reconnect
Keep connection alive

Keyboard

Auto expand
Notify only
Auto collapse
Haptic feedback
Key repeat
Sound

Floating Control

Enabled
Size
Opacity
Default position

Profiles

Auto switch based on PC app
Default profile

Security

Allow password-field typing
Trusted computers
Forget computer
```

Windows settings:

```text
Start with Windows
Allow remote input
Local network only
Pair new device
Trusted devices
Automatically detect text inputs
Auto-switch phone profile
Run minimized
```

---

# 38. Visual Direction

The UI should be:

- Minimal
- Clean
- Fast
- Low distraction
- High contrast
- Large touch targets
- Consistent spacing
- No unnecessary gradients
- No oversized cards
- No clutter
- Professional workstation feel

The keyboard itself should prioritize usability over decorative styling.

The FL Studio deck can use a darker workstation-style UI while keeping the system visually restrained.

---

# 39. Android/iOS Product Decision

The full concept should launch as:

```text
Android + Windows
```

first.

An iOS version may be explored later, but it should not block the Android implementation.

The iPhone version is likely to require a different interaction model because iOS does not provide Android-style arbitrary persistent overlays over other applications.

---

# 40. Acceptance Criteria for First Usable Build

The first usable build is successful when all of the following work:

- [ ] Windows companion installs and launches.
- [ ] Android application installs.
- [ ] Phone can pair with laptop using QR code.
- [ ] Devices reconnect automatically.
- [ ] Phone can send normal text to Notepad.
- [ ] Enter, Backspace, Tab, and arrows work.
- [ ] Ctrl-based shortcuts work.
- [ ] Windows companion detects a standard editable field.
- [ ] Phone is informed when input focus starts.
- [ ] Phone can automatically show or notify according to setting.
- [ ] Phone keyboard collapses correctly.
- [ ] Floating bubble works while other Android apps are open.
- [ ] FL Studio mode can be manually selected.
- [ ] FL Studio mode remains persistent.
- [ ] Shortcut buttons can send FL Studio shortcuts.
- [ ] Shortcut mappings can be edited.
- [ ] Disconnect instantly prevents remote input.
- [ ] No cloud service is required on the same LAN.
- [ ] Connection is encrypted.
- [ ] No typed text is logged to disk.
- [ ] Modifiers never remain stuck after disconnect.

---

# 41. MVP Test Cases

## Text Input

1. Open Notepad.
2. Click document.
3. Phone receives input-focused state.
4. Open RemoteDeck keyboard.
5. Type:
   `RemoteDeck test 123`
6. Text appears correctly.

## Browser

1. Open Chrome.
2. Click address bar.
3. Remote keyboard becomes available.
4. Type a URL/search.
5. Press Enter.

## File Rename

1. Select a Windows file.
2. Press rename.
3. Type name on phone.
4. Press Enter.

## FL Studio

1. Launch FL Studio.
2. Set RemoteDeck to FL Studio mode.
3. Switch between FL Studio windows.
4. Phone interface remains active.
5. Press shortcut buttons.
6. Verify commands execute correctly.
7. Switch to another phone application.
8. Floating RemoteDeck control remains available.
9. Return immediately to FL Studio controls.

## Reconnection

1. Disconnect Wi-Fi.
2. Restore Wi-Fi.
3. App reconnects automatically.
4. No re-pairing required.

---

# 42. Product Expansion Roadmap

Once the keyboard foundation is solid:

## Version 1.1

- Trackpad
- Numpad
- Clipboard transfer

## Version 1.2

- Macro editor
- More profile customization
- Profile import/export

## Version 1.3

- Photoshop profile
- Premiere profile
- VS Code profile

## Version 2

- MIDI support
- FL Studio performance controls
- Knobs
- Sliders
- Touch pads
- Advanced automation

---

# 43. Key Design Principle

RemoteDeck must not feel like:

> "an app I constantly need to open."

It should feel like:

> "an extension of my laptop that happens to live on my phone."

The Windows companion handles context.

The phone reacts intelligently.

The user retains control over when the keyboard appears.

FL Studio mode remains persistent because music-production workflows require a different interaction model from normal typing.

---

# 44. Final Recommended Product Definition

**Product Name:** RemoteDeck

**Primary Platforms:**

- Windows
- Android

**Primary Functions:**

1. Intelligent Windows remote keyboard
2. Automatic laptop input detection
3. Floating Android keyboard access
4. FL Studio persistent workstation mode
5. Custom shortcut deck
6. Application profiles

**Secondary Functions:**

- Trackpad
- Numpad
- Macros
- Clipboard sharing
- Custom workstation controls

**Connection:**

- Local Wi-Fi / LAN first
- Encrypted persistent connection
- QR pairing
- No cloud dependency for normal operation

**Primary Development Priority:**

Reliability and latency of remote typing must be completed before advanced workstation features.

---

# 45. Instructions to the Implementation Agent

Build this incrementally.

Do not begin by creating the final polished UI.

First prove the core technical loop:

```text
Android phone
→ local network
→ Windows companion
→ key injection
→ active Windows application
```

Then prove:

```text
Windows focus event
→ local network
→ Android phone
→ keyboard availability
```

After those two directions are reliable, implement pairing, security, floating Android behavior, and FL Studio mode.

Keep the Windows application lightweight and tray-based.

Keep the Android application usable while other phone applications are active.

Treat RemoteDeck as a local, low-latency workstation companion rather than a cloud application.

Do not introduce cloud dependencies into the keyboard input loop.

Do not hard-code FL Studio shortcuts in a way that prevents future customization.

Design the shared communication protocol so additional controls such as trackpad, clipboard, MIDI, macros, and workstation profiles can be added without redesigning the core transport layer.
