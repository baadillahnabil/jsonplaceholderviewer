import { vi } from "vitest";

// Mock the fetch API globally
global.fetch = vi.fn();
