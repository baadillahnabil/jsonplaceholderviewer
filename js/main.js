import "../style.css";
import { fetchPosts, fetchComments } from "./api.js";

let posts = [];
let currentPage = 1;
const postsPerPage = 10;

let highlightMode = "row";
let highlightWord = "rerum";

async function initializeApp() {
  const app = document.querySelector("#app");

  // Controls container
  const controlsContainer = document.createElement("div");
  controlsContainer.className = "mb-4 flex flex-wrap gap-4 items-center";

  // Search input
  const searchInput = document.createElement("input");
  searchInput.className =
    "flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300";
  searchInput.placeholder = "Search posts...";

  // Highlight controls
  const highlightControls = document.createElement("div");
  highlightControls.className = "flex items-center space-x-4";
  highlightControls.innerHTML = `
    <div class="flex items-center space-x-2">
      <label class="text-sm font-medium text-gray-700">Highlight word:</label>
      <input
        type="text"
        value="rerum"
        placeholder="Enter word to highlight"
        class="w-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      >
    </div>
    <div class="flex items-center space-x-2">
      <label class="text-sm font-medium text-gray-700">Style:</label>
      <select class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
        <option value="row">Full Row</option>
        <option value="word">Word Only</option>
        <option value="none">None</option>
      </select>
    </div>
  `;

  controlsContainer.appendChild(searchInput);
  controlsContainer.appendChild(highlightControls);

  // Posts table
  const tableContainer = document.createElement("div");
  tableContainer.className =
    "bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg";
  tableContainer.innerHTML = `
    <table class="min-w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Body</th>
        </tr>
      </thead>
      <tbody id="postsTableBody"></tbody>
    </table>
  `;

  // Pagination
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "mt-4 flex justify-between items-center";
  paginationContainer.innerHTML = `
    <div class="text-sm text-gray-600">
      Showing <span id="pageInfo"></span>
    </div>
    <div class="space-x-2">
      <button id="prevPage" class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50">Previous</button>
      <button id="nextPage" class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50">Next</button>
    </div>
  `;

  app.appendChild(controlsContainer);
  app.appendChild(tableContainer);
  app.appendChild(paginationContainer);

  // Modal for comments
  const modal = document.createElement("div");
  modal.className =
    "hidden fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center";
  modal.id = "commentsModal";
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 transform transition-all duration-300 scale-95 opacity-0">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Comments</h2>
        <button class="text-gray-500 hover:text-gray-700 transition-colors duration-300" id="closeModal">&times;</button>
      </div>
      <div id="commentsContent" class="max-h-[60vh] overflow-y-auto pr-2"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Event listeners
  searchInput.addEventListener("input", handleSearch);

  const wordInput = highlightControls.querySelector("input");
  wordInput.addEventListener("input", (e) => {
    highlightWord = e.target.value.trim();
    renderCurrentPage();
  });

  highlightControls.querySelector("select").addEventListener("change", (e) => {
    highlightMode = e.target.value;
    renderCurrentPage();
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderCurrentPage();
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const maxPages = Math.ceil(posts.length / postsPerPage);
    if (currentPage < maxPages) {
      currentPage++;
      renderCurrentPage();
    }
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    const modalContent = modal.querySelector("div");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      modalContent.classList.remove("scale-95", "opacity-0");
    }, 300);
  });

  // Add event listener to close modal when clicking on the background
  modal.addEventListener("click", (e) => {
    // Only close if the click was directly on the modal background (not on modal content)
    if (e.target === modal) {
      const modalContent = modal.querySelector("div");
      modalContent.classList.add("scale-95", "opacity-0");
      setTimeout(() => {
        modal.classList.add("hidden");
        modalContent.classList.remove("scale-95", "opacity-0");
      }, 300);
    }
  });

  // Load initial data
  try {
    posts = await fetchPosts();
    renderCurrentPage();
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
}

function renderCurrentPage() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pageItems = posts.slice(start, end);

  const tbody = document.getElementById("postsTableBody");
  tbody.innerHTML = pageItems
    .map((post) => {
      let content = post.body;
      if (
        highlightMode === "word" &&
        highlightWord &&
        post.body.toLowerCase().includes(highlightWord.toLowerCase())
      ) {
        const regex = new RegExp(`(${highlightWord})`, "gi");
        content = post.body.replace(
          regex,
          '<span class="bg-yellow-200 px-1 rounded">$1</span>'
        );
      }

      return `
        <tr class="hover:bg-gray-50 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 ${
          highlightMode === "row" &&
          highlightWord &&
          post.body.toLowerCase().includes(highlightWord.toLowerCase())
            ? "bg-yellow-100"
            : ""
        }" data-post-id="${post.id}">
          <td class="px-6 py-4">${post.title}</td>
          <td class="px-6 py-4">${content}</td>
        </tr>
      `;
    })
    .join("");

  // Update pagination info
  document.getElementById("pageInfo").textContent = `${start + 1}-${Math.min(
    end,
    posts.length
  )} of ${posts.length} posts`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = end >= posts.length;

  // Add click handlers for showing comments
  tbody.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", async () => {
      const postId = row.dataset.postId;
      try {
        const comments = await fetchComments(postId);
        showComments(comments);
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    });
  });
}

function showComments(comments) {
  const modal = document.getElementById("commentsModal");
  const modalContent = modal.querySelector("div");
  const content = document.getElementById("commentsContent");

  content.innerHTML = comments
    .map(
      (comment) => `
        <div class="mb-4 p-4 border-b transform transition-all duration-300 hover:-translate-y-1">
          <h3 class="font-bold">${comment.name}</h3>
          <p class="text-gray-600 text-sm">${comment.email}</p>
          <p class="mt-2">${comment.body}</p>
        </div>
      `
    )
    .join("");

  modal.classList.remove("hidden");
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
  }, 10);
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  posts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.body.toLowerCase().includes(searchTerm)
  );
  currentPage = 1;
  renderCurrentPage();
}

initializeApp();
