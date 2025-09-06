let accessToken = null;
let userId = null;
let yourUsername = null;
let currentChatId = null;

const gradients = [
  'bg-gradient-to-r from-red-400 to-orange-500',
  'bg-gradient-to-r from-yellow-400 to-red-500',
  'bg-gradient-to-r from-purple-400 to-indigo-500',
  'bg-gradient-to-r from-pink-500 to-yellow-500',
  'bg-gradient-to-r from-teal-400 to-cyan-500',
  'bg-gradient-to-r from-emerald-400 to-green-500',
  'bg-gradient-to-r from-lime-400 to-green-500',
  'bg-gradient-to-r from-indigo-400 to-purple-500',
  'bg-gradient-to-r from-sky-400 to-indigo-500',
  'bg-gradient-to-r from-fuchsia-400 to-pink-500',
  'bg-gradient-to-r from-rose-400 to-red-500',
  'bg-gradient-to-r from-violet-400 to-fuchsia-500',
  'bg-gradient-to-r from-blue-300 to-violet-500',
  'bg-gradient-to-r from-pink-300 to-rose-500',
  'bg-gradient-to-r from-cyan-400 to-blue-500',
  'bg-gradient-to-r from-blue-400 to-indigo-500',
  'bg-gradient-to-r from-orange-400 to-yellow-500',
  'bg-gradient-to-r from-amber-400 to-orange-500',
  'bg-gradient-to-r from-rose-300 to-pink-400',
  'bg-gradient-to-r from-emerald-300 to-teal-400',
  'bg-gradient-to-r from-cyan-300 to-teal-500',
  'bg-gradient-to-r from-fuchsia-300 to-pink-400',
  'bg-gradient-to-r from-purple-300 to-indigo-400',
  'bg-gradient-to-r from-green-300 to-lime-400',
  'bg-gradient-to-r from-yellow-300 to-amber-400',
  'bg-gradient-to-r from-sky-300 to-blue-400',
  'bg-gradient-to-r from-red-300 to-rose-400',
  'bg-gradient-to-r from-indigo-300 to-purple-400',
  'bg-gradient-to-r from-orange-300 to-red-400',
  'bg-gradient-to-r from-teal-300 to-green-400',
  'bg-gradient-to-r from-fuchsia-500 to-rose-500',
  'bg-gradient-to-r from-lime-500 to-emerald-500',
  'bg-gradient-to-r from-blue-500 to-indigo-600',
  'bg-gradient-to-r from-cyan-500 to-blue-600',
  'bg-gradient-to-r from-amber-500 to-orange-600',
  'bg-gradient-to-r from-violet-500 to-purple-600',
  'bg-gradient-to-r from-rose-500 to-red-600',
  'bg-gradient-to-r from-teal-500 to-emerald-600',
  'bg-gradient-to-r from-yellow-500 to-lime-600',
  'bg-gradient-to-r from-sky-500 to-blue-600',
  'bg-gradient-to-r from-pink-600 to-fuchsia-500',
  'bg-gradient-to-r from-indigo-500 to-violet-600',
  'bg-gradient-to-r from-orange-500 to-amber-600',
  'bg-gradient-to-r from-red-500 to-pink-600',
  'bg-gradient-to-r from-green-500 to-teal-600',
  'bg-gradient-to-r from-cyan-600 to-sky-500',
  'bg-gradient-to-r from-fuchsia-600 to-violet-500',
  'bg-gradient-to-r from-purple-600 to-indigo-500',
  'bg-gradient-to-r from-lime-600 to-green-500',
  'bg-gradient-to-r from-yellow-600 to-amber-500',
  'bg-gradient-to-r from-blue-600 to-cyan-500',
  'bg-gradient-to-r from-red-600 to-rose-500',
  'bg-gradient-to-r from-emerald-600 to-lime-500',
  'bg-gradient-to-r from-teal-600 to-cyan-500',
  'bg-gradient-to-r from-orange-600 to-red-500',
  'bg-gradient-to-r from-pink-500 to-purple-500',
  'bg-gradient-to-r from-purple-500 to-fuchsia-500',
  'bg-gradient-to-r from-blue-500 to-sky-400',
  'bg-gradient-to-r from-sky-400 to-cyan-400',
  'bg-gradient-to-r from-yellow-400 to-pink-400',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-lime-400 to-yellow-400',
  'bg-gradient-to-r from-emerald-400 to-blue-400',
  'bg-gradient-to-r from-fuchsia-400 to-violet-400',
  'bg-gradient-to-r from-red-400 to-indigo-400',
  'bg-gradient-to-r from-orange-400 to-pink-400',
  'bg-gradient-to-r from-green-400 to-fuchsia-400',
  'bg-gradient-to-r from-purple-400 to-sky-400',
  'bg-gradient-to-r from-cyan-400 to-lime-400',
  'bg-gradient-to-r from-yellow-400 to-cyan-400',
  'bg-gradient-to-r from-violet-400 to-rose-400',
  'bg-gradient-to-r from-pink-400 to-blue-400',
  'bg-gradient-to-r from-blue-400 to-red-400',
  'bg-gradient-to-r from-teal-400 to-purple-400',
  'bg-gradient-to-r from-orange-500 to-indigo-500',
  'bg-gradient-to-r from-yellow-500 to-purple-500',
  'bg-gradient-to-r from-green-500 to-red-500',
  'bg-gradient-to-r from-cyan-500 to-rose-500',
  'bg-gradient-to-r from-lime-500 to-pink-500',
  'bg-gradient-to-r from-fuchsia-500 to-green-500',
  'bg-gradient-to-r from-indigo-500 to-orange-500',
  'bg-gradient-to-r from-blue-500 to-yellow-500',
  'bg-gradient-to-r from-rose-500 to-purple-500',
  'bg-gradient-to-r from-sky-500 to-fuchsia-500',
  'bg-gradient-to-r from-red-500 to-blue-500',
  'bg-gradient-to-r from-pink-500 to-orange-500',
  'bg-gradient-to-r from-purple-500 to-green-500',
  'bg-gradient-to-r from-teal-500 to-pink-500',
  'bg-gradient-to-r from-yellow-500 to-sky-500',
  'bg-gradient-to-r from-indigo-500 to-red-500',
  'bg-gradient-to-r from-fuchsia-400 to-rose-400',
  'bg-gradient-to-r from-amber-400 to-yellow-400',
  'bg-gradient-to-r from-green-400 to-sky-400',
  'bg-gradient-to-r from-lime-400 to-indigo-400',
  'bg-gradient-to-r from-teal-400 to-pink-400',
  'bg-gradient-to-r from-cyan-400 to-purple-400',
  'bg-gradient-to-r from-violet-400 to-orange-400',
  'bg-gradient-to-r from-sky-400 to-rose-400',
  'bg-gradient-to-r from-pink-400 to-lime-400',
  'bg-gradient-to-r from-blue-400 to-emerald-400',
];

// DOM elements

// Chats list (Left side)
const chatItems = document.querySelectorAll('.chat-item');
// When no chat is selected (Right side)
const emptyState = document.getElementById('empty-state');
// Where chat interface is shown(Right side)
const chatInterface = document.getElementById('chat-interface');

// Name of chat at the top of chat interface
const chatName = document.getElementById('chat-name');
// Status of chat at the top of chat interface
const chatStatus = document.getElementById('chat-status');
// Avatar of chat at the top of chat interface
const chatAvatar = document.getElementById('chat-avatar');
// Text inside avatar if no image
const chatAvatarText = document.getElementById('chat-avatar-text');

// Area where messages are displayed
const messagesArea = document.getElementById('messages-area');
// Form to send new messages
const messageForm = document.getElementById('message-form');
// Input field for new message
const messageInput = document.getElementById('message-input');
// Chat list container
const chatList = document.getElementById('chat-list');

// Display all the chats(On the left side) when the page reloads.
document.addEventListener('DOMContentLoaded', displayRooms);
// Initialize the chat when page loads(Add event listeners)
document.addEventListener('DOMContentLoaded', initializeChat);

//================================================= Functions =================================================

// getRooms will give the rooms
// displayRooms will display those rooms in the chat list
async function displayRooms() {
  const { yu, yi, rooms } = await getRooms();
  rooms.forEach((room) => {
    chatList.appendChild(createRoomDiv(room));
  });
  document.getElementById('your-user-name').textContent = yu;
  document.getElementById('your-initials').textContent = yi;
}

// Initialize chat functionality
function initializeChat() {
  // Add click listeners to chat items
  // If a chat is clicked, selectChat is called with the chatId which displays the chat in the chat interface
  // chatItems.addEventListener('click', e => {
  //   const item = e.target.closest('.chat-item');
  //   if(!item) return;
  //   selectChat(item.dataset.chatId);
  // });

  const chatList = document.getElementById('chat-list');

  chatList.addEventListener('click', (e) => {
    const item = e.target.closest('.chat-item');
    if (!item) return;
    selectChat(item.dataset.chatId);
  });
}

// Select and display a chat
async function selectChat(chatId) {
  const currentRoom = await getRoom(chatId);

  currentChatId = chatId;

  // Update active chat item( Just for Styling Purpose )
  chatItems.forEach((item) => {
    item.classList.remove('active');
    if (item.dataset.chatId === chatId) item.classList.add('active');
  });

  // Show chat interface, hide empty state
  emptyState.style.display = 'none';
  chatInterface.style.display = 'flex';

  // Update chat header
  chatName.textContent = currentRoom.roomName;
  chatAvatarText.textContent = currentRoom.initials;
  chatAvatar.innerHTML = `<span class="text-white font-medium">${currentRoom.initials}</span>`;

  // Load messages
  loadMessages(currentRoom);
}

// Loads and display messages
async function loadMessages(currentRoom) {
  const messages = await getMessages(currentRoom._id);
  messagesArea.innerHTML = '';
  messages.forEach((message) =>
    messagesArea.appendChild(createMessageDiv(message, currentRoom.isGroup))
  );

  // Scroll to bottom
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

// ================================================= Socket.io =================================================

const socket = io('https://whatsup-hqi9.onrender.com', {
  withCredentials: true,
  auth: { accessToken: accessToken },
  autoConnect: false,
});

socket.on('connect', () => console.log('Connected to Server'));

// For receiving Message
socket.on('receiveMessage', ({ message, room }) => {
  console.log('FROM receiveMessage event. Message: ', message.content, ' Room id: ',room.id);
  if (message.sender.username === yourUsername) message.isOwn = true;
  else message.isOwn = false;
  displayNewMessage(message, room);
});

// For sending message
// Includes socket.emit()
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const content = messageInput.value.trim();
  if (!content || !currentChatId) return;
  messageInput.value = '';

  socket.emit('sendMessage', {
    roomId: currentChatId,
    content,
    senderId: userId,
  });
});

// ================================================= Search ==================================================

// Search form
const searchForm = document.getElementById('search-form');
// Input field in search form
const searchInput = document.getElementById('search-input');
// Div that displays search results
const searchResultDiv = document.getElementById('search-results');

// Event listener for Search Form
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const searchedUsername = document
      .getElementById('search-input')
      .value.trim();

    let response = await fetch(
      `/search?username=${encodeURIComponent(searchedUsername)}`,
      {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
      }
    );
    if (response.status == 401) {
      const isRefreshed = await refreshAccessToken();
      if (!isRefreshed) window.location.href = '/login';
      else {
        response = await fetch(
          `/search?username=${encodeURIComponent(searchedUsername)}`,
          {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
          }
        );
      }
    }
    if (response.status == 404) {
      searchResultDiv.classList.remove('hidden');
      const notFoundMessage = document.createElement('h4');
      notFoundMessage.textContent = 'User not found';

      searchResultDiv.appendChild(notFoundMessage);
    } else {
      const data = await response.json();
      searchResultDiv.classList.remove('hidden');

      const searchedUserDiv = document.createElement('div');
      searchedUserDiv.innerHTML = `<div class="searched-user flex items-center justify-between p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 ${
                    gradients[Math.floor(Math.random() * 99) + 1]
                  } rounded-full flex items-center justify-center">
                    <span class="text-white font-medium">${
                      data.searchedUser.initials
                    }</span>
                  </div>
                  <div class="text-gray-800 font-medium">${
                    data.searchedUser.username
                  }</div>
                </div>
                <button onclick="addUser('${
                  data.searchedUser.username
                }')" class="text-sm px-4 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  Add
                </button>
              </div>`;

      searchResultDiv.appendChild(searchedUserDiv);
    }
  } catch (err) {
    console.error(err);
    alert('Some error occured');
  }
});

// When user clicks on Add button, a new chat will be created in the chat list(Left side)
async function addUser(username) {
  try {
    let response = await fetch('/add-user', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username }),
    });
    if (response.status == 401) {
      const isRefreshed = await refreshAccessToken();
      if (!isRefreshed) window.location.href = '/login';
      else {
        response = await fetch('/add-user', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username }),
        });
      }
    }
    const data = await response.json();
    chatList.prepend(createRoomDiv(data.newRoom));

    socket.emit('joinRoom', { roomId: data.newRoom._id });
  } catch (err) {
    console.log(err);
    alert('Some error occured');
  }
}

// To close Search Result Div
document.addEventListener('click', (event) => {
  if (
    !searchResultDiv.contains(event.target) ||
    !searchInput.contains(event.target)
  ) {
    searchResultDiv.innerHTML = '';
    searchResultDiv.classList.add('hidden');
  }
});

// Returns all rooms of the user
// Is called on page reload
async function getRooms() {
  let response = await fetch('/rooms', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (response.status == 401) {
    const isRefreshed = await refreshAccessToken();
    if (!isRefreshed) window.location.href = '/login';
    else {
      response = await fetch('/rooms', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    }
  }
  const {
    accessToken: at,
    userId: uid,
    yourUsername: yu,
    yourInitials: yi,
    rooms,
  } = await response.json();
  accessToken = at;
  userId = uid;
  yourUsername = yu;
  socket.auth = { accessToken };
  socket.connect();

  return { yu, yi, rooms };
}

// Returns a single room
async function getRoom(roomId) {
  let response = await fetch(`/room?roomId=${roomId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (response.status == 401) {
    const isRefreshed = await refreshAccessToken();
    if (!isRefreshed) window.location.href = '/login';
    else {
      response = await fetch(`/room?roomId=${roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    }
  }
  const { room } = await response.json();
  return room;
}

async function getMessages(roomId) {
  let response = await fetch(`/messages?roomId=${roomId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (response.status == 401) {
    const isRefreshed = await refreshAccessToken();
    if (!isRefreshed) window.location.href = '/login';
    else {
      response = await fetch(`/messages?roomId=${roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    }
  }
  return await response.json();
}

// It displays the new message.
// It is called when server emits a new message
function displayNewMessage(message, room) {
  messagesArea.appendChild(createMessageDiv(message, room.isGroup));
  messagesArea.scrollTop = messagesArea.scrollHeight;

  updateLastMessageSnippet(room);
}

// It updates the last message snippet of the chat in the chat list
// It is called when a new message is received
async function updateLastMessageSnippet(room) {
  const chatItem = document.querySelector(`[data-chat-id="${room._id}"]`);
  if (chatItem) {
    const lastMessageElement = chatItem.querySelector('.text-sm.text-gray-600');
    if (lastMessageElement)
      lastMessageElement.textContent = room.lastMessageSnippet;
  }
}

// It is a util function
// It creates a chat div and returns it
function createRoomDiv(room) {
  const chatItem = document.createElement('div');
  chatItem.innerHTML = `<div class="chat-item p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b-2 border-l-4 border-transparent" data-chat-id="${
    room._id
  }">
                    <div class="flex items-center space-x-3">
                        <div class="relative">
                            <div class="w-12 h-12 ${
                              gradients[Math.floor(Math.random() * 99) + 1]
                            } rounded-full flex items-center justify-center">
                                <span class="text-white font-medium">${
                                  room.initials
                                }</span>
                            </div>
                            <!-- <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div> -->
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between">
                                <h3 class="font-medium text-gray-900 truncate">${
                                  room.roomName
                                }</h3>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-gray-600 truncate">${
                                  room.lastMessageSnippet
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>`;

  return chatItem;
}
function createMessageDiv(message, isGroup) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `fade-in-up ${
    message.isOwn ? 'message-sent' : 'message-received'
  }`;
  messageDiv.innerHTML = `
            <div class="mb-1">
            <p class="text-xs ${
              message.isOwn ? 'text-white/70' : 'text-gray-500'
            } font-semibold mb-2">
        ${isGroup ? (message.isOwn ? 'You' : message.sender.username) : ''}
      </p>
                <p class="text-base ${
                  message.isOwn ? 'text-white/90' : 'text-gray-600'
                }">${message.content}</p>
            </div>
            <div class="text-xs ${
              message.isOwn ? 'text-white/70' : 'text-gray-400'
            } text-right">
                ${message.sentAt}
            </div>
        `;

  return messageDiv;
}

// To refresh the access token
async function refreshAccessToken() {
  try {
    let response = await fetch('/refresh', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Refresh failed: ' + err);
    return false;
  }
}

// JavaScript to toggle dropdown visibility
// Dropdown toggle
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

dropdownBtn.addEventListener('click', (e) => {
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

// Modal functionality

const modalOverlay = document.getElementById('modal-overlay');
const actualModal = document.getElementById('create-group-modal');
const closeModalButton = document.getElementById('close-modal-btn');
const dropdownCreateGroupButton = document.getElementById(
  'dropdown-create-group-btn'
);
const modalCreateGroupButton = document.getElementById(
  'modal-create-group-btn'
);

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
    let response = await fetch(
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
              onclick='addUserInModal(${JSON.stringify(searchedUser)})'>
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
function addUserInModal(searchedUser) {
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
    let response = await fetch('/create-group', {
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
    const data = await response.json();
    if (response.status === 201) {
      alert('Group created successfully!');
      // Clear inputs and close modal
      clearSpace();
      modalOverlay.classList.remove('show');
      actualModal.classList.remove('show');
      // Prepend new group to chat list
      chatList.prepend(createRoomDiv(data.newRoom));
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
