/**
 * DebtWatch Launch Screen TypeScript
 *
 * This file provides TypeScript support for the DebtWatch launch screen.
 */

// Define types for any data or props that might be needed
interface LaunchScreenData {
  currentTime: string;
  appName: string;
}

// Initialize the app with default data
const initLaunchScreen = (): void => {
  const data: LaunchScreenData = {
    currentTime: getCurrentTime(),
    appName: "DebtWatch",
  };

  updateTimeDisplay(data.currentTime);
};

// Get current time in HH:MM format
const getCurrentTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Update the time display element
const updateTimeDisplay = (time: string): void => {
  const timeElement = document.querySelector("time");
  if (timeElement) {
    timeElement.textContent = time;
  }
};

// Update time every minute
const startTimeUpdater = (): void => {
  setInterval(() => {
    updateTimeDisplay(getCurrentTime());
  }, 60000); // Update every minute
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initLaunchScreen();
  startTimeUpdater();
});

// Export types for potential reuse
export type { LaunchScreenData };
