<?php
include "database.php";


if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Query untuk mencari pengguna di kedua tabel
    $stmt = $db->prepare("
        SELECT * 
        FROM (
            SELECT username, password, 'admin' AS user_type FROM tb_login2
            UNION ALL
            SELECT username, password, 'user' AS user_type FROM tb_login
        ) AS users
        WHERE username = ? AND password = ?
    ");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        if ($data['user_type'] === 'admin') {
            header("Location: ../admin/admin.html");
        } else {
            header("Location: ../menu/index.html");
        }
        exit();
    } else {
        echo "<script>alert('Username dan password salah!. Silakan login kembali.')</script>";
    }
}


?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container">
        <div class="card-samping">
            <video src="../assets/background/Recording 2024-11-29 021737.mp4" autoplay muted loop></video>
        </div>
        <form action="login.php" method="post">
            <img src="../assets/logo/MAHASIGMA3.png" alt="" class="img">
            <div class="detail">
                <h2>mahasigma</h2>
                <input class="active" type="text" placeholder="no-table" required="" name="username">
                <input type="password" placeholder="password" required="" name="password" class="input-password">
                <label for="checkbox">
                    <input type="checkbox" name="checkbox">tampilkan password
                </label>
                <button type="submit" name="login" class="btn">masuk</button>
            </div>
        </form>
    </div>
    <script src="main.js"></script>
</body>

</html>