const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let isSignUpMode = false;
let currentUserId = null;
let localTodosCache = [];

const authScreen = document.getElementById("auth-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const todoListContainer = document.getElementById("todo-list-container");
const logoutBtn = document.getElementById("logout-btn");

document.addEventListener("DOMContentLoaded", () => {
  setupEventHandlers();
  checkCurrentSession();
});

async function checkCurrentSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  evaluateSessionState(session);

  supabase.auth.onAuthStateChange((_event, session) => {
    evaluateSessionState(session);
  });
}

function evaluateSessionState(session) {
  if (session) {
    currentUserId = session.user.id;
    authScreen.classList.add("hidden");
    dashboardScreen.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    fetchUserTodos();
  } else {
    currentUserId = null;
    authScreen.classList.remove("hidden");
    dashboardScreen.classList.add("hidden");
    logoutBtn.classList.add("hidden");
    localTodosCache = [];
  }
}

function setupEventHandlers() {
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute(
      "data-theme",
      currentTheme === "dark" ? "light" : "dark",
    );
  });

  const toggleAuthModeBtn = document.getElementById("auth-toggle-mode");
  toggleAuthModeBtn.textContent = "Don't have an account? Sign Up";
  toggleAuthModeBtn.addEventListener("click", () => {
    isSignUpMode = !isSignUpMode;
    document.getElementById("auth-title").textContent = isSignUpMode
      ? "Create Account"
      : "Sign In";
    document.getElementById("auth-submit-btn").textContent = isSignUpMode
      ? "Sign Up"
      : "Sign In";
    toggleAuthModeBtn.textContent = isSignUpMode
      ? "Already registered? Sign In"
      : "Don't have an account? Sign Up";
  });

  document.getElementById("auth-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;

    try {
      if (isSignUpMode) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert(
          "Account processing confirmed! Please verify your inbox or log in if auto-confirmed.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      alert("Auth Error: " + err.message);
    }
  });

  logoutBtn.addEventListener("click", () => supabase.auth.signOut());

  document
    .getElementById("todo-form")
    .addEventListener("submit", handleTodoFormSubmit);
  document
    .getElementById("cancel-edit-btn")
    .addEventListener("click", clearFormState);

  document
    .getElementById("search-bar")
    .addEventListener("input", renderFilteredListView);
  document
    .getElementById("filter-status")
    .addEventListener("change", renderFilteredListView);
}

async function fetchUserTodos() {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    localTodosCache = data || [];
    renderFilteredListView();
  } catch (err) {
    console.error("Fetch failure:", err.message);
  }
}

async function handleTodoFormSubmit(e) {
  e.preventDefault();
  const todoId = document.getElementById("edit-todo-id").value;
  const title = document.getElementById("todo-title").value.trim();
  const description = document.getElementById("todo-desc").value.trim() || null;
  const due_date = document.getElementById("todo-due").value || null;

  try {
    if (todoId) {
      const { error } = await supabase
        .from("todos")
        .update({
          title,
          description,
          created_at: due_date ? new Date(due_date).toISOString() : undefined,
        })
        .eq("id", todoId);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("todos")
        .insert([
          { user_id: currentUserId, title, description, completed: false },
        ]);
      if (error) throw error;
    }
    clearFormState();
    fetchUserTodos();
  } catch (err) {
    alert("Error saving: " + err.message);
  }
}

async function toggleTodoCompletion(id, currentState) {
  try {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !currentState })
      .eq("id", id);
    if (error) throw error;
    fetchUserTodos();
  } catch (err) {
    alert("Status update error: " + err.message);
  }
}

async function deleteTodoItem(id) {
  if (!confirm("Permanently delete this task?")) return;
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
    fetchUserTodos();
  } catch (err) {
    alert("Error deleting: " + err.message);
  }
}

function startEditingTodo(todo) {
  document.getElementById("edit-todo-id").value = todo.id;
  document.getElementById("todo-title").value = todo.title;
  document.getElementById("todo-desc").value = todo.description || "";
  if (todo.created_at) {
    document.getElementById("todo-due").value = todo.created_at.split("T")[0];
  }
  document.getElementById("form-heading").textContent = "Edit Task Parameters";
  document.getElementById("todo-submit-btn").textContent = "Save Changes";
  document.getElementById("cancel-edit-btn").classList.remove("hidden");
}

function clearFormState() {
  document.getElementById("edit-todo-id").value = "";
  document.getElementById("todo-form").reset();
  document.getElementById("form-heading").textContent = "Create New Task";
  document.getElementById("todo-submit-btn").textContent = "Add Task";
  document.getElementById("cancel-edit-btn").classList.add("hidden");
}

function renderFilteredListView() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  const filterValue = document.getElementById("filter-status").value;

  todoListContainer.innerHTML = "";

  const filteredItems = localTodosCache.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm);
    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "completed" && todo.completed) ||
      (filterValue === "pending" && !todo.completed);
    return matchesSearch && matchesFilter;
  });

  if (filteredItems.length === 0) {
    todoListContainer.innerHTML = `<div style="padding:2rem; text-align:center; color: var(--text-secondary)">No items match your query parameters.</div>`;
    return;
  }

  filteredItems.forEach((todo) => {
    const dateFormatted = new Date(todo.created_at).toLocaleDateString(
      undefined,
      { month: "short", day: "numeric", year: "numeric" },
    );
    const wrapper = document.createElement("div");
    wrapper.className = `todo-item ${todo.completed ? "completed" : ""}`;

    wrapper.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
      <div class="todo-content">
        <div class="todo-title">${escapeHtml(todo.title)}</div>
        ${todo.description ? `<div class="todo-desc">${escapeHtml(todo.description)}</div>` : ""}
        <div class="todo-meta">
          <span>Status: <strong>${todo.completed ? "Completed" : "Pending"}</strong></span>
          <span>Date: ${dateFormatted}</span>
        </div>
      </div>
      <div class="actions">
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
      </div>
    `;

    wrapper
      .querySelector(".todo-checkbox")
      .addEventListener("change", () =>
        toggleTodoCompletion(todo.id, todo.completed),
      );
    wrapper
      .querySelector(".btn-edit")
      .addEventListener("click", () => startEditingTodo(todo));
    wrapper
      .querySelector(".btn-delete")
      .addEventListener("click", () => deleteTodoItem(todo.id));

    todoListContainer.appendChild(wrapper);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
