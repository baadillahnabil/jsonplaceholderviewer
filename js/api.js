const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.map((post) => ({
      ...post,
      title: sanitizeHTML(post.title),
      body: sanitizeHTML(post.body),
    }));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function fetchComments(postId) {
  if (!Number.isInteger(Number(postId))) {
    throw new Error("Invalid post ID");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.map((comment) => ({
      ...comment,
      name: sanitizeHTML(comment.name),
      email: sanitizeHTML(comment.email),
      body: sanitizeHTML(comment.body),
    }));
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw new Error("Failed to fetch comments");
  }
}

function sanitizeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
