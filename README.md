# JSONPlaceholder Viewer

A modern web application that displays and interacts with data from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API, built with vanilla JavaScript, Tailwind CSS, and Vite.

## Features

- **Post Browsing**: View posts from JSONPlaceholder with a clean, responsive interface
- **Pagination**: Navigate through posts with ease using pagination controls
- **Search Functionality**: Filter posts by title or content
- **Highlighting Options**: Highlight search terms with customizable styles:
  - Full row highlighting
  - Word-only highlighting
  - No highlighting
- **Comments View**: Click on any post to view associated comments in a modal
- **Reports Page**: View statistics and analytics about the post data

## Technologies Used

- Vanilla JavaScript (ES6+)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for build tooling and development server
- [Vitest](https://vitest.dev/) for testing
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) for mock data

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- npm or yarn

### Installation
****
1. Clone the repository or download the source code

2. Navigate to the project directory
   ```
   cd jsonplaceholderviewerapp
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run dev:host` - Start the development server accessible from other devices on the network
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface

## Project Structure

```
jsonplaceholderviewerapp/
├── index.html         # Main page HTML
├── reports.html       # Reports page HTML
├── style.css          # Global styles
├── js/
│   ├── api.js         # API interaction functions
│   ├── api.test.js    # Tests for API functions
│   ├── main.js        # Main application logic
│   └── reports.js     # Reports page logic
├── package.json       # Project dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
└── vitest.config.js   # Vitest configuration
```

## Features in Detail

### Post Viewing
- View posts in a clean, responsive table layout
- Each post displays its title and body content

### Search and Filtering
- Real-time filtering of posts as you type
- Search matches against both post titles and body content

### Highlighting
- Choose between different highlighting modes:
  - **Full Row**: Highlights the entire row containing the search term
  - **Word Only**: Highlights only the specific words matching the search term
  - **None**: No highlighting

### Comments Modal
- Click on any post to view all associated comments
- Comments display name, email, and content in a modal overlay
- Smooth animations for modal opening and closing

### Reports
- View statistics about post content and distribution
- Analysis of posts per user and word frequency

## License

This project is available as open source under the terms of the MIT License.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the frontend tooling
