<?php
// Load file .env secara manual (tanpa composer)
$envPath = dirname(__FILE__) . '/../.env'; // Sesuaikan lokasi file .env jika berada di root project

if (file_exists($envPath)) {
    $env = parse_ini_file($envPath);
    $serverKey = $env['MIDTRANS_SERVER_KEY'] ?? '';
} else {
    // Fallback atau pesan error jika .env tidak ada
    die(json_encode(['error' => 'File .env tidak ditemukan!']));
}

require_once dirname(__FILE__) . '/midtrans-php-master/Midtrans.php';

// Set your Merchant Server Key menggunakan variabel yang sudah dibaca
\Midtrans\Config::$serverKey = $serverKey;

// Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
\Midtrans\Config::$isProduction = false;
// Set sanitization on (default)
\Midtrans\Config::$isSanitized = true;
// Set 3DS transaction for credit card to true
\Midtrans\Config::$is3ds = true;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $items = $input['items'] ?? [];

    // Hitung total harga
    $totalAmount = 0;
    foreach ($items as $item) {
        $totalAmount += $item['price'] * $item['quantity'];
    }

    // Buat parameter transaksi
    $params = [
        'transaction_details' => [
            'order_id' => 'order-' . time(), // Unique order ID
            'gross_amount' => $totalAmount,
        ],
        'item_details' => array_map(function ($item) {
            return [
                'id' => $item['id'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'name' => $item['name'] ?? $item['id'], // Mengambil nama item dengan aman
            ];
        }, $items)
    ];

    try {
        // Buat transaksi
        $snapToken = \Midtrans\Snap::getSnapToken($params);
        echo $snapToken;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>