<?php

// Spotify API credentials
$clientId = 'cf79cf732df0424a9b0bcb62c3e562e9';
$clientSecret = '0619d5205c7445588715b182f57c73fd';

// token file
$tokenFile = 'assets/token.txt'; 

// Function to get a new Spotify API access token
function getSpotifyAccessToken() {
    global $clientId, $clientSecret, $tokenFile;

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Basic ' . base64_encode($clientId . ':' . $clientSecret),
        'Content-Type: application/x-www-form-urlencoded'
    ]);

    $result = curl_exec($ch);
    curl_close($ch);

    $response = json_decode($result, true);
    $accessToken = $response['access_token'];
    $expiresIn = $response['expires_in'];

    // Save the token and expiration time to the file
    $data = [
        'access_token' => $accessToken,
        'token_expiry' => time() + $expiresIn
    ];
    file_put_contents($tokenFile, json_encode($data));

    return $accessToken;
}

// Function to get the current Spotify API access token
function getAccessToken() {
    global $tokenFile;

    // Check if the token file exists
    if (file_exists($tokenFile)) {
        $data = json_decode(file_get_contents($tokenFile), true);

        // Check if the token is still valid
        if (isset($data['access_token']) && isset($data['token_expiry']) && time() < $data['token_expiry']) {
            return $data['access_token'];
        }
    }

    // Token file does not exist or token is expired, so get a new one
    return getSpotifyAccessToken();
}


// Function to search for an artist by name and pagination
function searchSpotifyArtist($artistName, $accessToken, $limit, $offset) {
    $artistNameEncoded = urlencode($artistName);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.spotify.com/v1/search?q=$artistNameEncoded&type=artist&limit=$limit&offset=$offset");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $accessToken"
    ]);

    $result = curl_exec($ch);
    curl_close($ch);

    $response = json_decode($result, true);
    return $response['artists'];
}


function getTopTracks($artistId, $accessToken) {
    $url = "https://api.spotify.com/v1/artists/" . $artistId . "/top-tracks?market=US";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization: Bearer " . $accessToken
    ));

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}