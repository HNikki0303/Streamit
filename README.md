
# StreamIt – Personalized Video Streaming Frontend
Welcome to **StreamIt** — a cutting-edge, full-stack video streaming platform built with the MERN stack, featuring a personalized AI assistant: **Streamy**, that helps creators and viewers elevate their content experience!

## 🚀 Overview
StreamIt is not just another video platform. It’s designed to empower content creators and viewers with **AI-powered insights** tailored to their unique channel personality and preferences.

**Core Features:**
* 🎥 Watch videos with a sleek, responsive player
* 📤 **Publish videos** with custom titles, descriptions, and thumbnails
* 👤 Create and manage your **personal channel**, including profile and channel description
* ✏️ Update your **user profile** and **channel information** seamlessly
* 🔎 **Search videos** by title, description, or creator
* 🤖 Interact with your **AI assistant: Streamy** that adapts to your channel’s unique tone
* ✨ Personalized AI suggestions powered by OpenRouter’s **Mistral-7B Instruct** model

## 📁 Frontend Repo
This repo contains the **React frontend** of the StreamIt application. It handles:
* User authentication and session management
* Channel creation, profile updating, and user channel display
* Video browsing, playback, publishing, and searching
* Personalized AI chat interface
* Responsive UI with beautiful gradients and animations using Tailwind CSS
* Client-side routing with React Router

## 🔧 Technologies
* **React** with functional components and hooks
* **React Router** for navigation and state passing
* **Tailwind CSS** for styling and animations
* **Marked + DOMPurify** for secure markdown rendering of AI responses
* **Fetch API** for backend communication
* **OpenRouter API** for AI assistant integration

## ⚙️ Features

### 🤖 AI Assistant (`AI_Assistant.jsx`)
* Personalized AI chat powered by your channel description
* Secure markdown rendering with formatting (bold, bullets,emojis etc.)
* Message timestamps, auto-scroll, and copy-to-clipboard
* Graceful error handling and loading UI

### 👤 User & Channel Management
* View and edit profile (name, username, avatar, cover image)
* Update **channel description**, which feeds into AI assistant context
* View your **personal channel page** listing your videos
* Secure session handling with cookies

### 🎬 Video Playback (`FullVideo.jsx`)
* Play selected videos with title and description
* Background gradients and animations
* Toggleable AI assistant sidebar

### 📤 Video Publishing (`PublishVideo.jsx`)
* Authenticated video uploads
* Optional thumbnail support
* Displays uploaded video preview
* Status indicators (uploading, success, error)
* In-line **AI assistant** for content ideation

### 🔍 Video Search
* Live search bar to filter videos by title
* Easy navigation to selected video

## 📁 Project Structure

```
/src
  /components
    AI_Assistant.jsx
    FullVideo.jsx
    PublishVideo.jsx
    CommonA.jsx
    FormattedVideo.jsx
    LandingPage.jsx
    Profile.jsx
    ChannelPage.jsx
  App.jsx
  index.js
```

Key Files:

* `AI_Assistant.jsx` – AI chat interface
* `FullVideo.jsx` – Video player with Streamy sidebar
* `PublishVideo.jsx` – Video uploader and AI assistant combo
* `FormattedVideo.jsx` – Preview video card
* `ChannelPage.jsx` – Displays user’s public videos and profile info

## 🛠️ Backend API Requirements

The frontend expects a backend server with the following REST endpoints:

* `GET /api/v1/user/currentUser` – Fetch logged-in user profile
* `PUT /api/v1/user/update-profile` – Update user profile and images
* `POST /api/v1/video/publishAVideo` – Upload and publish videos
* `GET /api/v1/video/search` – Search videos by title
* OpenRouter proxy route for AI assistant (`/api/v1/ai/askStreamy`)
* User auth: login, logout, register, and cookie-based sessions

Make sure:
* CORS is enabled for frontend origin
* Cookies are set with `credentials: include` on both sides
  

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/HNikki0303/Streamit.git
cd Streamit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

In `.env` (if used) or directly in `AI_Assistant.jsx`, configure your OpenRouter API key:

```js
Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
```

### 4. Start Development Server

```bash
npm start
```

### 5. Ensure Backend is Running
Update any API base URLs if your backend runs on a different port or domain.

## 🌟 Future Improvements
* ✏️ Edit uploaded videos
* 💬 Comments, likes, and playlists
* 🔔 Subscriptions, notifications, and trending feeds

## ❤️ Contributing
Contributions are welcome! Please open issues or PRs for features, bug fixes, or improvements.

## 📞 Contact
Feel free to reach out:
* Nikita Pant
* [nikitapant496@gmail.com](mailto:nikitapant496.email@example.com)
* [https://github.com/HNikki0303](https://github.com/HNikki0303)

**Thanks for checking out Streamy! Enjoy streaming and creating with AI-powered magic. 🌊✨**


  
