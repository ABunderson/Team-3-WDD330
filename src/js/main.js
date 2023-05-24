
import { loadHeaderFooter } from './utils.mjs';
import Alert from './alert.js';

loadHeaderFooter();
const alertInstance = new Alert();
alertInstance.fetchAlertsData().then(() => alertInstance.createAlertElements());
