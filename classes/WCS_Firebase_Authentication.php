<?php
/**
 * Signin , install firebase in composer
 */
$firebase = new Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);

$userData = [
    "email" => $email,
    "password" => $password
];

$userId = $firebase->push("users", $userData);

// Next, get the user's name and gravatar from WordPress
$name = get_user_meta(get_current_user_id(), "first_name", true);
$gravatar = get_avatar_url(get_current_user_id(), ["size" => 256]);

// Finally, update the Firebase user with the name and gravatar
$firebase->update("users/" . $userId, [
    "name" => $name,
    "gravatar" => $gravatar
]);
