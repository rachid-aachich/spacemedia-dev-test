
$(document).ready(function () {
	let currentPage = 1;
	const limit = 9; // Number of items per page

	function fetchArtists(artistName, page) {
		const offset = (page - 1) * limit; // Calculate offset

		$.ajax({
			url: 'spotify-search.php',
			type: 'GET',
			data: { artist: artistName, limit: limit, offset: offset },
			success: function(response) {
				// Clear previous results and pagination
				$('#results').empty();
				$('#pagination').empty();

				try {
					// Check if response is in JSON format
					if (typeof response === 'string') {
						response = JSON.parse(response);
					}

					// Check if items property exists
					if (response.items && Array.isArray(response.items)) {
						const artists = response.items;

						if (artists.length === 0) {
							$('#results').html("<div class='alert alert-warning text-center'>No artist found.</div>");
						} else {
							// Create a row for the cards
							let row = $('<div class="row"></div>');

							artists.forEach(function (artist) {
								let imageUrl = "no_img.jpg"; // Default image if no image is found
								if (artist.images && artist.images.length > 0) {
									imageUrl = artist.images[0].url; // Use the artist's image if available
								}

								var card = 
									"<div class='col-md-4 mb-4'>" +
										"<div class='card h-100'>" +
											"<img src='" + artist.images[0].url + "' class='card-img-top' style='height: 150px; object-fit: cover;' alt='Artist Image'>" +
											"<div class='card-body'>" +
												"<h5 class='card-title'>" + artist.name + "</h5>" +
												"<p class='card-text'>Genres: " + artist.genres.join(', ') + "</p>" +
												"<p class='card-text'>Popularity: " + artist.popularity + "</p>" +
												"<button class='btn btn-info view-tracks-btn' data-artist-id='" + artist.id + "'>View Top Tracks</button>" +
												"<div class='top-tracks' id='top-tracks-" + artist.id + "' style='display:none;'></div>" +
											"</div>" +
										"</div>" +
									"</div>";


								row.append(card);
							});

							// Append the row to the results section
							$('#results').append(row);

							// Create pagination
							const totalItems = response.total || 0; // Fallback to 0 if total is not provided
							const totalPages = Math.ceil(totalItems / limit);
							createPagination(totalPages, page);
						}
					} else {
						$('#results').html("<div class='alert alert-warning text-center'>Invalid response format.</div>");
					}
				} catch (e) {
					console.error("Error parsing JSON: ", e);
					$('#results').html("<div class='alert alert-danger text-center'>An error occurred while processing the request.</div>");
				}
			},
			error: function() {
				$('#results').html("<div class='alert alert-danger text-center'>An error occurred. Please try again later.</div>");
			}
		});
	}

	function createPagination(totalPages, currentPage) {
		if (totalPages <= 1) return; // No need for pagination if there's only one page

		let pagination = "<ul class='pagination justify-content-center'>";

		// Previous button
		if (currentPage === 1) {
			pagination += "<li class='page-item disabled'><span class='page-link'>Previous</span></li>";
		} else {
			pagination += "<li class='page-item'><a class='page-link' href='#' data-page='" + (currentPage - 1) + "'>Previous</a></li>";
		}

		// Determine the range of pages to show
		let startPage = Math.max(1, currentPage - 4);
		let endPage = Math.min(totalPages, currentPage + 4);

		// Add "..." before the start range if there are more pages before
		if (startPage > 1) {
			pagination += "<li class='page-item'><a class='page-link' href='#' data-page='1'>1</a></li>";
			if (startPage > 2) {
				pagination += "<li class='page-item disabled'><span class='page-link'>...</span></li>";
			}
		}

		// Add page numbers
		for (let i = startPage; i <= endPage; i++) {
			let activeClass = '';
			if (i === currentPage) {
				activeClass = 'active';
			}
			pagination += "<li class='page-item " + activeClass + "'><a class='page-link' href='#' data-page='" + i + "'>" + i + "</a></li>";
		}

		// Add "..." after the end range if there are more pages after
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pagination += "<li class='page-item disabled'><span class='page-link'>...</span></li>";
			}
			pagination += "<li class='page-item'><a class='page-link' href='#' data-page='" + totalPages + "'>" + totalPages + "</a></li>";
		}

		// Next button
		if (currentPage === totalPages) {
			pagination += "<li class='page-item disabled'><span class='page-link'>Next</span></li>";
		} else {
			pagination += "<li class='page-item'><a class='page-link' href='#' data-page='" + (currentPage + 1) + "'>Next</a></li>";
		}

		pagination += "</ul>";

		$('#pagination').html(pagination); // Replace content to avoid duplications

		// Handle pagination click
		$('.page-link').click(function (e) {
			e.preventDefault();
			let selectedPage = parseInt($(this).attr('data-page'));
			if (selectedPage >= 1 && selectedPage <= totalPages) {
				fetchArtists($('#artist-search').val(), selectedPage);
			}
		});
	}



	// Event listener for the search button
	$('#search-btn').click(function () {
		const artistName = $('#artist-search').val();
		currentPage = 1; // Reset to page 1 on new search
		fetchArtists(artistName, currentPage);
	});
	
	
	// Top tracks function			
	function getTopTracks(artistId) {
		$.ajax({
			url: 'top-track.php',
			type: 'GET',
			data: { artistId: artistId },
			success: function(response) {
				var tracks = JSON.parse(response);

				if (tracks.error) {
					console.log("Error: " + tracks.error);
				} else {
					// Find the top-tracks div for this artist and display the tracks
					var topTracksHtml = '<ul class="list-group">';
					tracks.tracks.forEach(function(track) {
						topTracksHtml += "<li class='list-group-item'>" + track.name + "</li>";
					});
					topTracksHtml += '</ul>';

					$('#top-tracks-' + artistId).html(topTracksHtml).slideDown();
				}
			},
			error: function(error) {
				console.log('Error fetching top tracks:', error);
			}
		});
	}

	// Event listener for "View Top Tracks" button
	$(document).on('click', '.view-tracks-btn', function() {
		var artistId = $(this).data('artist-id');
		
		// Check if the top tracks are already shown, if not fetch them
		if ($('#top-tracks-' + artistId).is(':empty')) {
			getTopTracks(artistId);
		} else {
			$('#top-tracks-' + artistId).slideToggle(); // Toggle visibility if tracks are already loaded
		}
	});


});