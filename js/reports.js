import "../style.css";
import { fetchPosts } from "./api.js";

async function initializeReports() {
  const app = document.querySelector("#app");

  const reportsContainer = document.createElement("div");
  reportsContainer.className = "space-y-8";

  // Report 1: Posts containing "rerum"
  const rerumReport = document.createElement("div");
  rerumReport.className = "bg-white p-6 rounded-lg shadow-md";
  rerumReport.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Report 1: Posts containing "rerum"</h2>
    <div id="rerumCount" class="text-3xl font-bold text-blue-600">Loading...</div>
  `;

  // Report 2: Posts per user
  const userPostsReport = document.createElement("div");
  userPostsReport.className = "bg-white p-6 rounded-lg shadow-md";
  userPostsReport.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Report 2: Posts per User</h2>
    <table class="min-w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Count</th>
        </tr>
      </thead>
      <tbody id="userPostsTableBody"></tbody>
    </table>
  `;

  reportsContainer.appendChild(rerumReport);
  reportsContainer.appendChild(userPostsReport);
  app.appendChild(reportsContainer);

  try {
    const [posts] = await Promise.all([fetchPosts()]);

    // Report 1: Count posts containing "rerum"
    const rerumPosts = posts.filter((post) => post.body.includes("rerum"));
    document.getElementById("rerumCount").textContent = rerumPosts.length;

    // Report 2: Posts per user
    const postsByUser = posts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {});

    const tbody = document.getElementById("userPostsTableBody");
    tbody.innerHTML = Object.entries(postsByUser)
      .map(
        ([userId, count]) => `
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4">${userId}</td>
          <td class="px-6 py-4">${count}</td>
        </tr>
      `
      )
      .join("");
  } catch (error) {
    console.error("Failed to load report data:", error);
  }
}

initializeReports();
