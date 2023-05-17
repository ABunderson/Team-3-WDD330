// Alert.js

class Alert {
  constructor() {
    this.alertsData = [];
  }

  async fetchAlertsData() {
    try {
      const response = await fetch('../json/alerts.json');
      if (response.ok) {
        this.alertsData = await response.json();
      }
    } catch (error) {
      this.alertsData = [];
    }
  }

  createAlertElements() {
    if (this.alertsData.length === 0) {
      return; // No alerts, exit early
    }

    const alertSection = document.createElement('section');
    alertSection.classList.add('alert-list');

    // Loop through each alert and create a <p> element with the specified CSS class for each
    this.alertsData.forEach((alert) => {
      const alertMessage = document.createElement('p');
      alertMessage.textContent = alert.message;
      alertMessage.style.backgroundColor = alert.background;
      alertMessage.style.color = alert.color;
      alertMessage.classList.add('alert-item'); // Add the CSS class to each alert element

      alertSection.appendChild(alertMessage);
    });

    // Prepend the alert section to the main element on the index page
    const mainElement = document.querySelector('main');
    mainElement.prepend(alertSection);
  }
}

export default Alert;
