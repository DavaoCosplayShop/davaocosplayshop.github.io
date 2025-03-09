# davaocosplayshop.github.io
Davao Cosplay Shop!

Hello! This is a project for our Web Programming project and at the same time a personal project. While this project was not primarily meant for having a website, I wanted to try whether or not if I can have the same database for both a desktop application (for a separate subject) and a website. Items will most likely not show up due to that the database used for this project is a local one particularly MS SQL.

**1. Project Overview**

  The DavaoCosplayShop system consists of:
  A .NET Core API (for costume management, rentals, and database interactions)
  A GitHub Pages frontend (for customers to view costumes and interact with the API)

**2. Setup Process**

  API Setup (ASP.NET Core)
  1. Required Dependencies
  Ensure you have the following installed:
  .NET SDK
  Microsoft SQL Server (or an alternative SQL database)
  Visual Studio or VS Code
  Git
  2. Environment Variables
  Create a .env or use appsettings.json to store:
  {
    "ConnectionStrings": {
      "DefaultConnection": "Server=your_server;Database=your_db;User Id=your_user;Password=your_password;"
    }
  }

**3. Cloning and Running the API Locally**

  git clone https://github.com/DavaoCosplayShop/DavaoCosplayShop-API.git
  cd DavaoCosplayShop-API
  dotnet restore  # Restore dependencies
  dotnet build    # Build the project
  dotnet run      # Start the API

The API should now be running on https://localhost:####.

**4. Troubleshooting**

**  API Issues**
    API Not Running Locally
    Ensure .NET SDK is installed.
    Check appsettings.json for the correct database connection.
    Try dotnet run --no-build to skip the build step if it’s already built.
  
**  CORS Errors**
    Ensure CORS policy includes AllowAnyOrigin() or specifies https://davaocosplayshop.github.io.
    Restart the API and clear browser cache.
  
**  Frontend Issues**
    GitHub Pages Not Loading Data
    Ensure API is deployed and reachable (test in the browser: https://davaocosplayshop-api.onrender.com/api/Costume).
    Check browser console for errors (F12 > Console in Chrome).
  
**  JavaScript Fetch Fails**
  Confirm the correct API URL is used in fetch() requests.

