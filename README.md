# 🎥 Screen Share Test App

A modern React application that tests browser screen sharing capabilities using the Web Media API (`navigator.mediaDevices.getDisplayMedia`).

---

## 🔗 Submission Links

### 📁 Public GitHub Repository
https://github.com/Rajan9115/Screen_Sharing_Test_App

### 🌐 Live Deployment (Vercel)
https://your-app-name.vercel.app](https://screen-sharing-test-app-zeta.vercel.app

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rajan9115/Screen_Sharing_Test_App.git
cd Screen_Sharing_Test_App
```
### 2️⃣ Install Dependencies

```
npm install
```
### 3️⃣ Run Development Server
```
npm run dev
```
- App will run at
  ```
  http://localhost:5173
  ```

  ## 🧠 Explanation of Screen-Sharing Flow

### 1. Browser Support Check
Before starting screen sharing, the app verifies:

```js
navigator.mediaDevices?.getDisplayMedia
```
If unsupported:

The user is redirected to ``` /unsupported.```
- A clear browser-unsupported message is displayed
- The screen-sharing process does not continue

---

### 2. User Initiates Screen Share
When the user clicks Start Screen Test:
```
navigator.mediaDevices.getDisplayMedia({
  video: { frameRate: { ideal: 30 } },
  audio: false,
});
```
The browser displays a native screen selection popup

The user can choose:

- Entire screen
- A specific window
- A browser tab

The application status changes to:

requesting

---

### 3. Permission Handling

The app handles all possible permission outcomes and updates status accordingly.

Possible states : Status	Meaning
```
idle - No action taken yet
requesting -	Waiting for user selection
granted	- Screen successfully shared
denied - User denied permission
cancelled	- User closed picker without selecting
ended	- User stopped sharing manually
error	- Unexpected failure occurred
```
If permission is granted, the status becomes:

```granted```

If permission is denied or cancelled, the UI updates accordingly without crashing.

---

### 4. Stream Handling

Once permission is granted:

```
const mediaStream = await navigator.mediaDevices.getDisplayMedia(...);
const track = mediaStream.getVideoTracks()[0];
track.getSettings();
```
- Metadata (width, height, frame rate, display surface) is collected
- The stream is shown in the video element:
```
videoRef.current.srcObject = mediaStream;
await videoRef.current.play();
```
```track.onended``` detects if the user stops sharing from browser controls

---

### 5. Cleanup

Cleanup occurs when:

User clicks Stop Sharing
OR user stops sharing from the browser UI

The app then:
```
stream.getTracks().forEach(track => track.stop());
```
- Stops all active tracks
- Updates status to ended
- Clears stream references
- Prevents memory leaks
- Resets the UI safely

---

## 🖼️ Screenshots

###  Home Page
<p align="center">
<img width="700" alt="Screenshot 2026-02-21 135635" src="https://github.com/user-attachments/assets/d9462aa4-77d6-496a-b10d-5510a344ac25" />
</p>

### Unsupported page
<p align="center">
  <img width="700"  alt="Screenshot 2026-02-21 135709" src="https://github.com/user-attachments/assets/b0aa991e-6bce-4848-b3be-4895138e9831" />
</p>

### Display type
<p align="center">
  <img width="1914" height="960" alt="Screenshot 2026-02-21 135732" src="https://github.com/user-attachments/assets/62d701c1-3431-47bc-a6fc-1cea1e7c43af" />
</p>

### Active screen sharing
<p align="center">
  <img width="1910" height="1074" alt="Screenshot 2026-02-21 135842" src="https://github.com/user-attachments/assets/decc6aec-ee7a-4e57-9a1c-1f1599410741" />

</p>




## ⚠️ Known Limitations & Browser Quirks

### 1️⃣ HTTPS Requirement

Screen sharing works only in secure contexts:

- HTTPS (production)
- `localhost` (development)

It will not work on non-secure HTTP domains.

---

### 2️⃣ Mobile Browser Limitations

- Many mobile browsers have limited or no support.
- iOS Safari does not fully support `getDisplayMedia`.
- Some mobile devices only allow full-screen capture (no tab selection).

---

### 3️⃣ Browser Differences

- Chrome and Edge provide full support (tab, window, screen).
- Firefox may expose slightly different metadata.
- Some browsers may not provide `displaySurface` in track settings.

---

### 4️⃣ User-Controlled Termination

If the user stops sharing from the browser’s native UI:

- `track.onended` is triggered
- The app updates status to `ended`
- The stream preview stops automatically




