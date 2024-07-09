# Node.js User Management Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Docker](#docker)
  - [Building and Running with Docker](#building-and-running-with-docker)
- [GitHub Actions](#github-actions)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This is a simple Node.js application for managing users. It allows you to add, retrieve, update, and delete users. The application uses Express for the backend, EJS for templating, and MongoDB as the database.

## Features
- Add, retrieve, update, and delete users.
- Uses MongoDB for data storage.
- EJS templating engine for dynamic HTML rendering.
- Bootstrap for responsive design.
- Dockerized for easy deployment.
- CI/CD pipeline with GitHub Actions.

## Requirements
- Node.js (v14 or higher)
- MongoDB
- Docker (optional, for containerization)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URL=mongodb://localhost:27017/nodejs-app
    ```

## Running the Application
1. Start MongoDB:
    Ensure MongoDB is running on your local machine or in a Docker container.

2. Start the application:
    ```sh
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Running Tests
To run tests, use the following command:
```sh
npm test
```

## GitHub Actions

This project includes a CI/CD pipeline using GitHub Actions. The workflow file is located at `.github/workflows/ci.yml`. It handles:
- Installing dependencies
- Running tests
- Building the Docker image
- Pushing the Docker image to Docker Hub
- Optional: Deploying to a Kubernetes cluster
- Sending a notification on successful deployment

### Setting up GitHub Secrets

To use GitHub Actions, you need to set up the following secrets in your GitHub repository:
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password
- `TELEGRAM_CHAT_ID`: Your Telegram chat ID for notifications
- `TELEGRAM_TOKEN`: Your Telegram bot token

You can add these secrets in the repository settings under `Secrets and variables > Actions`.
