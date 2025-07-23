# StreamIt
StreamIt - Personalized Video Streaming Application
Welcome to StreamIt — a cutting-edge, full-stack video streaming platform built with the MERN stack, featuring a personalized AI assistant : Streamy , that helps creators and viewers elevate their content experience!

🚀**Overview**

StreamIt is not just another video platform. It’s designed to empower content creators and viewers with AI-powered insights tailored to their unique channel personality and preferences.
* Watch videos with a sleek, responsive player.
* **Publish videos** with custom titles, descriptions, and thumbnails.
* Create and manage your **personal channel**, including profile details and channel description.
* Update your user profile and channel information seamlessly.
* **Search videos** to easily discover content across the platform.
* Interact with your personal **AI assistant : Streamy**, that understands your channel’s unique voice and helps you brainstorm, improve, or engage better.
* Personalized AI suggestions powered by OpenRouter's Mistral-7B Instruct model, customized by your **channel description**.

📁 **Frontend Repo**
This repo contains the React frontend of the StreamIt application. It handles:
* User authentication and session management.
* Channel creation, viewing, and profile updating.
* Video browsing, playback, publishing, and searching.
* AI assistant chat interface personalized by channel description.
* Responsive UI with beautiful gradients and animations using Tailwind CSS.
* Client-side routing with React Router.

🔧 **Technologies**
* **React** with functional components and hooks
* **React Router** for navigation and state passing
* **Tailwind CSS** for styling and animations
* **Marked + DOMPurify** for secure markdown rendering of AI responses
* **Fetch API **to communicate with backend REST APIs
* **OpenRouter API** to integrate the AI assistant chat

**⚙️ Features**

**AI Assistant (AI_Assistant component)**
* Personalized AI chat using user’s channel description.
* Markdown formatting with bullet points, bold text, and line breaks.
* Message timestamps, auto-scroll, and copy-to-clipboard feature.
* Keyboard-friendly chat input (Enter to send, Shift+Enter for new line).
* Handles API errors gracefully and displays loading state.
  
**User & Channel Management**
* Fetch and display user details (name, username, avatar, cover image) on profile.
* Update and edit channel description and profile details.
* Personalized AI assistant uses your channel description to tailor responses.
* User session handling ensures a secure, smooth experience.

**Video Playback (FullVideo component)**
* Displays selected video with title and description.
* Background animations and blurred gradient blobs.
* **Toggleable AI assistant sidebar for personalized interaction.**

**Video Publishing (PublishVideo component)**
* User authentication integrated via backend API.
* Upload video and optional thumbnail.
* Submit title & description.
* Displays uploaded video preview with FormattedVideo component.
* Shows live publishing status messages.
* **AI assistant integrated side-by-side to help creators.**

**Video Search**
* Search bar to query videos by title, description, or creator.
* Easy navigation to selected video page.
  

**🔐 Authentication**
The frontend interacts with a backend API that manages user sessions and permissions via cookies (with credentials included). The AI assistant requires the user to be logged in to provide personalized suggestions based on the user's channel info.

**🌟 Future Improvements**
* Editing uploaded video files .
* Playlist , comment and like fetures for better community based interactivity among the StreamIt users watching and creating the content  .
* Implement user profiles and subscription features in more depth.

**Thanks for checking out Streamy! Enjoy streaming and creating with AI-powered magic. 🌊✨**


  
