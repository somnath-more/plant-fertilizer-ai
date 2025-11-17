# 🌱 Plant Fertilizer Assistant — React(Vite) + SpringBoot

A modern AI-powered plant-care application that identifies plants from uploaded images, analyzes growth stages, recommends optimal organic fertilizers, and enhances user support through an integrated chatbot.

---

## 🚀 Features

* 🔐 **Authentication** (Login / Signup)
* 🪴 **Plant Identification** using uploaded images
* 🌿 **Fertilizer Recommendation Engine** based on growth stage
* 💬 **AI Chatbot Support**
* 📌 **Bookmark System** for plant guides & fertilizer tips
* 🎨 **Reusable UI Components** (Atoms / Molecules / Organisms)
* 📡 **Backend Microservices** using Spring Boot & GraphQL
* 🗄️ **MySQL database** (hosted on AWS EC2)

---

## 🏗️ Tech Stack

### Frontend

* React + Vite
* TypeScript
* Tailwind CSS
* TanStack Query
* Zustand
* MUI (optional for some components)

### Backend
  * Inprogress Development
<!-- * Spring Boot Microservices
* GraphQL API
* MySQL Database
* AWS EC2 deployment -->

---

## 📁 Project Structure (Frontend)

```
src/
 ├── components/
 │    ├── atoms/
 │    ├── molecules/
 │    ├── organisms/
 ├── hooks/
 ├── pages/
 ├── services/
 │    ├── api/
 ├── store/
 ├── utils/
 ├── App.tsx
 └── main.tsx
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repo

```
git clone https://github.com/somnath-more/plant-fertilizer-ai
cd plant-fertilizer-ai
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Start the development server

```
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```
VITE_API_URL="http://localhost:8080"
VITE_IMAGE_ANALYSIS_API="<your-model-endpoint>"
```





## 🤖 AI Chatbot Flow

1. User asks question OR uploads a plant image.
2. Backend identifies plant + growth stage.
3. AI suggests fertilizer & care routine.
4. User can bookmark suggestions.

## 📌 Commit Guidelines

We use **Conventional Commits**:

* `feat:` new feature
* `fix:` bug fix
* `refactor:` code improvement
* `style:` formatting only
* `docs:` documentation updates
* `chore:` dependency/tool updates

---



