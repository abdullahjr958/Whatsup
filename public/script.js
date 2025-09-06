// JavaScript to toggle dropdown visibility
// Dropdown toggle
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
console.log('Dropdown Btn:', dropdownBtn);

dropdownBtn.addEventListener('click', (e) => {
  console.log('Dropdown button clicked');
  e.stopPropagation(); // Prevent closing on click
  dropdownMenu.classList.toggle('hidden');
  dropdownMenu.classList.toggle('show');
});

// Hide the dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.add('hidden');
    dropdownMenu.classList.remove('show');
  }
});

// To refresh the access token
async function refreshAccessToken() {
  try {
    let response = await fetch('/refresh', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      console.log('Access Token refreshed');
      return true;
    } else {
      console.warn('Failed to refresh access token');
      return false;
    }
  } catch (err) {
    console.error('Refresh failed: ' + err);
    return false;
  }
}

// Modal functionality

const modalOverlay = document.getElementById('modal-overlay');
const actualModal = document.getElementById('create-group-modal');
const closeModalButton = document.getElementById('close-modal-btn');
const dropdownCreateGroupButton = document.getElementById('dropdown-create-group-btn');
const modalCreateGroupButton = document.getElementById('modal-create-group-btn');

const groupNameInput = document.getElementById('group-name-input');
const searchFormModal = document.getElementById('search-form-modal');
const usernameInput = document.getElementById('username-input');
const searchResults = document.getElementById('search-results-modal');
const addedUsers = document.getElementById('added-users');

function clearSpace() {
  searchResults.innerHTML = '';
  addedUsers.innerHTML = '';
  usernameInput.value = '';
  groupNameInput.value = '';
}

// Open modal when the create group button is clicked
dropdownCreateGroupButton.addEventListener('click', function () {
  modalOverlay.classList.add('show');
  actualModal.classList.add('show');

  dropdownMenu.classList.add('hidden');
  dropdownMenu.classList.remove('show');
});

// Close modal when the close button is clicked
closeModalButton.addEventListener('click', function () {
  clearSpace();
  modalOverlay.classList.remove('show');
  actualModal.classList.remove('show');
});

// Close modal when clicking outside the modal
modalOverlay.addEventListener('click', function () {
  console.log('Overlay clicked');
  clearSpace();
  modalOverlay.classList.remove('show');
  actualModal.classList.remove('show');
});

// Search form handler
searchFormModal.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchResults.innerHTML = '';
  const query = usernameInput.value.trim();
  if (!query) return;

  try {
    const response = await fetch(
      `/search?username=${encodeURIComponent(query)}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status == 401) {
      const isRefreshed = await refreshAccessToken();
      if (!isRefreshed) window.location.href = '/login';
      else {
        response = await fetch(
          `/search?username=${encodeURIComponent(query)}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    const data = await response.json();

    if (response.status === 404 || response.status === 400) {
      searchResults.innerHTML = `<p class="text-red-500">${data.message}</p>`;
      return;
    }
    if (response.status === 200) {
      const { searchedUser } = data;
      const userDiv = document.createElement('div');

      userDiv.className = 'user-item';
      userDiv.innerHTML = `
          <div class="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-2 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                ${searchedUser.initials}
              </div>
              <div class="text-gray-800 font-medium">${
                searchedUser.username
              }</div>
            </div>
            <button class="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onclick='addUser(${JSON.stringify(searchedUser)})'>
              Add
            </button>
          </div>
        `;
      searchResults.prepend(userDiv);
    }
  } catch (err) {
    console.error('Search error:', err);
    searchResults.innerHTML = `<p class="text-red-500">Error searching user.</p>`;
  }
});

// Add user to the list
function addUser(searchedUser) {
  // Check if already added
  const exists = Array.from(addedUsers.children).some(
    (child) =>
      child.querySelector('[data-username]')?.dataset.username ===
      searchedUser.username
  );
  if (exists) return;

  const addedDiv = document.createElement('div');
  addedDiv.className =
    'flex items-center justify-between bg-green-50 p-2 rounded-lg hover:bg-green-100 transition';
  addedDiv.innerHTML = `
      <div class="flex items-center space-x-3" data-username="${
        searchedUser.username
      }">
        <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          ${searchedUser.username.charAt(0).toUpperCase()}
        </div>
        <div class="text-gray-800 font-medium">${searchedUser.username}</div>
      </div>
      <button class="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        onclick="this.closest('div').remove()">
        Remove
      </button>
    `;
  addedUsers.appendChild(addedDiv);

  usernameInput.value = '';
  searchResults.innerHTML = '';
}

// Create group
modalCreateGroupButton.addEventListener('click', async () => {
  const groupName = groupNameInput.value.trim();
  if (!groupName) {
    alert('Group name is required');
    return;
  }

  const addedUsersList = Array.from(addedUsers.children)
    .map((child) => child.querySelector('[data-username]')?.dataset.username)
    .filter(Boolean);

  if (addedUsersList.length === 0) {
    alert('Add at least one user to the group');
    return;
  }

  try {
    const response = await fetch('/create-group', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName, users: addedUsersList }),
    });
    if (response.status == 401) {
      const isRefreshed = await refreshAccessToken();
      if (!isRefreshed) window.location.href = '/login';
      else {
        response = await fetch('/create-group', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ groupName, users: addedUsersList }),
        });
      }
    }

    if (response.status === 201) {
      alert('Group created successfully!');
      // Clear inputs and close modal
      clearSpace();
      modalOverlay.classList.remove('show');
      actualModal.classList.remove('show');
    } else {
      const data = await response.json();
      clearSpace();
      alert('Error creating group: ' + data.message);
    }
  } catch (error) {
    clearSpace();
    console.error('Error creating group:', error);
    alert('An error occurred while creating the group.');
  }
});
