<?php

$http = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? $http = "https" : $http = "http";

$current_uri = "{$http}://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$tokens = explode('/', $current_uri);
$cat = $tokens[sizeof($tokens) - 2];
$goTo = "{$http}://$_SERVER[HTTP_HOST]/imprensa/{$cat}";

header("Location: {$goTo}");

die();
