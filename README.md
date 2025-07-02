# 🎫 AI-Powered Ticket Management System

A smart ticketing system that leverages AI to **automatically categorize, prioritize, and assign** support tickets to the most suitable moderators. Built to streamline support workflows using cutting-edge tools like **Google Gemini**, **Inngest**, and **Node.js**.

---

## 🚀 Features

### 🧠 AI-Powered Ticket Processing
- Automatic ticket categorization
- Smart priority assignment
- AI-generated notes for moderators
- Gemini-powered skill detection and ticket analysis

### 🧑‍💻 Smart Moderator Assignment
- Regex-based skill matching
- Auto-assignment to moderators based on skills
- Fallback to Admin if no match found

### 🔐 User Management
- Role-based access control (User, Moderator, Admin)
- Moderator skill tagging and matching
- JWT-based authentication and authorization

### ⚙️ Background Processing
- Event-driven with **Inngest**
- Asynchronous ticket updates
- Automated email notifications via **Mailtrap**

---

## 🛠️ Tech Stack

| Layer              | Tech                              |
|-------------------|-----------------------------------|
| Backend            | Node.js, Express                  |
| Frontend           | React + Vite                      |
| Database           | MongoDB                           |
| Authentication     | JWT                               |
| Background Jobs    | Inngest                           |
| AI Integration     | Google Gemini API                 |
| Emails             | Nodemailer + Mailtrap             |
| Dev Tools          | Nodemon, Vite, React Router       |

---

## 🔄 Ticket Processing Flow

1. **Ticket Creation**  
   User submits a ticket with a title and description.

2. **AI Processing**  
   Inngest triggers the `on-ticket-created` function.
   - Gemini AI analyzes the ticket
   - Outputs: category, priority, required skills, helpful notes

3. **Assignment**  
   - Moderator is matched based on skills
   - Falls back to Admin if no suitable match
   - Ticket is updated with assignment

4. **Notification**  
   - Email is sent to the assigned moderator
   - Contains ticket summary and AI-generated notes

---

## 📋 Prerequisites

- Node.js v14+
- MongoDB (Atlas or local)
- Google Gemini API Key
- Mailtrap account

---

## 📦 Setup

```bash
# Backend
cd ai-ticket-assistant
npm install
npm run dev

# Frontend
cd ../ai-ticket-frontend
npm install
npm run dev
