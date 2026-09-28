/* =========================================================
   STUDIO — INTERACTIONS
   js/index.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PAGE LOAD
  ======================================================= */

  requestAnimationFrame(() => {
    document.body.classList.add("page-loaded");
  });


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const progressContainer = document.createElement("div");

  progressContainer.className = "scroll-progress";

  progressContainer.innerHTML = `
    <div class="scroll-progress-bar"></div>
  `;

  document.body.prepend(progressContainer);


  const progressBar = progressContainer.querySelector(
    ".scroll-progress-bar"
  );


  function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const progress =
      (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;
  }


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );


  updateScrollProgress();


  /* =======================================================
     HEADER ON SCROLL
  ======================================================= */

  const header = document.querySelector(".header");


  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  updateHeader();


  /* =======================================================
     SELECT ELEMENTS FOR SCROLL REVEAL
  ======================================================= */

  const sections = [
    ".intro",
    ".featured",
    ".join",
    ".footer",
    ".shop-page",
    ".product-page",
    ".checkout-page",
    ".perspectives",
    ".related",
    ".product-statement"
  ];


  sections.forEach(selector => {

    const section = document.querySelector(selector);

    if (!section) return;

    section.classList.add("scroll-reveal");

  });


  /* =======================================================
     IMAGE REVEALS
  ======================================================= */

  const imageContainers = document.querySelectorAll(`
    .featured-main-image,
    .featured-accessories,
    .main-product-image,
    .product-thumbnails,
    .related-grid a,
    .shop-editorial
  `);


  imageContainers.forEach(element => {

    element.classList.add("image-reveal");

  });


  /* =======================================================
     STAGGER ELEMENTS
  ======================================================= */

  const staggerGroups = [
    ".intro-item",
    ".reviews article",
    ".related-grid a",
    ".products-grid .product-card",
    ".footer > div"
  ];


  staggerGroups.forEach(selector => {

    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {

      element.classList.add("stagger-item");

    });

  });


  /* =======================================================
     INTERSECTION OBSERVER
  ======================================================= */

  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  };


  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }


        entry.target.classList.add("is-visible");


        /*
          Dejamos de observar el elemento después
          de mostrarlo para evitar repetir la animación.
        */

        observer.unobserve(entry.target);

      });

    },
    observerOptions
  );


  /* =======================================================
     OBSERVE REVEAL ELEMENTS
  ======================================================= */

  const revealElements = document.querySelectorAll(`
    .scroll-reveal,
    .image-reveal,
    .stagger-item
  `);


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });


  /* =======================================================
     LAZY LOAD IMAGES
  ======================================================= */

  const images = document.querySelectorAll("img");


  images.forEach((image, index) => {

    /*
      No aplicamos lazy loading al hero,
      porque queremos que sea la primera imagen visible.
    */

    if (
      image.closest(".hero") ||
      index === 0
    ) {
      return;
    }


    image.loading = "lazy";

    image.decoding = "async";

  });


  /* =======================================================
     HERO IMAGE
  ======================================================= */

  const heroImage = document.querySelector(".hero img");


  if (heroImage) {

    heroImage.addEventListener("load", () => {

      document.body.classList.add("hero-loaded");

    });

  }


  /* =======================================================
     FEATURED PARALLAX
  ======================================================= */

  const featuredImage =
    document.querySelector(".featured-main-image img");


  function updateParallax() {

    if (!featuredImage) return;

    /*
      Desactivamos el efecto en móvil
      para evitar movimientos innecesarios.
    */

    if (window.innerWidth <= 800) {

      featuredImage.style.transform = "";

      return;

    }


    const container =
      featuredImage.closest(".featured-main-image");


    if (!container) return;


    const rect =
      container.getBoundingClientRect();


    const windowHeight =
      window.innerHeight;


    /*
      Solo calculamos el efecto cuando
      la imagen está cerca del viewport.
    */

    if (
      rect.bottom < 0 ||
      rect.top > windowHeight
    ) {
      return;
    }


    const progress =
      (windowHeight - rect.top) /
      (windowHeight + rect.height);


    const movement =
      (progress - 0.5) * 18;


    featuredImage.style.transform =
      `translateY(${movement}px) scale(1.03)`;

  }


  window.addEventListener(
    "scroll",
    updateParallax,
    { passive: true }
  );


  window.addEventListener(
    "resize",
    updateParallax
  );


  updateParallax();


  /* =======================================================
     HERO MENU
  ======================================================= */

  const heroMenu =
    document.querySelector(".hero-menu");


  if (heroMenu) {

    heroMenu.setAttribute(
      "aria-label",
      "Scroll"
    );


    heroMenu.addEventListener(
      "click",
      () => {

        const intro =
          document.querySelector(".intro");


        if (!intro) return;


        intro.scrollIntoView({
          behavior: "smooth"
        });

      }
    );


    heroMenu.style.cursor = "pointer";

  }


  /* =======================================================
     NEWSLETTER
  ======================================================= */

  const newsletterForm =
    document.querySelector(".join form");


  if (newsletterForm) {

    newsletterForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const input =
          newsletterForm.querySelector(
            "input[type='email']"
          );


        const button =
          newsletterForm.querySelector(
            "button"
          );


        if (!input || !button) return;


        const email =
          input.value.trim();


        /*
          Validación sencilla.
        */

        if (!email || !email.includes("@")) {

          input.focus();

          input.style.borderBottomColor =
            "#ff3030";

          return;

        }


        input.style.borderBottomColor =
          "#555";


        const originalText =
          button.textContent;


        button.textContent =
          "SUBSCRIBED ✓";


        button.disabled = true;


        input.value = "";


        /*
          Restauramos el botón después de unos segundos.
        */

        setTimeout(() => {

          button.textContent =
            originalText;

          button.disabled = false;

        }, 3000);

      }
    );

  }


  /* =======================================================
     EXTERNAL / ANCHOR LINKS
  ======================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =======================================================
     PRODUCT HOVER IMAGE
  ======================================================= */

  const productCards =
    document.querySelectorAll(
      ".product-card"
    );


  productCards.forEach(card => {

    const image =
      card.querySelector("img");


    if (!image) return;


    card.addEventListener(
      "mouseenter",
      () => {

        image.style.transform =
          "scale(1.035)";

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        image.style.transform =
          "scale(1)";

      }
    );

  });


  /* =======================================================
     ACCORDION
  ======================================================= */

  const details =
    document.querySelectorAll(
      ".accordion details"
    );


  details.forEach(detail => {

    detail.addEventListener(
      "toggle",
      () => {

        if (!detail.open) return;


        details.forEach(other => {

          if (
            other !== detail &&
            other.open
          ) {
            other.open = false;
          }

        });

      }
    );

  });


  /* =======================================================
     IMAGE ERROR HANDLING
  ======================================================= */

  const allImages =
    document.querySelectorAll("img");


  allImages.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        image.style.opacity = "0.35";

      }
    );

  });

});




/* =========================================================
   STUDIO — SHOP INTERACTIONS
   js/index.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     SHOP FILTER SYSTEM
  ======================================================= */

  const products = document.querySelectorAll(".product-card");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const colorButtons = document.querySelectorAll(".colors .color");

  let currentCategory = "all";
  let currentColor = "all";


  /* =======================================================
     PRODUCT COLOR DETECTION

     El color se obtiene automáticamente del texto
     del producto:

     BLACK / WOOL
     WHITE / COTTON
     GREY / COTTON
     BROWN / ...
  ======================================================= */

  function getProductColor(product) {

    const colorElement = product.querySelector(".product-info span");

    if (!colorElement) {
      return "";
    }

    const text = colorElement.textContent.toLowerCase();

    if (text.includes("black")) {
      return "black";
    }

    if (text.includes("white")) {
      return "white";
    }

    if (text.includes("grey") || text.includes("gray")) {
      return "grey";
    }

    if (text.includes("brown")) {
      return "brown";
    }

    return "";
  }


  /* =======================================================
     FILTER PRODUCTS
  ======================================================= */

  function filterProducts() {

    products.forEach((product, index) => {

      const category = product.dataset.category;
      const productColor = getProductColor(product);

      const categoryMatch =
        currentCategory === "all" ||
        category === currentCategory;

      const colorMatch =
        currentColor === "all" ||
        productColor === currentColor;


      if (categoryMatch && colorMatch) {

        product.classList.remove("product-hidden");

        /*
         * Pequeño retraso para crear un efecto escalonado
         */
        setTimeout(() => {
          product.classList.add("product-visible");
        }, index * 45);

      } else {

        product.classList.remove("product-visible");
        product.classList.add("product-hidden");

      }

    });

  }


  /* =======================================================
     CATEGORY BUTTONS
  ======================================================= */

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      currentCategory = button.dataset.filter;

      /*
       * Quitamos estado activo
       */
      filterButtons.forEach(item => {
        item.classList.remove("filter-active");
      });

      /*
       * Activamos el botón seleccionado
       */
      button.classList.add("filter-active");

      filterProducts();

    });

  });


  /* =======================================================
     COLOR FILTER
  ======================================================= */

  colorButtons.forEach(button => {

    button.addEventListener("click", () => {

      const isAlreadyActive =
        button.classList.contains("color-active");


      /*
       * Si pulsamos dos veces el mismo color,
       * volvemos a mostrar todos.
       */
      if (isAlreadyActive) {

        currentColor = "all";

        colorButtons.forEach(color => {
          color.classList.remove("color-active");
        });

      } else {

        currentColor = getColorFromButton(button);

        colorButtons.forEach(color => {
          color.classList.remove("color-active");
        });

        button.classList.add("color-active");

      }

      filterProducts();

    });

  });


  /* =======================================================
     GET COLOR FROM BUTTON
  ======================================================= */

  function getColorFromButton(button) {

    if (button.classList.contains("black")) {
      return "black";
    }

    if (button.classList.contains("white")) {
      return "white";
    }

    if (button.classList.contains("grey")) {
      return "grey";
    }

    if (button.classList.contains("brown")) {
      return "brown";
    }

    return "all";

  }


  /* =======================================================
     SEARCH SYSTEM
  ======================================================= */

  const searchButton =
    document.querySelector(".header-actions button");


  if (searchButton && products.length > 0) {

    searchButton.addEventListener("click", () => {

      createSearchOverlay();

    });

  }


  /* =======================================================
     CREATE SEARCH OVERLAY
  ======================================================= */

  function createSearchOverlay() {

    /*
     * Evita crear dos buscadores
     */
    if (document.querySelector(".shop-search-overlay")) {
      return;
    }


    const overlay = document.createElement("div");

    overlay.className = "shop-search-overlay";

    overlay.innerHTML = `

      <div class="shop-search-box">

        <div class="shop-search-header">

          <span>SEARCH COLLECTION</span>

          <button
            type="button"
            class="shop-search-close"
            aria-label="Close search">
            CLOSE
          </button>

        </div>


        <div class="shop-search-input-wrap">

          <input
            type="search"
            class="shop-search-input"
            placeholder="SEARCH PRODUCTS"
            autocomplete="off"
          >

        </div>


        <div class="shop-search-results"></div>

      </div>

    `;


    document.body.appendChild(overlay);


    /*
     * Animación de entrada
     */
    requestAnimationFrame(() => {
      overlay.classList.add("search-open");
    });


    const input =
      overlay.querySelector(".shop-search-input");

    const closeButton =
      overlay.querySelector(".shop-search-close");

    const results =
      overlay.querySelector(".shop-search-results");


    input.focus();


    /* =====================================================
       CLOSE SEARCH
    ===================================================== */

    function closeSearch() {

      overlay.classList.remove("search-open");

      setTimeout(() => {

        overlay.remove();

      }, 250);

    }


    closeButton.addEventListener("click", closeSearch);


    /*
     * Click fuera del buscador
     */
    overlay.addEventListener("click", event => {

      if (event.target === overlay) {
        closeSearch();
      }

    });


    /*
     * ESC para cerrar
     */
    document.addEventListener("keydown", function escapeSearch(event) {

      if (event.key === "Escape") {

        closeSearch();

        document.removeEventListener(
          "keydown",
          escapeSearch
        );

      }

    });


    /* =====================================================
       SEARCH PRODUCTS
    ===================================================== */

    input.addEventListener("input", () => {

      const query =
        input.value
          .trim()
          .toLowerCase();


      results.innerHTML = "";


      if (!query) {

        results.innerHTML = `
          <p class="search-empty">
            TYPE TO SEARCH THE COLLECTION
          </p>
        `;

        return;

      }


      let matches = 0;


      products.forEach(product => {

        const title =
          product.querySelector("h3")?.textContent
            .toLowerCase() || "";

        const description =
          product.querySelector(".product-info span")
            ?.textContent
            .toLowerCase() || "";


        if (
          title.includes(query) ||
          description.includes(query)
        ) {

          matches++;


          const link =
            product.querySelector("a");

          const image =
            product.querySelector("img");

          const price =
            product.querySelector("strong");


          const result =
            document.createElement("a");

          result.href = link
            ? link.href
            : "#";

          result.className =
            "search-product";


          result.innerHTML = `

            <img
              src="${image?.src || ""}"
              alt="${image?.alt || ""}"
            >

            <div>

              <strong>
                ${title.toUpperCase()}
              </strong>

              <span>
                ${description.toUpperCase()}
              </span>

            </div>

            <strong>
              ${price?.textContent || ""}
            </strong>

          `;


          results.appendChild(result);

        }

      });


      if (matches === 0) {

        results.innerHTML = `
          <p class="search-empty">
            NO PRODUCTS FOUND
          </p>
        `;

      }

    });

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".nav");


  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

      navigation.classList.toggle("mobile-open");

      menuToggle.classList.toggle("menu-active");

    });

  }


  /* =======================================================
     PRODUCT IMAGE HOVER
  ======================================================= */

  products.forEach(product => {

    const image =
      product.querySelector(".product-image img");

    if (!image) {
      return;
    }


    product.addEventListener("mouseenter", () => {

      image.style.transform = "scale(1.045)";

    });


    product.addEventListener("mouseleave", () => {

      image.style.transform = "scale(1)";

    });

  });


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".shop-heading, .filters, .product-card, .shop-editorial, .footer"
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observerInstance) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "scroll-visible"
              );

              observerInstance.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08
        }
      );


    revealElements.forEach(element => {

      element.classList.add(
        "scroll-hidden"
      );

      observer.observe(element);

    });

  }


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  /*
   * ALL ITEMS seleccionado inicialmente
   */

  const allButton =
    document.querySelector('[data-filter="all"]');


  if (allButton) {
    allButton.classList.add("filter-active");
  }


  /*
   * Mostrar productos inicialmente
   */

  products.forEach(product => {

    product.classList.add(
      "product-visible"
    );

  });


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  let previousScroll = 0;

  const header =
    document.querySelector(".header");


  if (header) {

    window.addEventListener(
      "scroll",
      () => {

        const currentScroll =
          window.scrollY;


        if (currentScroll > previousScroll &&
            currentScroll > 100) {

          header.classList.add(
            "header-scrolled"
          );

        } else {

          header.classList.remove(
            "header-scrolled"
          );

        }


        previousScroll =
          currentScroll;

      },
      {
        passive: true
      }
    );

  }

});