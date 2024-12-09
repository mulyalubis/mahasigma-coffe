<?php
// /*Install Midtrans PHP Library (https://github.com/Midtrans/midtrans-php)
// composer require midtrans/midtrans-php

// Alternatively, if you are not using **Composer**, you can download midtrans-php library
// (https://github.com/Midtrans/midtrans-php/archive/master.zip), and then require
// the file manually.


require_once dirname(__FILE__) . '/midtrans-php-master/Midtrans.php';

// //SAMPLE REQUEST START HERE

// Set your Merchant Server Key
\Midtrans\Config::$serverKey = 'SB-Mid-server-AGCw2FfjttrO-H12CM3cPmeQ';
// Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
\Midtrans\Config::$isProduction = false;
// Set sanitization on (default)
\Midtrans\Config::$isSanitized = true;
// Set 3DS transaction for credit card to true
\Midtrans\Config::$is3ds = true;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $items = json_decode(file_get_contents('php://input'), true)['items'];

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
                'name' => $item['id'],
            ];
        }, $items)
    ];

    // Buat transaksi
    $snapToken = \Midtrans\Snap::getSnapToken($params);
    echo $snapToken;
}
