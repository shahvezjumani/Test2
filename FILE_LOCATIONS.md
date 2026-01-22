# 📂 Quick File Reference Guide

## Where to Find Each Component

### 🎨 Common/Utility Components

- **Button** → `client/src/components/common/Button.jsx`
- **Loading Spinner** → `client/src/components/common/Loading.jsx`
- **Error Message** → `client/src/components/common/ErrorMessage.jsx`
- **Modal Dialog** → `client/src/components/common/Modal.jsx`

### 📐 Layout Components

- **Sidebar** (Project List) → `client/src/components/layout/Sidebar.jsx`
- **Header** (Top Bar) → `client/src/components/layout/Header.jsx`

### 📁 Project Components

- **Project Card** → `client/src/components/projects/ProjectCard.jsx`
- **Project Form** (Create/Edit) → `client/src/components/projects/ProjectForm.jsx`
- **Project List** → `client/src/components/projects/ProjectList.jsx`

### ✅ Task Components

- **Task Card** → `client/src/components/tasks/TaskCard.jsx`
- **Task Form** (Create/Edit) → `client/src/components/tasks/TaskForm.jsx`
- **Task List** (Kanban Board) → `client/src/components/tasks/TaskList.jsx`
- **Task Details** (Full View) → `client/src/components/tasks/TaskDetails.jsx`
- **Task Filters** → `client/src/components/tasks/TaskFilters.jsx`
- **Comment Section** → `client/src/components/tasks/CommentSection.jsx`

### 🔌 API & State Management

- **API Service** (All backend calls) → `client/src/api/apiService.js`
- **App Context** (Global State) → `client/src/context/ProjectContext.jsx`

### 🎯 Main Files

- **App Component** → `client/src/App.jsx`
- **Main Entry** → `client/src/main.jsx`
- **Global Styles** → `client/src/index.css`
- **App Styles** → `client/src/App.css`

---

## 🔄 When to Edit Each File

### Adding a New Feature?

1. **New Component** → Create in appropriate `/components/` subfolder
2. **New API Endpoint** → Add to `apiService.js`
3. **New Global State** → Update `ProjectContext.jsx`

### Styling Changes?

- **Component-specific** → Use Tailwind classes in JSX
- **Global styles** → Edit `index.css`
- **Theme colors** → Edit `tailwind.config.js`

### Backend Integration?

- **Toggle mock data** → `apiService.js` (line 4: `MOCK_MODE`)
- **Change API URL** → `apiService.js` (line 3: `API_BASE_URL`)

---

## 📋 Component Dependency Tree

```
App.jsx
├── AppProvider (context)
└── Dashboard
    ├── Sidebar
    │   └── ProjectList
    │       ├── ProjectCard (multiple)
    │       └── ProjectForm (modal)
    ├── Header
    └── TaskList
        ├── TaskFilters
        ├── TaskCard (multiple)
        ├── TaskForm (modal)
        └── TaskDetails (modal)
            └── CommentSection
```

---

## 🎯 Quick Navigation

**Need to change how projects display?**
→ `client/src/components/projects/ProjectCard.jsx`

**Need to change how tasks display?**
→ `client/src/components/tasks/TaskCard.jsx`

**Need to add a new API call?**
→ `client/src/api/apiService.js`

**Need to add global state?**
→ `client/src/context/ProjectContext.jsx`

**Need to modify demo data?**
→ `client/src/api/apiService.js` (lines 8-100)

**Need to change the layout?**
→ `client/src/App.jsx`

---

## 🚀 Most Common Tasks

### 1. Change Demo Data

**File:** `client/src/api/apiService.js`
**Lines:** 8-100
**What:** `mockProjects`, `mockTasks`, `mockUsers`

### 2. Add New Project Field

**Files:**

- `client/src/components/projects/ProjectForm.jsx` (form field)
- `client/src/components/projects/ProjectCard.jsx` (display)
- `client/src/api/apiService.js` (update mock data structure)

### 3. Add New Task Field

**Files:**

- `client/src/components/tasks/TaskForm.jsx` (form field)
- `client/src/components/tasks/TaskCard.jsx` (display on card)
- `client/src/components/tasks/TaskDetails.jsx` (display in details)
- `client/src/api/apiService.js` (update mock data structure)

### 4. Change Color Scheme

**File:** `client/tailwind.config.js`
**What:** Extend theme colors

### 5. Add Loading State to a Component

**Import:** `import { Loading } from '../common/Loading';`
**Use:** `{loading && <Loading text="Loading..." />}`

### 6. Add Error Handling

**Import:** `import { ErrorMessage } from '../common/ErrorMessage';`
**Use:** `{error && <ErrorMessage message={error} onClose={clearError} />}`

---

## 📱 Responsive Design

All components use Tailwind CSS responsive utilities:

- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

---

**Last Updated:** January 22, 2026
