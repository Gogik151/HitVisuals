(() => {
  const shaEl = document.getElementById("sha");
  if (!shaEl) return;

  shaEl.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(shaEl.textContent || "");
      shaEl.style.color = "rgba(0, 255, 168, 0.95)";
      setTimeout(() => {
        shaEl.style.color = "rgba(234, 245, 255, 0.85)";
      }, 800);
    } catch {
      // clipboard may be blocked; ignore
    }
  });
})();

