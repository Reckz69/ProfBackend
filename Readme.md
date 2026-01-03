# 📹 Pro-Stream Backend | Node.js, MongoDB & Cloudinary

A production-grade backend architecture for a video hosting platform. This project focuses on building a secure, scalable, and high-performance engine using industry-standard patterns.

---

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Media Management:** Cloudinary API & Multer Middleware
- **Security:** JWT (Access/Refresh Tokens) & Bcrypt
- **Utilities:** Postman for API testing

## 🚀 Key Features & Implementation
### 🔐 Advanced Authentication
- Implemented a dual-token system (Access & Refresh Tokens) stored in HTTP-only cookies for maximum security.
- Secure password hashing and custom validation logic.

### 📊 Complex Data Aggregation
- Leveraged **MongoDB Aggregation Pipelines** to compute real-time metrics such as subscriber counts, channel stats, and personalized watch histories.
- Check out the [Detailed Aggregation Pipeline Documentation](./AGGREGATIONS.md) 
- Used `mongoose-aggregate-paginate-v2` for efficient, paginated data retrieval.

### ☁️ Media Handling
- Designed a robust file upload pipeline using **Multer** for local handling and **Cloudinary** for cloud storage.
- Automated cleanup of local server files after successful cloud upload.

### 🏗️ Clean Architecture
- Standardized API responses and global error handling using custom `ApiError` and `ApiResponse` classes.
- Modular folder structure: Controllers, Models, Routes, and Utils.

## 🛣️ API Roadmap (Next Phases)
- [ ] Phase 2: Frontend integration with React & Tailwind CSS.
- [ ] Phase 3: Deployment on AWS/DigitalOcean with CI/CD.

---
## 🧪 Local Setup
1. Clone the repo: `git clone ...`
2. Install dependencies: `npm install`
3. Configure `.env` (JWT_SECRET, CLOUDINARY_URL, MONGODB_URI)
4. Start server: `npm run dev`

