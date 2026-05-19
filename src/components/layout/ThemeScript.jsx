export default function ThemeScript() {
  const script = `
    (function () {
      try {
        var stored = localStorage.getItem("mediqueue-theme");
        var dark =
          stored === "dark" ||
          (stored !== "light" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);
        if (dark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
