document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
     1. Scroll Reveal Animations (تأثيرات التمرير)
     =================================================== */
  const revealElements = document.querySelectorAll(".reveal, .reveal-zoom");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // إلغاء المراقبة بعد الظهور للتحسين من سرعة وأداء المتصفح
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15, // يبدأ التأثير عند ظهور 15% من العنصر
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ===================================================
     2. Sticky Header Effects (تأثير الهيدر عند التمرير)
     =================================================== */
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ===================================================
     3. Smooth Scroll For Navigation Links (التمرير السلس)
     =================================================== */
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // حساب ارتفاع الهيدر لتجنب تغطية المحتوى
        const headerOffset = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* ===================================================
     4. Certificates Lightbox Modal (عرض الشهادات بملء الشاشة)
     =================================================== */
  const certImages = document.querySelectorAll(".cert-card img");

  // إنشاء عنصر Lightbox ديناميكياً
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="close-btn">&times;</span>
      <img src="" alt="Certificate Large View">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close-btn");

  // فتح الصورة في نافذة منبثقة عند الضغط عليها
  certImages.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
    });
  });

  // إغلاق النافذة المنبثقة عند الضغط على زر الإغلاق أو الخروج
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
});