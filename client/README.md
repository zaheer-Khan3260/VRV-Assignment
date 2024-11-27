# Role Based Access Control

## Project Overview
This React application provides a comprehensive user management system with advanced features including recent log tracking, user search, and role-based filtering.

## Local Setup and Installation

### Prerequisites
- Node.js (Version 16.0 or higher)
- npm (Node Package Manager)
- Git

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/zaheer-Khan3260/VRV-Assignment.git
   cd client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

### Project Structure
```
project-root/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── customHooks
│   └── assests
│
├── public/
└── README.md
```

## Features

### 1. Recent Log Tracking
The application includes a robust recent log feature that captures and displays user activities:

- **Functionality**: 
  - Tracks user interactions and system events
  - Stores timestamp and details of each log entry
  - Provides a chronological view of recent activities

- **Technical Implementation**:
  - Uses local storage or state management for log persistence
  - Implements a mechanism to limit log entries (e.g., last 50 entries)
  - Allows filtering and sorting of log entries

### 2. User Search
A powerful search functionality to find users quickly:

- **Search Capabilities**:
  - Search users by full name
  - Case-insensitive search
  - Real-time search results
  - Handles partial name matches

- **Example Search Logic**
  ```javascript
  const searchUsers = (searchTerm) => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  ```

### 3. User Role Filtering
Comprehensive role-based user filtering:

- **Role Types**:
  - Admin
  - Manager
  - Employee
  - Contractor

- **Filtering Mechanism**
  ```javascript
  const filterUsersByRole = (role) => {
    return users.filter(user => user.role === role);
  }
  ```

## Performance Considerations
- Implemented efficient search and filter algorithms
- Minimized re-renders using React hooks
- Optimized search functionality with debounce technique

