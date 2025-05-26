# 🏥 MEDBLOCKS - Patient Management System

[![Demo](https://img.shields.io/badge/Demo-Live-blue?logo=vercel&style=for-the-badge)](https://patient-system-alpha.vercel.app/)
[![License](https://img.shields.io/github/license/dilbarM/Patient_system?style=for-the-badge)](LICENSE)
[![Made with React](https://img.shields.io/badge/React-2023-blue?logo=react&style=for-the-badge)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)

> A modern, browser-based patient management app using **React** and **PGlite** (PostgreSQL in your browser).

---

## 🚀 Demo

👉 **Try it live:** [patient-system-alpha.vercel.app](https://patient-system-alpha.vercel.app/)

---

## ✨ Features

- 📝 **Register new patients**
- 🔍 **Query records** using raw SQL
- 💾 **Persistent** patient data across refreshes
- 💻 **Multi-tab support:** Data stays in sync everywhere
- 🗂️ **Fast & local**: All data stays in your browser

---

## ⚙️ Setup

```bash
# 1. Clone the repository
git clone https://github.com/dilbarM/Patient_system.git
cd Patient_system

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
MEDBLOCKS - Patient-management-system


A browser-based patient management app using React and PGlite.





Demo: https://patient-system-alpha.vercel.app/




Features:

>Register new patients

>Query records using raw Sql

>persist patient data across page refreshes

>Support usage across multiple tabs and make sure writes and reads are synchronized.








Setup:


Clone the repo: https://github.com/dilbarM/Patient_system.git
cd Patient_system








Install dependencies:


npm install

npm run dev

Open http://localhost:5173 in your browser













How It Works:



>The database runs inside a Web Worker using PGlite, storing data in IndexedDB.

>Patient data is stored in a patients table with fields like name, DOB, gender, contact info, and medical notes.

>You can add new patients, search existing ones, and run SQL queries in the app.










Technologies:





>React

>TypeScript

>PGlite (PostgreSQL in browser)

>React Router

>Vite

