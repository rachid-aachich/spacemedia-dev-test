<?php
include('functions.php');

if (isset($_GET['artist'])) {
    $artistName = $_GET['artist'];
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 9;  // Default limit is 9
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;  // Default offset is 0
    $accessToken = getAccessToken();
    $artists = searchSpotifyArtist($artistName, $accessToken, $limit, $offset);
    echo json_encode($artists);
} else {
    echo json_encode([]);
}
?>
