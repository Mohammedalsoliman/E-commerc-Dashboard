

// ========== التحكم بالسايدبار المتجاوب (أيقونات فقط في الموبايل + فتح كامل فوق المحتوى) ==========
const aside = document.getElementById("aside");
const toggleBtn = document.getElementById("toggle-aside");
const overlayBg = document.getElementById("asideOverlayBg");

let isOverlayActive = false; // حالة السايدبار المفتوح بالكامل
let isMobileView = window.innerWidth <= 991.98;

// تحديث الحالة بناءً على عرض الشاشة
function checkViewport() {
    const newMobile = window.innerWidth <= 991.98;
    if (newMobile !== isMobileView) {
        isMobileView = newMobile;
        // إذا انتقلنا من موبايل إلى ديسكتوب وكان الـ overlay نشطاً، نغلقه ونزيل الفئة
        if (!isMobileView && isOverlayActive) {
            closeOverlay();
        }
        // إذا كان ديسكتوب نضمن عدم وجود overlay-active ولا خلفية
        if (!isMobileView) {
            aside.classList.remove("overlay-active");
            document.body.classList.remove("overlay-open");
            isOverlayActive = false;
        } else {
            // في حالة الموبايل نتأكد من ان السايدبار ليس overlay-active (مغلق بالأيقونات)
            if (!aside.classList.contains("overlay-active")) {
                // نضمن الوضع الأساسي أيقونات فقط
                aside.classList.remove("overlay-active");
                document.body.classList.remove("overlay-open");
                isOverlayActive = false;
            }
        }
    }
}

// فتح الـ overlay (السايدبار الكامل فوق المحتوى)
function openOverlay() {
    if (!isMobileView) return;
    aside.classList.add("overlay-active");
    document.body.classList.add("overlay-open");
    isOverlayActive = true;
}

// إغلاق الـ overlay
function closeOverlay() {
    aside.classList.remove("overlay-active");
    document.body.classList.remove("overlay-open");
    isOverlayActive = false;
}

// تبديل حالة الـ overlay
function toggleOverlay() {
    if (!isMobileView) return; // في الديسكتوب الزر مخفي لكن احتياطياً
    if (isOverlayActive) {
        closeOverlay();
    } else {
        openOverlay();
    }
}

// حدث النقر على زر التبديل
if (toggleBtn) {
    toggleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleOverlay();
    });
}

// إغلاق الـ overlay عند النقر على الخلفية المظلمة
if (overlayBg) {
    overlayBg.addEventListener("click", function () {
        closeOverlay();
    });
}

// إغلاق الـ overlay عند الضغط على زر Escape
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOverlayActive && isMobileView) {
        closeOverlay();
    }
});

// مراقبة تغيير حجم النافذة لإعادة ضبط الحالة
window.addEventListener("resize", function () {
    checkViewport();
});

// تنفيذ الفحص أول مرة
checkViewport();

// لمنع تمرير المحتوى خلف الـ overlay عند فتحه (تم عبر css body.overlay-open)
// بالإضافة إلى منع انتشار النقر داخل السايدبار للإغلاق
if (aside) {
    aside.addEventListener("click", function (e) {
        e.stopPropagation();
    });
}
