# Movie Booking App

This is a **React + Node.js + MongoDB** project for browsing and booking movies.

## Features
- Browse movies fetched from a local or public API
- Book tickets and view booking details
- MongoDB backend stores booking and user data
- Responsive and interactive UI with React

## Tech Stack
- **Frontend:** React, HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB (local or cloud)

## Project Flow Diagram

```mermaid
flowchart TD
    A[User] -->|Interacts| B[React Frontend]
    B -->|Sends API Requests| C[Node.js Backend]
    C -->|CRUD Operations| D[MongoDB Database]
    D -->|Returns Data| C
    C -->|API Response| B
    B -->|Updates UI| A
