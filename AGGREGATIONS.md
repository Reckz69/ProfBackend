# MongoDB Aggregation Pipelines 📊

This document breaks down the complex data processing logic used in the **Pro-Stream** backend. By offloading calculations to MongoDB's aggregation engine, we ensure high performance and reduce the load on the Node.js application layer.

---

## 1. User Channel Profile Pipeline
**Location:** `getUserChannelProfile` controller

This pipeline fetches a comprehensive overview of a user's channel, including subscriber counts and subscription status relative to the currently logged-in user.



### The Pipeline Stages:

#### Phase 1: Filtering & Initialization
1.  **$match**: Filters the collection to find the specific user by their `username`.
    - *Optimization:* Input is converted to lowercase to ensure case-insensitivity.

#### Phase 2: Relational Data Joins (Lookups)
2.  **$lookup (Subscribers)**: Performs a left outer join with the `subscriptions` collection where the current user is the `channel`.
3.  **$lookup (SubscribedTo)**: Performs a join with the `subscriptions` collection where the current user is the `subscriber`.

#### Phase 3: Computed Fields
4.  **$addFields**: Dynamically calculates data for the response:
    - `subscriberCount`: Uses `$size` to count the length of the subscribers array.
    - `channelsSubscribedToCount`: Uses `$size` to count how many channels this user follows.
    - `isSubscribed`: Uses `$cond` and `$in` to check if the `req.user._id` exists within the `subscribers` array, providing real-time "Follow/Unfollow" state.

#### Phase 4: Data Shaping
5.  **$project**: Acts as a whitelist to ensure only necessary data (Full Name, Avatar, Counts, etc.) is sent to the client, keeping the payload small and protecting sensitive fields like passwords.

---

## 2. Watch History Pipeline
**Location:** `getChannelHistory` controller

A nested aggregation that performs a "Double Lookup" to retrieve video details and the owner's profile info simultaneously.

### The Pipeline Stages:
1.  **$match**: Targets the specific user by their `ObjectId`.
2.  **$lookup (Video Details)**: Joins the user's `watchHistory` (array of IDs) with the `videos` collection.
3.  **Nested $lookup**: Inside the video lookup, a sub-pipeline joins the `users` collection to fetch the `owner` details (Username and Avatar) for each video in the history.
4.  **$addFields ($first)**: Flattens the owner array into a single object for a cleaner JSON response.

---

## Why use Aggregations?
- **Efficiency:** Processing 10,000+ documents in the DB is significantly faster than fetching them all into Node.js memory.
- **Atomic Operations:** Ensures data consistency by performing lookups and counts in a single database trip.
- **Frontend Ready:** The data is reshaped directly by the database, meaning the frontend can render the UI immediately without extra processing.
