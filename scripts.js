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
    const internalLinks = document.querySelectorAll(
      'a[href*="#"]:not([href="#"])'
    );
    internalLinks.forEach(link => {
      link.addEventListener("click", () => {
        internalLinks.forEach(individualLink => {
          individualLink.classList.remove("is-active");
        });
        const hash = link.getAttribute("href");
        const target = document.querySelector(hash);
        link.classList.add("is-active");
        // if (target) {
        //   // 	const containerTop = target.getBoundingClientRect().top;
        //   // 	const
        //   //   console.log(target.getBoundingClientRect());
        //   window.scrollTo({
        //     top: target.getBoundingClientRect().top,
        //     behavior: "smooth"
        //   });
        //   return false;
        // }
      });
    });
    if (location.hash && location.hash !== "#") {
      const mainNav = document.querySelector("#main-nav");
      mainNav.classList.add("scrolled");
    }

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

    // Open contact modal
    const navExpandContactButton = document.querySelector(
      ".nav__js-contact-menu"
    );
    const modalContainer = document.querySelector("#modal-container");
    navExpandContactButton.addEventListener("click", () => {
      const modalContact = document.querySelector("#modal__contact");

      modalContainer.style.bottom = 0;
      modalContainer.classList.add("is-open");
      modalContact.style.display = "flex";
    });

    // Mobile menu
    const mobileMenuButton = document.getElementById("nav__mobile-menu");
    mobileMenuButton.addEventListener("click", () => {
      const mobileMenu = document.getElementById("modal__mobile-nav");
      modalContainer.style.bottom = 0;
      modalContainer.classList.add("is-open");
      mobileMenu.style.display = "flex";
    });

    // Open social modal
    const navExpandSocialButton = document.querySelector(
      ".nav__js-social-menu"
    );
    navExpandSocialButton.addEventListener("click", () => {
      const modalSocial = document.querySelector("#modal__social");

      modalContainer.style.bottom = 0;
      modalContainer.classList.add("is-open");
      modalSocial.style.display = "flex";
    });

    // Close modal
    const modalCloseButton = document.getElementById("modal__close");
    modalCloseButton.addEventListener("click", () => {
      const modals = document.getElementsByClassName("modal-content");
      for (let i = 0; i < modals.length; i++) {
        modals[i].style.display = "none";
      }
      modalContainer.style.bottom = "100%";
      modalContainer.classList.remove("is-open");
    });
  });
})(document, window, domIsReady);
