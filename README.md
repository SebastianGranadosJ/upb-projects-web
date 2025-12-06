# 📰 UPB Integrated Projects Showcase  
*A news-style platform for highlighting student projects at Pontificia Bolivariana University(UPB)*

This project is a web application designed to present the projects developed by students of the **Universidad Pontificia Bolivariana (UPB)** during the **Integrative Projects Exhibition** of the Systems and Informatics Engineering program.  
The platform displays all submitted projects as article-style entries, including titles, descriptions, images, and **teacher comments** with their opinions and evaluations of each project.

---

## 🏗️ Architecture & Technologies

The system is built using an **MVT (Model–View–Template)** architecture written entirely in **TypeScript** and executed on **Node.js**.  
Each section of the platform is structured as an independent template using **EJS (.ejs)**, making the UI modular, reusable, and easy to maintain.

### 🔧 Tech Stack
- **TypeScript** — strongly typed backend logic  
- **Node.js** — runtime environment  
- **Express.js** — routing and server management  
- **EJS Templates** — UI rendering following the MVT pattern  
- **CSS / HTML5** — layout and styling  
- **Jest** — unit testing  
- **Puppeteer** — end-to-end (E2E) testing for user flows  
- **MVT Architecture** — clear separation of concerns via Models, Views, and Templates  

---

## 📚 Main Features

### 📝 Project Articles  
Each project submitted by students appears as an article-style card that includes:

- **Project Title**  
- **Project Name**  
- **Team Members**  
- **Course / Subject (Materia)**  
- **Quotes from Professors** evaluated during the presentation  
- **Professor Picture**  
- **Professor Name**  

### 🔍 News Search  
The platform includes an integrated **search feature** allowing users to quickly filter and find project articles by:

- Title  
- Keywords  
- Team member names  
- Course  
- Professor  

### 🌐 Modular Templates  
- Every page or section of the site is a separate **EJS template**  
- Easy to extend, modify, and reorganize  
- Encourages template reusability  

### 🧪 Testing  
- **Unit Tests (Jest):** validate business logic and utility functions  
- **End-to-End Tests (Puppeteer):** simulate real user navigation  
- Ensures reliability and proper functioning of the entire platform  

---

## 🎉 Final Notes

Thank you for visiting this repository!  
Feel free to explore the code, send suggestions, or use this project as learning material!!!  
Your feedback is always welcome :D

