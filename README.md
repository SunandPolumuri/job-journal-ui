# JobJournal

A comprehensive web application designed to streamline the job application process, providing users with an intuitive way to track job applications, manage application statuses, and prepare for upcoming interviews. The app visualizes the progress of job applications through an interactive timeline, ensuring users stay organized and informed throughout their job search.

## Key Features

**Visually Engaging and Fully Responsive UI:** The application boasts a sleek, user-friendly design that adapts seamlessly to all screen sizes. Users can easily navigate through job application cards, view detailed information, and track status progress in an interactive and visually appealing layout.

**Streamlined Job Application Tracking:** Enable users to seamlessly track and update the status of their job applications through an intuitive and interactive timeline, providing clear visibility into the entire application lifecycle.

**Comprehensive Job Application Details:** Allow users to store and manage key information related to each application, with the added ability to attach personalized notes to each status update, creating a journal-like record of their application journey.

**Dynamic Timeline Visualization:** Present users with a visually engaging and interactive timeline that provides a clear, real-time view of their job application progress, making it easy to track and manage each stage of the application process.
## Technologies Used

### Frontend:

**React:** Component-based architecture for building a dynamic and responsive user interface.  
**Tailwind CSS:** Utility-first CSS framework for rapid, customizable styling.  
**RTK Query:** Efficient state management and API interaction to streamline data fetching and caching.

### Backend:

**Node.js:** Server-side JavaScript environment for handling API requests and business logic.  
**Express.js:** Web application framework to simplify routing and middleware management.  
**PostgreSQL:** Relational database management system for secure and scalable data storage.  

## Installation & Setup

Follow the steps below to set up and run the application locally.

### 1. Clone the Repositories

Begin by cloning both the **frontend** and **backend** repositories to your local machine:

```bash
# Clone the frontend repository
git clone https://github.com/SunandPolumuri/job-journal-ui.git
cd job-journal-ui

# Clone the backend repository
git clone https://github.com/SunandPolumuri/job-journal-service.git
cd job-journal-service
```

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd job-journal-ui
```
Create a .env file in the frontend directory and add the following variable to integrate with the backend locally:
```ini
VITE_API_BASE_URL="http://localhost:3001/api"
```
Install the required dependencies:
```bash
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The frontend will now be running on http://localhost:5173.

### 3. Backend Setup

Navigate to the backend directory:
```bash
cd job-journal-service
```
Install the required dependencies:
```bash
npm install
```
Create a .env file in the backend directory and add the following environment variables for your PostgreSQL setup and JWT configuration:
```ini
PORT=<desired-port>                  # Port for the backend server
PG_USER=<your-postgres-username>     # PostgreSQL user
PG_HOST=localhost                    # PostgreSQL host (use localhost if running locally)
PG_DATABASE=<your-database-name>     # PostgreSQL database name
PG_PASSWORD=<your-database-password> # PostgreSQL password
PG_PORT=<postgres-port>              # PostgreSQL port (default is 5432)
JWT_SECRET_KEY=<your-jwt-secret>     # Secret key for JWT authentication
```
Create Database Tables:  
Navigate to the `src/config/sql` folder inside the backend project. Inside, you'll find SQL commands to create the necessary tables.
Open the SQL files and run the commands in your local PostgreSQL instance to set up the required tables.  
Start the backend server using the development script:
```bash
npm run dev
```
The backend will now be running on http://localhost:3001 (or the port you have specified in your .env).
