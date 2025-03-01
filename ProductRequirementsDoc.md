**Product Requirements Document (PRD)**

### 1. Overview and Purpose
A single-page React (TypeScript, Vite) application that tests a user’s reaction time for a sequence of 10 distinct placeholder images. When the user starts, images appear after a random delay (1–10 seconds). The user presses the **Up** or **Down** arrow key, which the system records. Results are stored in **localStorage** and React state for persistence and are exported as CSV at the end.

### 2. Core User Flow
1. **Initial Screen**  
   - A **Start** button is centered on the page.  
   - A black cross (“+”) is displayed in the center of the screen (focus area where images will appear).
2. **Begin Test**  
   - The user clicks **Start**.  
   - The first trial begins immediately (no countdown).
3. **Random Delay & Image**  
   - After a random delay between 1–10 seconds, one of 10 placeholder images appears in place of the black cross.  
   - The system ignores arrow key presses until the image is displayed.
4. **Recording Data**  
   - When the user presses **Up** or **Down**, the system calculates reaction time (difference between image render and key press) in seconds.  
   - The following data is stored in both React state and localStorage:  
     - The image identifier (or filename).  
     - The arrow pressed (Up / Down).  
     - The reaction time (in seconds).
5. **Repeating Trials**  
   - After each trial, the black cross reappears.  
   - The next image (no repeats) is shown after 1–10 seconds.  
   - This continues until all 10 images are shown in random order.
6. **Completion**  
   - After the final (10th) image, a **“Thank you!”** message appears.
   - The user sees an **Export** button.
7. **Exporting & Reset**  
   - On **Export**, a CSV is generated with columns: `image, arrowPress, reactionTime`.  
   - After a successful export, localStorage and React state are cleared, and the application resets to its initial state.

### 3. Detailed Requirements

#### 3.1 Data Management
- **LocalStorage Key**: e.g., `"reactionTestResults"`.
- **React State**: Mirrors the stored data for quick re-renders and UI control.
- **Persistence**: If the user refreshes the page mid-sequence, partial results remain. (Exact behavior can be defined as needed—either resume or restart.)

#### 3.2 Image Pool & Randomization
- **Image Pool**: 10 placeholder images with unique IDs or filenames.
- **Order**: Shuffle the 10 images once when the user clicks **Start** to define the display order.

#### 3.3 Timing
- **Random Delay**: 1–10 seconds between the black cross and the image’s appearance.
- **Reaction Time**: `(arrowPressTimestamp - imageRenderTimestamp) / 1000` (seconds).

#### 3.4 UI/UX
1. **Start Button**  
   - Centered on initial load.
2. **Black Cross**  
   - Always in the center except when replaced by the image.
3. **Image Render**  
   - Appears in the same position as the black cross after the delay.
4. **No On-Screen Reaction Times**  
   - The user does not see a live list or numeric display of reaction times.
5. **Thank You Message**  
   - Shown once all 10 trials are complete.
6. **Export Button**  
   - Generates a CSV on click.
   - Automatically resets application data (clears localStorage and state) upon success, returning the user to the initial state.

### 4. Technical Implementation Outline
1. **State Management**  
   - A top-level React component manages:
     - Current trial index.
     - Shuffled image array.
     - Reaction data (stored in state + localStorage).
2. **Event Handling**  
   - Global keydown listener to capture arrow presses (`ArrowUp`, `ArrowDown`).
   - Ignore presses unless an image is currently displayed.
3. **Random Delay**  
   - Use `setTimeout` to reveal each image after a random (1–10s) interval.
4. **Storing Results**  
   - When the user presses an arrow, compute reaction time and store:
     - `image` (ID or filename)
     - `arrowPress` (Up or Down)
     - `reactionTime` (seconds)
   - Update localStorage + React state.
5. **Sequence Logic**  
   - Increment trial index after each response.
   - If it was the 10th image, display the thank you message and export button.
6. **Export & Reset**  
   - Convert stored data to CSV format (`image,arrowPress,reactionTime`).
   - Trigger download of CSV.
   - Clear localStorage and reset state so the user sees the initial screen again.

### 5. Acceptance Criteria
1. **Start** button initiates a random sequence of 10 unique images (no repeats).
2. Each image is displayed after a 1–10s delay, replacing the black cross.
3. Arrow presses before the image is displayed are ignored.
4. Reaction times are recorded accurately in both localStorage and React state.
5. No reaction time data is displayed in the UI during or after the trials.
6. After the 10th trial, a **Thank you** message and **Export** button are shown.
7. **Export** provides a CSV with `image, arrowPress, reactionTime (seconds)` and then clears the data and resets the app.