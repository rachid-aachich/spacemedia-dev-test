# Spotify Artist Search Web Application

A mini web application that allows users to search for artists by name using the Spotify API, displaying relevant artist information such as name, genres, popularity, and image. Built using **PHP**, **HTML**, **CSS**, and **JavaScript**.

## Features

- **Spotify API Integration**: Search for artists by name.
- **Artist Information Display**: Displays the artist's name, genres, popularity, and image (if available).
- **Top Tracks Display**: Shows the top tracks for each artist.
- **Pagination**: Paginates results if they exceed 10 artists per page.
- **Responsive Design**: Styled with **Bootstrap** for mobile-friendly UI.
- **Token Management**: Efficiently manages access tokens by using a token file for storage and refreshes tokens when needed.

## Bonus Features

- **Top Tracks**: Displays the top tracks for each artist.
- **Pagination**: Results are paginated for large search sets.
- **Token Refresh**: Automatically refreshes access tokens when expired, using the refresh token stored in a file.

## Folder Structure
/assets/style.css -> CSS files for styling
/assets/script.js -> JavaScript files for AJAX and other front-end logic 
/assets/token.txt -> Stores access and refresh tokens for Spotify API

/functions.php -> Contains API request functions and token management logic 
/index.php -> Main entry point for the application 
/spotify-search.php -> Handles requests for fetching artists lists
/top-tracks.php -> Handles requests for fetching artist's top tracks


## Setup

### Prerequisites

- PHP 7.4 or higher
- Spotify Developer account to obtain **Client ID** and **Client Secret**
- Composer (optional, if any additional PHP libraries are needed)

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/your-username/spotify-artist-search.git
    ```

2. Navigate to the project directory:
    ```
    cd spotify-artist-search
    ```

3. Set up your Spotify API credentials:
    - Open the `functions.php` file and insert your **Spotify Client ID** and **Client Secret**.

4. Ensure the `assets/token.txt` file exists and is writable by your PHP process.

5. Run the application on your local server (e.g., using XAMPP or PHP's built-in server):
    ```
    php -S localhost:8000
    ```

6. Open your browser and navigate to `http://localhost:8000`.

### Usage

- Enter the artist's name in the search box and click **Search**.
- The application will display the artist's name, genres, popularity, and image.
- Click on an artist to view their top tracks.
- Use pagination to navigate through large sets of results.

## Token Management

- The application retrieves a new access token from the Spotify API when required.
- If the access token expires, it uses the refresh token stored in `assets/token.txt` to request a new one, improving performance and reducing unnecessary API calls.

## Challenges and Solutions

- **Token Expiration**: The application stores both the access and refresh tokens in a file. When the access token expires, the application reads the refresh token and generates a new access token, minimizing unnecessary API requests.
  
- **Pagination**: Handling large result sets was challenging. The application uses client-side JavaScript to paginate results, ensuring a smooth and responsive user experience.