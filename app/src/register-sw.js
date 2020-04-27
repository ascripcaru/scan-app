export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('../service-worker.js').then(function (worker) {
      });
    });
  }
}
