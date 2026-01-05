# 🧪 API Testing & Documentation Guide

This project follows a "Test-First" mentality. Every endpoint has been rigorously validated using **Postman** to ensure data integrity, security, and proper error handling.

---

## 🚀 How to Test the API

### 1. Import the Postman Collection
- Navigate to the `/docs` folder in this repository.
- Download `ProStream_Backend_v1.postman_collection.json`.
- Open Postman, click **Import**, and drag the file in.

### 2. Environment Setup
Create a Postman Environment with the following variables:
- `base_url`: `http://localhost:8000/api/v1`
- `accessToken`: (Leave empty; populated automatically upon login)
- `refreshToken`: (Leave empty; populated automatically upon login)

---

## 🛠️ Core Test Suites

### 🔐 Authentication Flow
- **Register User**: Tested with `multipart/form-data`. Verified that `avatar` and `coverImage` are correctly uploaded to Cloudinary.
- **Login**: Verified that the server returns a `200 OK` and sets **HTTP-Only Cookies** for Access and Refresh tokens.
- **Token Rotation**: Validated the `refresh-token` endpoint to ensure expired access tokens are replaced seamlessly without logging the user out.

### 👤 User Profile & Social
- **Channel Profile**: Tested the MongoDB Aggregation logic to ensure subscriber counts and "isSubscribed" status reflect real-time database state.
- **Update Details**: Verified that `$set` operations correctly update email and fullName without affecting the password.

### 📁 Media Management
- **File Validation**: Tested Multer middleware to ensure only specific file types (images/videos) are accepted.
- **Cloudinary Integration**: Verified that local files are deleted from the `public/temp` folder immediately after a successful Cloudinary upload to save server space.

---

## ⚠️ Error Handling Validation
The API has been tested for the following edge cases to ensure a "graceful fail" via our `ApiError` class:
- **400 Bad Request**: Missing required fields (e.g., no email provided).
- **401 Unauthorized**: Expired or missing JWT tokens.
- **404 Not Found**: Querying for a user or video ID that doesn't exist.
- **409 Conflict**: Attempting to register with an existing email or username.

---

## 📈 Postman Test Scripts
I have implemented Postman **Tests** (Pre-request/Tests tab) to automate the workflow:
javascript
// Example: Automatically setting the Access Token after login
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("accessToken", jsonData.data.accessToken);
}


# 🚀 API Documentation

# 🚀 API Documentation

This backend is an **Express.js** application with a base API prefix of `/api/v1`. The architecture is modular, with **42 total requests** organized by feature.

---

## 🛠️ Authentication & Security
Most protected routes require the following header:  
`Authorization: Bearer {{access_token}}`

---

## 1. Users Module
*Handles authentication flows, profile management, and watch history.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/users/register` | Register new user (Multipart/form-data) |
| **POST** | `/users/login` | Login user & receive tokens |
| **POST** | `/users/logout` | Logout user |
| **POST** | `/users/refresh-token` | Generate new access token |
| **POST** | `/users/change-password` | Change account password |
| **GET** | `/users/me` | Get current logged-in user |
| **PATCH** | `/users/update-account` | Update basic account details |
| **PATCH** | `/users/avatar` | Update avatar (Multipart/form-data) |
| **PATCH** | `/users/cover-image` | Update cover image (Multipart/form-data) |
| **GET** | `/users/c/{channelId}` | Get specific channel profile |
| **GET** | `/users/history` | Get watch history |

---

## 2. Videos Module
*CRUD and publish operations for video content.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/videos` | Get all videos (supports query filters) |
| **POST** | `/videos` | Publish video (Multipart/form-data) |
| **GET** | `/videos/:videoId` | Get video by ID |
| **PATCH** | `/videos/:videoId` | Update video details |
| **DELETE** | `/videos/:videoId` | Delete video |
| **PATCH** | `/videos/:videoId/toggle-publish` | Toggle publish status |
| **GET** | `/videos/:videoId/views` | Get views count |

---

## 3. Subscriptions Module
*Manage channel subscriptions and subscriber counts.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/subscriptions/channels` | Get channels user is subscribed to |
| **POST** | `/subscriptions/c/:channelId` | Toggle channel subscription |
| **GET** | `/subscriptions/c/:channelId/subscribers` | Get subscribers of a channel |

---

## 4. Playlists Module
*Playlist management and video organization.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/playlists` | Create playlist |
| **GET** | `/playlists/user/:userId` | Get user playlists |
| **GET** | `/playlists/:playlistId` | Get playlist by ID |
| **PATCH** | `/playlists/:playlistId` | Update playlist details |
| **DELETE** | `/playlists/:playlistId` | Delete playlist |
| **POST** | `/playlists/:playlistId/videos/:videoId` | Add video to playlist |
| **DELETE** | `/playlists/:playlistId/videos/:videoId` | Remove video from playlist |

---

## 5. Dashboard Module
*Creator-level statistics and video management.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/dashboard/stats` | Get channel statistics |
| **GET** | `/dashboard/videos` | Get channel videos for dashboard |

---

## 6. Tweets Module
*Short-form text posts.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/tweets` | Create tweet |
| **GET** | `/tweets/user/:userId` | Get user tweets |
| **PATCH** | `/tweets/:tweetId` | Update tweet |
| **DELETE** | `/tweets/:tweetId` | Delete tweet |

---

## 7. Comments Module
*Video discussion and engagement.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/comments/:videoId` | Get comments for a video |
| **POST** | `/comments/:videoId` | Add comment toideos for the user
