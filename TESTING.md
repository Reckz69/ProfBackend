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


The backend is an Express.js app with a base API prefix of /api/v1. I grouped endpoints into folders based on feature modules. There are 42 requests total.

1. Users
Typical auth and profile flows:

POST /api/v1/users/register – Register user
POST /api/v1/users/login – Login user
POST /api/v1/users/logout – Logout user
POST /api/v1/users/refresh-token – Refresh access token
POST /api/v1/users/change-password – Change password
GET  /api/v1/users/me – Get current logged-in user
PATCH /api/v1/users/update-account – Update basic account details
PATCH /api/v1/users/avatar – Update avatar (multipart/form-data with file)
PATCH /api/v1/users/cover-image – Update cover image (multipart/form-data with file)
GET  /api/v1/users/c/{channelId} – Get channel profile
GET  /api/v1/users/history – Get watch history
Most of these use Authorization: Bearer {{access_token}}.

2. Videos
CRUD and publish operations for videos:

GET    /api/v1/videos – Get all videos (supports query filters)
POST   /api/v1/videos – Publish video (multipart/form-data: video file, thumbnail, title, description)
GET    /api/v1/videos/:videoId – Get video by ID
PATCH  /api/v1/videos/:videoId – Update video details
DELETE /api/v1/videos/:videoId – Delete video
PATCH  /api/v1/videos/:videoId/toggle-publish – Toggle publish status
GET    /api/v1/videos/:videoId/views – Get views count (if implemented in code)
3. Subscriptions
Subscribe / unsubscribe channels and list subscriptions:

GET  /api/v1/subscriptions/channels – Get channels the user subscribed to
POST /api/v1/subscriptions/c/:channelId – Toggle channel subscription
GET  /api/v1/subscriptions/c/:channelId/subscribers – Get subscribers of a channel
4. Playlists
Playlist management and video association:

POST   /api/v1/playlists – Create playlist
GET    /api/v1/playlists/user/:userId – Get user playlists
GET    /api/v1/playlists/:playlistId – Get playlist by ID
PATCH  /api/v1/playlists/:playlistId – Update playlist details
DELETE /api/v1/playlists/:playlistId – Delete playlist
POST   /api/v1/playlists/:playlistId/videos/:videoId – Add video to playlist
DELETE /api/v1/playlists/:playlistId/videos/:videoId – Remove video from playlist
5. Dashboard
Channel-level stats:

GET /api/v1/dashboard/stats – Get channel statistics
GET /api/v1/dashboard/videos – Get channel videos for dashboard
6. Tweets
Short text posts:

POST   /api/v1/tweets – Create tweet
GET    /api/v1/tweets/user/:userId – Get user tweets
PATCH  /api/v1/tweets/:tweetId – Update tweet
DELETE /api/v1/tweets/:tweetId – Delete tweet
7. Comments
Video comments:

GET    /api/v1/comments/:videoId – Get comments for a video
POST   /api/v1/comments/:videoId – Add comment to a video
PATCH  /api/v1/comments/:commentId – Update comment
DELETE /api/v1/comments/:commentId – Delete comment
8. Likes
Like toggles across entities:

POST /api/v1/likes/video/:videoId – Toggle like on video
GET  /api/v1/likes/videos – Get all liked videos for user
POST /api/v1/likes/tweet/:tweetId – Toggle like on tweet
POST /api/v1/likes/comment/:commentId – Toggle like on comment


How to use the collection
Start your backend on the same port used in code (the collection assumes {{base_url}} = http://localhost:3000).
In Postman, set an environment variable:
base_url = http://localhost:3000
Use the Register and Login requests in the Users folder.
From the Login response, copy the access token and set:
access_token = <JWT>
in your environment, so all protected requests will work.
