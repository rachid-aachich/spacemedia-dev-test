<?php
include('functions.php');

if (isset($_GET['artistId'])) {
    $accessToken = getAccessToken();
    $artistId = $_GET['artistId'];

    $topTracks = getTopTracks($artistId, $accessToken);

    // Return the top tracks in JSON format
    echo json_encode($topTracks);
} else {
    echo json_encode([]);
}
?>
