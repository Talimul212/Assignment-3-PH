# Assignment 3

The goal of this assignment is to develop a backend for a blogging platform where users can write, update, and delete their blogs. The system will have two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

### Admin:
Will be created manually in the database with predefined credentials.
Can delete any blog.
Can block any user by updating a property isBlocked.
Cannot update any blog.
### User:
Can register and log in.
Can create blogs (only when logged in).
Can update and delete their own blogs.
Cannot perform admin actions.
## Features

- **TypeScript**: Type-safe development for better reliability.
- **Express**: Lightweight and flexible web framework for building APIs.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Hot Reloading**: Enabled with `ts-node-dev` for seamless development.
- **Linting**: Ensures code quality using ESLint.
- **Formatting**: Consistent code style using Prettier.
- **Environment Variables**: Managed securely with `dotenv`.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (>= 18.x)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Blog-Assignment-3
   
### APi
