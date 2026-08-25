# 🏦 React Bank Management Dashboard

A Bank Management Dashboard built with **React** and **Vite**. This application features real-time balance tracking, interactive SVG balance trend analytics, seamless multi-user fund transfers, account overview cards, and strict credit/debit usage limit checks.

---

## 🚀 Live Demo

🔗 **[View Live Banking Dashboard](https://khatera-ahad.github.io/react-bank-managment-dashboard/)**

---

## ✨ Key Features

* **📊 Interactive SVG Balance Graph:** Visualizes financial trends with dynamic SVG curves, interactive data nodes, and hover tooltips.
* **💸 Multi-User Fund Transfers:** Perform quick transfers between accounts with real-time balance deduction for senders and credit for receivers.
* **💳 Virtual Card Display:** Modern banking debit card UI displaying masked account numbers, cardholder details, and IBAN.
* **📜 Transaction History:** Full audit log tracking incoming credits, outgoing debits, target branch details, and formatted timestamps.
* **🛡️ Usage & Limit Checks:** Real-time checking against daily and monthly credit/debit limits to prevent overdrafts.
* **⚡ Safe Numeric Handling:** Defensive JavaScript math checks to safeguard balance state calculations from `NaN` or invalid inputs.
* **📱 Responsive Layout:** Grid-based layout built using modern CSS, optimized for desktop, tablet, and mobile viewing.

---

## 🛠️ Technologies Used

* **React.js** (Functional Components, Hooks, State Management)
* **Vite** (Lightning-fast frontend toolchain)
* **JavaScript (ES6+)** (Dynamic array operations, safe parsing)
* **Modular Standard CSS3** (No utility frameworks; custom flexbox, grid, gradients, and animations)
* **SVG** (Custom interactive linear trend charts)
* **Git & GitHub Pages** (Version control and gh-pages automated deployment)

---

## 🔄 Account Operations & Logic

### 1. Add Funds (Credit)
* Accepts positive numerical amounts.
* Validates requested deposit against `dailyCreditLimit`.
* Updates active balance and pushes a new credit item to `transactionHistory`.

### 2. Quick Transfer (Debit & Multi-User Credit)
* Validates sender balance and `dailyDebitLimit`.
* Automatically deducts funds from the sender (`user1`).
* Updates recipient's balance (`user2`) and records corresponding debit and credit logs on both sides simultaneously.

### 3. Navigation & Views
* Supports view switching across **Dashboard**, **Transactions**, **Accounts**, and **Settings** via the sidebar navigation.

---

## 🧩 React Components

| Component | Responsibility |
| :--- | :--- |
| `App.jsx` | Holds global account state, transfer handlers, and core view router logic. |
| `Sidebar.jsx` | Navigation menu for tab switching (`dashboard`, `transactions`, `accounts`, `settings`). |
| `Header.jsx` | Top app bar showing user profile information and logout trigger. |
| `BalanceOverview.jsx` | Renders total balance, deposit controls, and the interactive SVG chart. |
| `AccountCards.jsx` | Converts account state objects into dynamic banking card views. |
| `Transactions.jsx` | Formats and displays itemized debit and credit activity. |
| `MyCard.jsx` | Renders a styled virtual debit card populated with user props. |
| `QuickTransfer.jsx` | Controlled form for executing inter-account transfers. |
| `UsageLimits.jsx` | Displays daily/monthly spending usage progress. |
| `Settings.jsx` | User profile management and session control options. |

---

## 🧠 React Concepts Demonstrated

* **State Lifting & Management:** Centralized state in `App.jsx` flowing down to multiple sub-components.
* **Defensive Prop Rendering:** Default fallback prop values (`balance = 0`) preventing rendering crashes.
* **Controlled Components:** Handled form state (`useState`) for money deposits and transfers.
* **Dynamic Array Rendering:** Mapping over objects (`Object.values()`) and arrays (`.map()`) to render cards and logs.
* **Conditional Rendering:** Dynamic main-content view switching based on `activeTab` selection.

---

## 📁 Project Structure

```text
react-bank-managment-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── AccountCards.css
│   │   ├── AccountCards.jsx
│   │   ├── BalanceOverview.css
│   │   ├── BalanceOverview.jsx
│   │   ├── Header.jsx
│   │   ├── MyCard.css
│   │   ├── MyCard.jsx
│   │   ├── QuickTransfer.jsx
│   │   ├── Settings.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Transactions.jsx
│   │   └── UsageLimits.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md


### Local Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/khatera-ahad/react-bank-managment-dashboard.git](https://github.com/khatera-ahad/react-bank-managment-dashboard.git)
cd react-bank-managment-dashboard

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run development server:**
```bash
npm run dev

```


4. Open `http://localhost:5173` in your browser.

---

## 📦 Deployment to GitHub Pages

This repository is configured for automated deployment via standard Vite base paths and `gh-pages`.

1. Build and push updates to GitHub:
```bash
npm run build
npm run deploy

```


2. Ensure `vite.config.js` sets the repository path correctly:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/react-bank-managment-dashboard/',
});

```

## 👤 Author

**Khatera Ahad**

* GitHub: [@khatera-ahad](https://www.google.com/search?q=https://github.com/khatera-ahad)
* Repository: [react-bank-managment-dashboard](https://www.google.com/search?q=https://github.com/khatera-ahad/react-bank-managment-dashboard)
