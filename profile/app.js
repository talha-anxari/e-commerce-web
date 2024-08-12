
  document.addEventListener('DOMContentLoaded', () => {
    const profileButton = document.getElementById('profile-button');
    const profileModal = document.getElementById('profileModal');
    const cancelButton = document.getElementById('cancelButton');
    const profileForm = document.getElementById('profileForm');
    const userImage = document.getElementById('user_img');
    const userName = document.getElementById('user_name');

    profileButton.addEventListener('click', () => {
      profileModal.classList.remove('hidden');
    });

    cancelButton.addEventListener('click', () => {
      profileModal.classList.add('hidden');
    });

    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const profileImageInput = document.getElementById('profileImage');
      const profileNameInput = document.getElementById('profileName').value;

      if (profileImageInput.files && profileImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          userImage.src = e.target.result;
        };
        reader.readAsDataURL(profileImageInput.files[0]);
      }

      if (profileNameInput) {
        userName.textContent = profileNameInput;
      }

      profileModal.classList.add('hidden');
    });
  });

