# Mahasigma Coffee

A web application for a restaurant that lets customers order directly from their table and pay digitally, without waiting for a waiter. Orders and payments are handled automatically.

## Features

- **On-site ordering interface:** customers browse the menu and place orders from their own device while seated at the table
- **Digital payment:** online payment processing integrated with Midtrans
- **Automated transactions:** order and payment flow handled automatically
- **Login:** separate login forms for access to restricted pages
- **Order view:** an orders page in the `admin/` folder where the restaurant can see incoming orders

## Tech Stack

| Area | Technology |
| --- | --- |
| Front end | HTML, CSS, JavaScript |
| Back end | PHP |
| Payment | Midtrans |
| Database | MySQL (via XAMPP) |

## Screenshots

<!-- Replace with your own screenshots, e.g. put images in assets/screenshots/ -->

| Menu | Order | Payment |
| --- | --- | --- |
| ![Menu](https://res.cloudinary.com/he0pd9rd/image/upload/v1790086358/Screenshot_2026-08-19_112128_u2p1vr.png) | ![Order](https://res.cloudinary.com/he0pd9rd/image/upload/v1790086340/Screenshot_2026-09-14_224920_ivwst1.png) | ![Payment](https://res.cloudinary.com/he0pd9rd/image/upload/v1790086339/Screenshot_2026-09-14_225111_kavlx4.png) |

## Project Structure

```
admin/        Orders page for the restaurant
assets/       Images, styles, and other static files
form_login/   Login forms
menu/         Menu and customer ordering pages
php/          Back-end PHP scripts
```

## Getting Started

### Prerequisites

- [XAMPP](https://www.apachefriends.org/) (Apache, PHP, and MySQL)
- A [Midtrans](https://midtrans.com/) sandbox account for testing payments

### Installation

1. Open the XAMPP Control Panel and start **Apache** and **MySQL**

2. Clone the repository into XAMPP's `htdocs` folder

   ```bash
   cd C:\xampp\htdocs
   git clone https://github.com/mulyalubis/mahasigma-coffe.git
   ```

3. Create the database and import the data

   - Open [phpMyAdmin](http://localhost/phpmyadmin)
   - Create a new database
   - Import the SQL file included in this repository
   <!-- TODO: name the database and the .sql file, e.g. database/mahasigma.sql -->

4. Configure the database connection and your Midtrans keys
   <!-- TODO: name the file in php/ where these are set -->
   Use your own Midtrans sandbox keys for testing. Do not commit real keys to GitHub.

5. Open the project in your browser

   ```
   http://localhost/mahasigma-coffe/
   ```

## Author

**Mulya Yustisio Lubis**
[GitHub](https://github.com/mulyalubis) · [LinkedIn](https://www.linkedin.com/in/mulyalubis)