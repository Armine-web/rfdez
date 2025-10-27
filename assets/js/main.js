//updatae ofline vs online
function updateStatus() {
    const statusIndicator = document.getElementById('status-indicator');
  
    if (navigator.onLine) {
      statusIndicator.classList.remove('offline');
      statusIndicator.classList.add('online');
    } else {
      statusIndicator.classList.remove('online');
      statusIndicator.classList.add('offline');
    }
  }
  
  updateStatus();
  
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);