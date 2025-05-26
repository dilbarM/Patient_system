                    MEDBLOCKS - Patient-management-system


A browser-based patient management app using React and PGlite.






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


Demo: https://patient-system-alpha.vercel.app/










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

