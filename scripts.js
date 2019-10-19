// Cross-browser document ready function in vanilla JS
// https://www.competa.com/blog/cross-browser-document-ready-with-vanilla-javascript/#targetText=Cross%2Dbrowser%20Document%20Ready%20with%20Vanilla%20JavaScript&targetText=In%20jQuery%2C%20developers%20are%20used,stuff%20is%20on%20your%20page.
var domIsReady = (domIsReady => {
  const isBrowserIeOrNot = function() {
    return !document.attachEvent || typeof document.attachEvent === "undefined"
      ? "not-ie"
      : "ie";
  };

  domIsReady = callback => {
    if (callback && typeof callback === "function") {
      if (isBrowserIeOrNot() !== "ie") {
        document.addEventListener("DOMContentLoaded", () => {
          return callback();
        });
      } else {
        document.attachEvent("onreadystatechange", () => {
          if (document.readyState === "complete") {
            return callback();
          }
        });
      }
    } else {
      console.error("The callback is not a function!");
    }
  };

  return domIsReady;
})(domIsReady || {});

// DOM is ready.
((document, window, domIsReady, undefined) => {
  domIsReady(() => {
    // Scroll
    window.addEventListener("scroll", () => {
      const mainNav = document.querySelector("#main-nav");
      const header = document.querySelector("header");
      const headerClientRect = header.getBoundingClientRect();
      // Scrolling
      if (headerClientRect.bottom < window.innerHeight * 0.8) {
        mainNav.classList.add("scrolled");
      } else {
        mainNav.classList.remove("scrolled");
      }
    });

    // Desktop dropdown menu
    const navExpandButton = document.querySelector("#nav__js-expand-nav");
    let navIsExpanded = false;
    navExpandButton.addEventListener("click", () => {
      const navDropdownMenu = document.querySelector("#nav__dropdown-menu");
      navIsExpanded = !navIsExpanded;
      const dropdownDisplay = navIsExpanded ? "block" : "none";
      navDropdownMenu.style.display = dropdownDisplay;
    });
  });
})(document, window, domIsReady);
