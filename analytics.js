/* Analytics: set your GA4 Measurement ID below to enable (stays off until you do). */
(function () {
  var GA_ID = "G-XXXXXXXXXX"; // <-- replace with your GA4 ID from analytics.google.com
  if (!GA_ID || GA_ID.indexOf("XXXX") !== -1) return; // inert until configured
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", GA_ID);
})();
