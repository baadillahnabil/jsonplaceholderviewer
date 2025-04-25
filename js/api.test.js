import { fetchPosts, fetchComments } from "./api";
import { describe, it, expect, beforeEach } from "vitest";

// fetch is mocked in vitest.setup.js

describe("API Functions", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe("fetchPosts", () => {
    it("should fetch posts successfully", async () => {
      const mockPosts = [
        { id: 1, title: "Post 1", body: "Body 1" },
        { id: 2, title: "Post 2", body: "Body 2" },
      ];

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPosts),
        })
      );

      const posts = await fetchPosts();
      expect(posts).toHaveLength(2);
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts",
        expect.any(Object)
      );
    });

    it("should handle fetch error", async () => {
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      );

      await expect(fetchPosts()).rejects.toThrow("Failed to fetch posts");
    });
  });

  describe("fetchComments", () => {
    it("should fetch comments for valid post ID", async () => {
      const mockComments = [
        {
          id: 1,
          postId: 1,
          name: "Comment 1",
          email: "test@test.com",
          body: "Body 1",
        },
      ];

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockComments),
        })
      );

      const comments = await fetchComments(1);
      expect(comments).toHaveLength(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/1/comments",
        expect.any(Object)
      );
    });

    it("should reject invalid post IDs", async () => {
      await expect(fetchComments("invalid")).rejects.toThrow("Invalid post ID");
    });
  });
});
