// تفعيل مكتبة AOS
AOS.init();
// التقاط العناصر
const navbar = document.querySelector(".navbar");
const toggler = document.querySelector(".navbar-toggler");
const collapse = document.querySelector(".navbar-collapse");

// وظيفة التعامل مع تمرير الصفحة
function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else if (!collapse.classList.contains("show")) {
    // فقط احذف الكلاس لو القائمة مقفلة
    navbar.classList.remove("scrolled");
  }
}

// وظيفة التعامل مع فتح/غلق القائمة في الموبايل
function handleToggle() {
  setTimeout(() => {
    if (collapse.classList.contains("show")) {
      navbar.classList.add("scrolled"); // أضف خلفية عندما تكون القائمة مفتوحة
    } else if (window.scrollY <= 50) {
      navbar.classList.remove("scrolled"); // أعد الحالة الأصلية إذا كنت بالأعلى
    }
  }, 300); // تأخير بسيط لانتظار الانيميشن
}

// إضافة مستمعين للأحداث
if (navbar && toggler && collapse) {
  window.addEventListener("scroll", handleScroll);
  toggler.addEventListener("click", handleToggle);
}

// بيانات المنتجات
const products = {
  best: [
    {
      title: "شوكولاتة دبي كبير",
      img: "photos/Dubai/dubai1.png",
      price: "50₪",
    },
    { title: "شوكولاتة دبي وسط", img: "photos/Dubai/dubai2.png", price: "50₪" },
    { title: "4 شوكولاتة دبي", img: "photos/Dubai/dubai3.png", price: "50₪" },
  ],
  1: [
    {
      title: "شوكولاتة دبي كبير",
      img: "photos/Dubai/dubai1.png",
      price: "50₪",
    },
    { title: "شوكولاتة دبي وسط", img: "photos/Dubai/dubai2.png", price: "50₪" },
    {
      title: "4 شوكولاتة دبي وسط",
      img: "photos/Dubai/dubai3.png",
      price: "50₪",
    },
  ],
  2: [
    {
      title: "حلوى مشكلة",
      img: "https://source.unsplash.com/400x400/?dessert",
      price: "22₪",
    },
    {
      title: "بيتيفور فخم",
      img: "https://source.unsplash.com/400x400/?petitfour",
      price: "19₪",
    },
  ],
  // أكمل بقية الفئات بنفس الأسلوب...
};

// عناصر HTML
const grid = document.getElementById("product-grid");
const buttons = document.querySelectorAll(".category-buttons .btn");

/**
 * دالة عرض المنتجات حسب الفئة المحددة
 * @param {string|number} category - اسم أو رقم الفئة
 */
function render(category) {
  grid.innerHTML = "";

  const list = products[category] || [];

  if (list.length === 0) {
    grid.innerHTML = `<p class="text-center" style="color: #6b4c9a;">لا توجد منتجات حالياً.</p>`;
    return;
  }

  list.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card text-center shadow-sm";

    card.innerHTML = `
       <img src="${product.img}" class="card-img-top" alt="${product.title}" onerror="this.src='default-image.png';">
       <div class="card-body d-flex flex-column justify-content-between">
         <h5 class="card-title mb-2" style="color: #6b4c9a;">${product.title}</h5>
         <p class="card-text mb-3" style="color: #ff6ec4; font-weight: bold;">${product.price}</p>
         <a href="#" class="btn btn-pink mt-auto">اطلب الآن</a>
       </div>
     `;
    grid.appendChild(card);
  });
}

// عرض افتراضي لفئة "الأكثر مبيعاً"
render("best");

// التحكم في تغيير الفئة عبر الأزرار
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-category");
    render(category);
  });
});

// -------- Auto Scroll المنتجات --------
const productGrid = document.querySelector(".product-grid");

let autoScrollInterval;
let isUserScrolling = false;

// وظيفة للتحريك التلقائي
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (!isUserScrolling) {
      productGrid.scrollBy({ left: 1, behavior: "smooth" });
    }
  }, 20); // السرعة: كل 20ms يتحرك 1px (يمكنك تعديل السرعة إذا أردت)
}

// إيقاف التحريك عند تدخل المستخدم
function stopAutoScroll() {
  isUserScrolling = true;
  clearInterval(autoScrollInterval);
}

// إذا بدأ المستخدم في اللمس أو السحب ➔ أوقف التحريك
productGrid.addEventListener("touchstart", stopAutoScroll);
productGrid.addEventListener("mousedown", stopAutoScroll);
productGrid.addEventListener("wheel", stopAutoScroll);

// تشغيل التحريك التلقائي فقط في الشاشات الصغيرة
if (window.innerWidth <= 768) {
  startAutoScroll();
}



// مدة العد التنازلي بالدقائق
let countdownMinutes = 60;
let countdownSeconds = 0;

// تحويل الدقائق إلى ثواني
let totalTime = countdownMinutes * 60 + countdownSeconds;

// تحديد العنصر الذي سنعرض فيه العداد
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    // عرض الشكل 09:05 مثلًا
    countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (totalTime > 0) {
        totalTime--;
    } else {
        clearInterval(timerInterval);
        countdownElement.textContent = "انتهى العرض!";
    }
}

// تحديث العداد كل ثانية
let timerInterval = setInterval(updateCountdown, 1000);

// عرض القيمة الأولية فورًا عند التحميل
updateCountdown();


// تحريك الفقاعات بشكل بسيط
const bubbles = document.querySelectorAll('.bubble');

bubbles.forEach(bubble => {
    animateBubble(bubble);
});

function animateBubble(bubble) {
    let moveX = Math.random() * 50 - 25; // تحريك بين -25px و +25px
    let moveY = Math.random() * 50 - 25;

    bubble.animate(
        [
            { transform: 'translate(0, 0)' },
            { transform: `translate(${moveX}px, ${moveY}px)` },
            { transform: 'translate(0, 0)' }
        ],
        {
            duration: 8000 + Math.random() * 4000, // مدة عشوائية بين 8 و12 ثانية
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        }
    );
}

// كود الكتابة المتغيرة
var typed = new Typed('#typed-text', {
    strings: ["استمتع بأشهى الحلويات.", "نكهات لا تُنسى.", "لمسة من الحب في كل قطعة."],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });