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
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Laila&backgroundColor=6aab8e"
              style="width:88px; height:88px; border-radius:50%; border:3px solid #4CAF50; object-fit:cover; display:block; margin: 0 auto 8px;">
                  <div class="photo-chip">
        <div class="photo-circle" role="button" tabindex="0" onclick="document.getElementById('photo').click()">
          <img id="photoPreview" alt="" />
          <span class="muted" style="font-weight:900;">👤</span>
          <span class="photo-plus">+</span>
        </div>
        <div>
          <div style="color: var(--primary-2); font-weight: 900;">Upload Photo</div>
          <div class="tiny muted">(Optional)</div>
        </div>
      </div>
          </div>

          <!-- الحقول -->
          <div class="swal-field-container">
            <label>Full Name</label>
            <input id="swal-name" class="custom-input" value="Laila Mahmoud">
          </div>

          <div class="swal-field-container">
            <label>Location</label>
            <input id="swal-location" class="custom-input" value="Gaza City">
          </div>

          <div class="swal-field-container">
            <label>Email Address</label>
            <input id="swal-email" class="custom-input" value="lailamahmoud@gmail.com">
          </div>

          <div class="swal-field-container">
            <label>Bio</label>
            <textarea id="swal-bio" class="custom-input">Resilience is our heritage. Sharing my journey of rebuilding and hope for a brighter future.</textarea>
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
    reverseButtons: false,
    preConfirm: () => {
      return {
        name: document.getElementById("swal-name").value,
        location: document.getElementById("swal-location").value,
        email: document.getElementById("swal-email").value,
        bio: document.getElementById("swal-bio").value,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Your profile has been updated.",
        confirmButtonColor: "#4CAF50",
      });
    }
  });
}
