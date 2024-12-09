<?php
$hostname = "localhost";
$username = "root";
$password = "";
$database_name = "belajarr";

$db = mysqli_connect($hostname, $username, $password, $database_name);

if ($db->connect_error) {
    echo "koneksi tidak berhasil";
    die("error");
}
