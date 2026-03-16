(() => {
  const shaEl = document.getElementById("sha");
  const copyShaBtn = document.getElementById("copyShaBtn");
  const copyModsPathBtn = document.getElementById("copyModsPathBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  const shaText = shaEl?.textContent?.trim() || "";
  const fileName = downloadBtn?.getAttribute("data-file") || "";

  function setTemporaryText(button, text) {
    const prev = button.textContent;
    button.textContent = text;
    button.disabled = true;
    setTimeout(() => {
      button.textContent = prev;
      button.disabled = false;
    }, 900);
  }

  async function copyText(text) {
    if (!text) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  if (shaEl) {
    shaEl.style.cursor = "pointer";
    shaEl.title = "Нажми, чтобы скопировать";
    shaEl.addEventListener("click", async () => {
      const ok = await copyText(shaText);
      if (ok) {
        shaEl.style.color = "rgba(0, 255, 194, 0.95)";
        setTimeout(() => {
          shaEl.style.color = "";
        }, 800);
      }
    });
  }

  if (copyShaBtn) {
    copyShaBtn.addEventListener("click", async () => {
      const ok = await copyText(shaText);
      setTemporaryText(copyShaBtn, ok ? "Скопировано" : "Не удалось");
    });
  }

  if (copyModsPathBtn) {
    copyModsPathBtn.addEventListener("click", async () => {
      // Can't know the user's path from a static site; provide a helpful default.
      const ok = await copyText("mods");
      setTemporaryText(copyModsPathBtn, ok ? "Скопировано: mods" : "Не удалось");
    });
  }

  if (downloadBtn && fileName) {
    downloadBtn.setAttribute("aria-label", `Скачать ${fileName}`);
  }
})();

