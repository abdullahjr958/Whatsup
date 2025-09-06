
# 💬 Whatsup – Real-Time Chat Application

Whatsup is a real-time chat application built with **Node.js, Express, Socket.IO, and MongoDB**.  
It supports one-on-one chats, group chats, authentication with JWT, and live message updates – all styled with a modern UI.

Check out the Application on [https://whatsup-hqi9.onrender.com](https://whatsup-hqi9.onrender.com)

---

## 🚀 Features
- 🔐 **User Authentication** with JWT (Access & Refresh Tokens)
- 👥 **One-on-One and Group Chats**
- ⚡ **Real-Time Messaging** powered by Socket.IO
- 🏠 **Persistent Rooms** stored in MongoDB
- 📩 **Last Message Snippets** for quick chat previews
- 🔄 **Auto Refresh Access Token** when expired
- 🔒 **Secure Cookies** with `httpOnly` and `sameSite` flags
- 🎨 **Modern UI** with responsive design
- 🛡️ Basic **Error Handling & Validation**

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, Socket.IO
- **Database:** MongoDB Atlas
- **Authentication:** JWT (Access + Refresh Tokens)
- **Frontend:** Vanilla JS, HTML, CSS (integrated with backend)
- **Deployment:** Render (Backend) + MongoDB Atlas (Cloud Database)

---

## 📂 Project Structure
```

.
├── models/             # Mongoose Schemas (User, Room, Message)
├── middleware/         # Auth and Error Handling Middleware
├── router/             # Express Routers (Auth, Chat)
├── public/             # Frontend JS, CSS, and static files
├── views/              # HTML templates (login, register, chat)
├── socket.js           # Socket.IO setup and events
├── server.js           # Main entry point
└── README.md           # Documentation

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/abdullahjr958/Whatsup.git
cd whatsup
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your-mongodb-atlas-uri
ACCESS_TOKEN_SECRET=your-secret
REFRESH_TOKEN_SECRET=your-secret
NODE_ENV=development
```

### 4️⃣ Run locally

```bash
npm start
```

Open 👉 [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌍 Deployment

This app can be deployed on [Render](https://render.com):

1. Push your code to GitHub.
2. Create a new Render project → **Deploy from GitHub repo**.
3. Add your environment variables in the **Variables** tab.
4. Render will provide a live URL like:

   ```
   https://whatsup-stu9.onrender.com
   ```

For the database, create a **MongoDB Atlas cluster**, get the connection string, and paste it into the `MONGO_URI` variable in Render.

---

## 👨‍💻 Usage

* **Register/Login** to create an account.
* **Search users** and start a one-on-one chat.
* **Create groups** and chat with multiple users.
* **Send messages** in real-time without refreshing.
* **See last message snippets** for quick preview.

---

## 🔒 Security Notes

* JWT tokens are stored in **httpOnly cookies** (protected from JavaScript access).
* Cookies use `sameSite=strict` and `secure` in production.
* Refresh tokens are stored in the DB for validation and logout.

---

## 📸 Screenshots
<img width="1917" height="877" alt="Screenshot 2025-09-07 022918" src="https://github.com/user-attachments/assets/34b2c2a2-1f29-4fa5-b7d5-37d20a9724de" />
<img width="1919" height="877" alt="Screenshot 2025-09-07 022900" src="https://github.com/user-attachments/assets/70688f45-2d9d-49a7-a4d9-aecd54353f43" />
<img width="1918" height="876" alt="Screenshot 2025-09-07 021727" src="https://github.com/user-attachments/assets/c8840649-6970-4f26-890b-b3b80d10b4b0" />


---

## 🙌 Acknowledgements

* [Express.js](https://expressjs.com/)
* [Socket.IO](https://socket.io/)
* [MongoDB Atlas](https://www.mongodb.com/atlas)
* [Railway](https://railway.app)

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify it.

