# 💧 Water Management System

A Node.js-based backend system for managing daily water meter readings per household. Detects spillovers, summarizes usage, and tracks top consumers using MongoDB and Express.

## 🚀 Features

- 🔍 Daily meter reading per house
- 📊 Usage summary by house
- 🚨 Spillover detection
- 🏠 Top water consumers (daily/weekly)
- 🔐 Secure with `.env` support
- 📄 Swagger API documentation

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Documentation:** Swagger
- **Environment:** dotenv

## 📦 Installation

```bash
git clone https://github.com/Premkumarv08/water-management.git
cd water-management
npm install

Here's a simple, clean `README.md` for your **Water Management System** project. You can customize it further based on your exact implementation:

## 📦 Installation

```bash
git clone https://github.com/Premkumarv08/water-management.git
cd water-management
npm install
````

## ⚙️ Setup

1. Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/water-management
```

2. Start the server:

```bash
npm start
```

## 🧪 API Documentation

Open [http://localhost:3000/swagger](http://localhost:3000/swagger) after running the server to explore the Swagger docs.

## 📁 Project Structure

```
water-management/
├── src/
│   ├── models/
│   ├── services/
│   ├── routes/
│   └── controllers/
├── index.js
├── .env
├── .gitignore
├── package.json
└── swagger.yaml
```

## 📝 License

MIT © [Premkumar V](https://github.com/Premkumarv08)
