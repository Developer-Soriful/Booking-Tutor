# 🧑‍🏫 Language Exchange - Online Tutor Booking Platform

Welcome to **Language Exchange**, an online tutor booking platform where users can easily find and book tutors based on language categories. Inspired by platforms like Preply and Italki, this web app is designed for accessible and friendly learning.

---

## 🚀 Live Site
🔗 [Live Website Link](https://assignment-11-19334.web.app)

---

## 🎯 Project Purpose
This project is part of **Assignment-11-assignment_category_14**. It evaluates your skills in full-stack development, focusing on routing, authentication, CRUD operations, deployment, responsiveness, and user experience.

---

## 🧩 Key Features

### 👨‍🏫 Tutor Booking System
- Find tutors by language categories
- View detailed tutor profiles
- Book tutors securely
- Submit reviews

### 📝 Tutorial Management
- Add new tutorials (Private route)
- View and update personal tutorials
- Delete unwanted tutorials

### 👥 User Features
- JWT-based secured login with Firebase
- Google sign-in integration
- Profile image with name dropdown
- Fully responsive UI for all devices
- Dark/Light mode toggle

### 📈 Home Page Sections
- Banner/Carousel section
- Stats section (Tutor count, Review count, Languages, Users)
- Language Category Cards (9+)
- 2 additional engaging sections

### 🔍 Search Functionality
- Search tutors based on language on the "Find Tutors" page

---

## 🔐 Authentication & Authorization

- **Firebase Authentication** (Email/Password + Google Sign-in)
- **JWT Token** implementation (token generated on login and sent with secure requests)
- Protected routes with proper redirection
- Firebase Admin SDK used in backend for token verification

---

## 🌐 Routing Structure

- `/` - Home Page  
- `/find-tutors` - All Tutors  
- `/find-tutors/:category` - Category-based tutors  
- `/tutor/:details` - Tutor Details *(Private)*  
- `/add-tutorials` - Add Tutorial *(Private)*  
- `/my-tutorials` - My Added Tutorials *(Private)*  
- `/my-booked-tutors` - Booked Tutors *(Private)*  
- `/login` - Login Page  
- `/register` - Registration Page  
- `*` - 404 Error Page  

---

## 🧪 Form Fields

### Registration:
- Name
- Email
- Password
- Photo URL

### Add Tutorial:
- User Name
- Email
- Image
- Language
- Price
- Description
- Review (0 default)

### Update Tutorial:
- Editable: image, language, price, description  
- Non-editable: name, email, review

---

## 📦 NPM Packages Used

**Frontend:**
- React
- React Router DOM
- Axios
- Firebase
- Tailwind CSS
- DaisyUI / (Any other UI library used)
- Framer Motion *(if implemented)*

**Backend:**
- Express.js
- MongoDB
- Firebase Admin
- CORS
- JSON Web Token (JWT)
- Dotenv

---

## 💻 Responsive Design

✅ Mobile | ✅ Tablet | ✅ Desktop  
All screens are optimized with proper spacing, alignment, and color contrast. fully done here

---

## ⚙️ Deployment Checklist

- ✅ Firebase keys stored in `.env` file
- ✅ MongoDB credentials secured
- ✅ No CORS / 404 / 504 errors
- ✅ All routes reload without crashing
- ✅ Domain added in Firebase Auth
- ✅ JWT protects private routes without redirect issues

---

## 🧠 Optional Features Implemented

- ✅ Dark/Light Mode Toggle
- ✅ Spinner on data loading

---

**Thank You! 😊**
This project showcases your ability to create industry-level full-stack applications. Best of luck in your evaluation!

