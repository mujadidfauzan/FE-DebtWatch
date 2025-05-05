/**
 * DebtWatch Launch Screen JavaScript
 *
 * Compiled from TypeScript for browser compatibility.
 */

// Initialize the app with default data
const initLaunchScreen = () => {
  const data = {
    currentTime: getCurrentTime(),
    appName: "DebtWatch",
  };

  updateTimeDisplay(data.currentTime);
};

// Get current time in HH:MM format
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Update the time display element
const updateTimeDisplay = (time) => {
  const timeElement = document.querySelector("time");
  if (timeElement) {
    timeElement.textContent = time;
  }
};

// Update time every minute
const startTimeUpdater = () => {
  setInterval(() => {
    updateTimeDisplay(getCurrentTime());
  }, 60000); // Update every minute
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initLaunchScreen();
  startTimeUpdater();
});
