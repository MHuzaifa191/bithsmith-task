# RecipeStudio: Architecture Design

## Deployment 

* Amazon RDS for DB (Postgres), S3 for Storage, Cloudfront as CDN EC2 for front and backend (Use elastic load balancer and autoscaling groups to manage scalability). Also dockerize app to improve scalability and ease of deployment.
* Use Jenkins for CI/CD pipeline and create a separte subdomain. Or can also use Github actions for an easy pipeline.

## Optimization techniques

* Upload images from frontend directly to reduce api payload size. Use paginated queries to reduce payload size. Serialize data to reduce payload size. Use same ec2 deployment instead of a subdomain to eliminate CORS pre-flight checks and improve performance.
* Mimize payload size on all api's by testing them thouroughly with postman. 
* For users with low internet speeds, cache all image size versions to display the highly available optimized image to user.

## Tech Stack

**Frontend:**

* Next.js with Tailwind CSS 
 ( Next comes with it's image optimization and SSR techniques making the app feel snappy and faster than React. )

**Backend:**

* Node.js with Express.js
   (It is non-blocking, scalable and works great with React/Next)

**Database:**

* PostgreSQL
  (Great read write speeds and can handle complex queries)

**Notifications:**

* Websockets
  (Socket.io for real-time notifications and it would be a custom solution for push notifications)

**Authentication:**

* Session based authentication (express-session in Express)

**Caching:**

* Redis or Memcached
  (Cache repetitive queries and APIs, Use a separate ec2 instance to handle caching)


## Data Flow

**Posting a Recipe:**

1. User submits recipe data from the frontend using API.
2. User sends session id or token id along to authenticate himself
3. For optimization we can upload image directly from frontend to s3 to reduce payload size.
4. Backend validated data and returns response with recipe id.

**Liking a Recipe:**

1. User clicks "Like" on a recipe.
2. Frontend sends a POST request to backend.
3. Backend creates record and sends notification to user

**Loading the Feed:**

1. Frontend sends a GET request to backend.
2. We use paginated queries to return data
3. Frontend renders the feed data.

