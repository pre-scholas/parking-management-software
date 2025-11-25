// Utility to load Ionicons library globally
export const loadIonicons = () => {
  if (document.querySelector('script[src*="ionicons"]')) {
    return; // Already loaded
  }

  const script = document.createElement('script');
  script.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
  script.type = 'module';
  script.async = true;
  document.head.appendChild(script);
};

// Load Ionicons when this module is imported
loadIonicons();