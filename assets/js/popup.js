function openProfile() {
  Swal.fire({
    title: "Edit Profile",
    html: `
          <!-- أيقونة القلب -->
          <div style="margin-bottom: 6px;">
            <div style="background:#f0fff0; width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin: 0 auto;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
          </div>

          <!-- النص التوضيحي -->
          <p style="font-size:13px; color:#888; margin: 0 0 16px;">Update your personal information.</p>

          <!-- الصورة الشخصية -->
          <div style="margin-bottom: 18px; text-align:center;">
            <img id="mainProfilePic" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Laila&backgroundColor=6aab8e"
              style="width:88px; height:88px; border-radius:50%; border:3px solid #4CAF50; object-fit:cover; display:block; margin: 0 auto 8px;">
            <div class="photo-chip">
              <div class="photo-circle" role="button" tabindex="0" onclick="document.getElementById('photo').click()">
                <img id="photoPreview" alt="" style="width:100%; height:100%; border-radius:50%; object-fit:cover; display:none;" />
                <span id="avatarIcon" class="muted" style="font-weight:900;">👤</span>
                <span class="photo-plus">+</span>
              </div>
              <div>
                <div style="color: var(--primary-2); font-weight: 900;">Upload Photo</div>
                <div class="tiny muted">(Optional)</div>
              </div>
            </div>
            <input type="file" id="photo" accept="image/*" style="display: none;">
          </div>

          <!-- الحقول -->
          <div class="swal-field-container">
            <label>Full Name</label>
            <input id="swal-name" class="custom-input" placeholder='mohammed adwan'>
          </div>

          <div class="swal-field-container">
            <label>Location</label>
            <input id="swal-location" class="custom-input" placeholder='gaza'>
          </div>

          <div class="swal-field-container">
            <label>Email Address</label>
            <input id="swal-email" class="custom-input" placeholder='example@gmail.com'>
          </div>

          <div class="swal-field-container">
            <label>Bio</label>
            <textarea id="swal-bio" class="custom-input" placeholder='Resilience is our heritage. Sharing my journey of rebuilding and hope for a brighter future.'></textarea>
          </div>
        `,
    showCancelButton: true,
    confirmButtonText: "Save Changes",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "my-swal-popup",
      confirmButton: "my-save-button",
      cancelButton: "my-cancel-button",
    },
    buttonsStyling: false,

    // هاد الجزء يتنفذ أول ما الـ الـ Pop-up يفتح مباشرة ليربط حقل الملفات
    didOpen: () => {
      const fileInput = document.getElementById("photo");
      const photoPreview = document.getElementById("photoPreview");
      const mainProfilePic = document.getElementById("mainProfilePic");
      const avatarIcon = document.getElementById("avatarIcon");

      fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();

          reader.onload = function (event) {
            // تحديث الصورة الكبيرة وصورة الدائرة الصغيرة بالصورة الجديدة
            mainProfilePic.src = event.target.result;
            photoPreview.src = event.target.result;

            // إظهار عنصر المعاينة وإخفاء الأيقونة الافتراضية
            photoPreview.style.display = "block";
            avatarIcon.style.display = "none";

            // حفظ الداتا (Base64) عشان نرسلها عند الحفظ
            selectedImgData = event.target.result;
          };

          reader.readAsDataURL(file); // قراءة الملف كـ URL
        }
      });
    },

    preConfirm: () => {
      const name = document.getElementById("swal-name").value.trim();
      const location = document.getElementById("swal-location").value.trim();
      const email = document.getElementById("swal-email").value.trim();
      const bio = document.getElementById("swal-bio").value.trim();

      if (!name || !location || !email || !bio) {
        Swal.showValidationMessage("Please fill out all required fields!");
        return false;
      }

      // إرجاع البيانات مع الصورة الجديدة
      return {
        name,
        location,
        email,
        bio,
        profileImage: selectedImgData, // راح تكون قيمتها null لو ما رفع صورة، أو نص Base64 لو رفع صورة
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Data saved:", result.value);
      // هنا يمكنك إرسال result.value.profileImage إلى السيرفر لتخزينها

      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Your profile has been updated.",
        confirmButtonColor: "#4CAF50",
      });
    }
  });
}
