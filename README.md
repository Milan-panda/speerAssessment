# Speer Assessment

This project implements a secure and scalable RESTful API for managing notes. It allows users to perform CRUD operations on notes, share notes with other users, and search notes based on keywords.

## Technologies Used

- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Rate Limiting**: Express Rate Limit

## Project Structure

- `config/`: Configuration files (database configuration, authentication setup)
- `controllers/`: Controllers for handling API endpoints
- `models/`: MongoDB schemas (User and Note models)
- `routes/`: API routes (authRoutes and noteRoutes)
- `middleware/`: Middleware functions (authentication and rate limiting)
- `app.js`: Main application file


## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Milan-panda/speerAssessment
   cd speerAssessment
2. **Install Dependencies**:
    ```bash 
    npm install
3. **Database Configuration**:
    - **Ensure MongoDB is installed and running**.
    - **Update the `config/database.js` file with your MongoDB connection details**.
4. **Environment Variables**:
    - **Create a `.env` file with the required environment variables**.
        ```bash
        PORT=PORT_NO
        MONGODB_URI=MONGODB_URL
        JWT_SECRET_KEY=SECRET_KEY
5. **Running the Application**:
    ```bash 
    npm start
## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account and receive an access token.

### Note Endpoints

- `GET /api/notes`: Get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID for the authenticated user.
- `POST /api/notes`: Create a new note for the authenticated user.
- `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.
- `GET /api/search?q=:query`: Search for notes based on keywords for the authenticated user.
