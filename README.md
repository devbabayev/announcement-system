# 🎓 Uni-Elan | University Announcement Platform

A modern, high-performance web application designed to centralize university communications. The platform allows students to view official updates while providing managers with a robust dashboard to organize department-specific announcements.

---

## 🌟 Key Features

* **Role-Based Access Control:** Dynamic UI that switches features based on user roles (`user` vs. `manager`).
* **Announcement Management:** Full CRUD suite for managers (Create, Read, Update, Delete) with interactive modals.
* **Smart Department Filtering:** Real-time filtering system for various departments (Rectorate, IT Center, Student Council).
* **Optimized Compact UI:** Thoughtfully designed announcement cards that prevent text overflow and maintain visual consistency.
* **Performance Driven:** Integrated loading states with custom spinners and hardware-accelerated CSS animations.

---

## 🛠 Tech Stack

* **Framework:** [React.js](https://reactjs.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Typography:** Open Sans (configured via Google Fonts)
* **Icons:** Heroicons (SVG)
* **State Management:** React Hooks (`useState`, `useEffect`)

---

## 🎨 Design & CSS Optimizations

### Typography
We use **Open Sans** for its high legibility in academic environments. It is integrated directly into the Tailwind `@theme` engine for consistent utility-first usage.

### CSS Architecture (v4 Standards)
To ensure zero build warnings and maximum compatibility, our `index.css` follows a strict PostCSS-compliant hierarchy:
1.  **Directives:** `@import "tailwindcss";` is placed at the absolute top.
2.  **External Assets:** Font imports follow immediately after Tailwind.
3.  **Animations:** Global keyframes (like `fade-in-up`) are defined outside the theme block for stability.
4.  **Theming:** Custom variables are mapped within the `@theme` rule to avoid "unknown rule" errors in modern environments.

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone