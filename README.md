# RizeOS –  Job Portal

RizeOS is a **Full-Stack Job Portal** with **Web3 smart contracts, MongoDB backend, and React frontend**.
It allows users to **register, login, post jobs, and get AI-powered job recommendations**, with **on-chain payments via smart contracts**.

---

## ✨ Features

* 🔐 **Authentication** – Register & Login with JWT
* 📰 **Job Feed** – Search jobs, filter by skills
* 💼 **Job Posting** – Post jobs with Web3 payment fees
* ⛓️ **Blockchain Integration** – Smart contract-based payments (Hardhat + Ethereum testnet)
* 🛠️ **Admin Features** – Fee collection in `wei`
* ⚡ **Modern Tech** – React + Express + MongoDB + Hardhat

---

## 📂 Project Structure

```
rizeos-job-portal/
│── contracts/       # Smart contracts (Hardhat)
│   └── .env         # Blockchain configs
│── server/          # Backend (Node.js + Express + MongoDB)
│   └── .env         # API & DB configs
│── client/          # Frontend (React + Vite)
│   └── .env         # API URL config
│── README.md
```

---

## ⚙️ Environment Setup

You must create **3 `.env` files** with the following configs:

### 1️⃣ contracts/.env

```env
INFURA_KEY=your_infura_project_key
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
```

### 2️⃣ server/.env

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/rizeos_full_pro
JWT_SECRET=change_me

# Web3 settings
ADMIN_WALLET=0x0000000000000000000000000000000000000000
FEE_WEI=10000000000000
FEE_NETWORK_CHAIN_ID=11155111
CONTRACT_ADDRESS=

# Security / CORS
ALLOWED_ORIGIN=http://localhost:5173

# Dev seed
SEED=1
```

### 3️⃣ client/.env

```env
VITE_API_URL=http://localhost:4000
```

---

## 🗄️ MongoDB Setup

### 🔹 Local MongoDB

1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start service:

   ```bash
   mongod
   ```
3. Create database and collections:

   ```bash
   mongosh
   use rizeos_full_pro
   db.createCollection("users")
   db.createCollection("transactions")
   ```

### 🔹 MongoDB Atlas (Cloud)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Copy connection string:

   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/rizeos_full_pro
   ```
4. Update in `server/.env`:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/rizeos_full_pro
   ```

---

## 🚀 Installation

Clone repository and install dependencies:

```bash
git clone https://github.com/utkarshverma439/RizeOS-Job-Portal.git
cd rizeos-job-portal
```

**Contracts (Hardhat):**

```bash
cd contracts
npm install
```

**Backend (Express + MongoDB):**

```bash
cd ../server
npm install
```

**Frontend (React + Vite):**

```bash
cd ../client
npm install
```

---

## ▶️ Running the Project

### 1. Start Hardhat (contracts)

```bash
cd contracts
npx hardhat node
```

Deploy smart contract:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 2. Start Backend

```bash
cd ../server
npm run dev
```

Runs on 👉 `http://localhost:4000`

### 3. Start Frontend

```bash
cd ../client
npm run dev
```

Runs on 👉 `http://localhost:5173`

---

## 🔑 Demo Credentials

```text
Email: demo@rizeos.dev
Password: demo1234
```

---

## 🖼️ Screenshots

### 🔑 Register Page

![Register Page](https://drive.google.com/uc?id=1C0og-oGlHrAPQk6IvyYzWOD11cvkYeFa)

### 🔐 Login Page

![Login Page](https://drive.google.com/uc?id=1naA-Oe3OC5mAvR2dC3puPXSyJhlsmm29)

### 📰 Feed Page

![Feed Page](https://drive.google.com/uc?id=1eFsPMTORlZC-NSPo3-KpN8q4fq0H-E5A)

---

## 📌 Usage Flow

1. Register → Create an account
2. Login → Access dashboard
3. Feed → Explore job listings
4. Post Job → Pay on-chain fee & publish

---

## 🔮 Future Enhancements

* ✅ Wallet login (MetaMask)
* ✅ Advanced AI job matching
* ✅ Admin dashboard for job approvals

---
## 👨‍💻 Developed By

* **Utkarsh Verma**  
* Powered by **Next.js + Supabase + TailwindCSS**  
* Inspired by real-world SaaS authentication & dashboard design challenges
---

## 🤝 Contributing

Contributions are welcome! Fork the repo & submit a PR.

---

## 📄 License

[MIT License](LICENSE) © 2025 RizeOS

---

