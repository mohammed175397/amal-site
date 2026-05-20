document.querySelectorAll(".open-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const filePath = button.getAttribute("data-file");
    const container = document.getElementById("modal-container");

    try {
      // 1. جلب محتوى ملف الـ HTML
      const response = await fetch(filePath);
      const htmlContent = await response.text();

      // 2. وضع المحتوى داخل الحاوية
      container.innerHTML = htmlContent;

      // 3. إظهار الدايالوغ (تأكد أن ملفاتك في مجلد dialogs تحتوي على عنصر <dialog>)
      const modal = container.querySelector("dialog");
      if (modal) {
        modal.showModal();

        // برمجة زر الإغلاق الموجود داخل الملف المحمل
        const closeBtn = modal.querySelector(".close-btn-dialog");
        if (closeBtn) {
          closeBtn.onclick = () => modal.close();
        }
      }
    } catch (error) {
      console.error("خطأ في تحميل الملف:", error);
    }
  });
});

// // 1. تحديد جميع أزرار الفتح
// const openButtons = document.querySelectorAll(".open-btn");

// openButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     // الحصول على id الدايالوغ المطلوب من خاصية data-target
//     const modalId = button.getAttribute("data-target");
//     const modal = document.getElementById(modalId);

//     // فتح الدايالوغ كـ Modal (يجعل الخلفية معتمة)
//     modal.showModal();
//   });
// });

// // 2. تحديد جميع أزرار الإغلاق داخل الدايالوغات
// const closeButtons = document.querySelectorAll(".close-btn");

// closeButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     // إغلاق أقرب عنصر dialog للزر المضغوط
//     e.target.closest("dialog").close();
//   });
// });
