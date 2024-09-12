<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotify Artist Search</title>
    <!-- Bootstrap CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
	<!-- In house css -->
    <link href="assets/style.css" rel="stylesheet">
    <!-- jQuery CDN for AJAX -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>

    <div class="container mt-5">
		<h1 class="text-center mb-4">Search for an Artist on Spotify</h1>

		<!-- Search form (with AJAX) -->
		<div class="d-flex justify-content-center">
			<input type="text" id="artist-search" class="form-control me-2" placeholder="Enter artist's name" required>
			<button type="button" class="btn btn-primary" id="search-btn">Search</button>
		</div>

		<!-- Results Section -->
		<div class="mt-5" id="results"></div>

		<!-- Pagination Section -->
		<div id="pagination" class="mt-4 d-flex justify-content-center">
			<!-- Pagination buttons will be appended here -->
		</div>
	</div>


    <!-- Bootstrap JS CDN (optional, for dynamic components) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
	<!-- In house jss -->
    <script src="assets/script.js"></script>
    
</body>
</html>
