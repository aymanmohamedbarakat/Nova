CREATE DATABASE IF NOT EXISTS nova_shop;

USE nova_shop;

CREATE TABLE
    products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        price FLOAT NOT NULL,
        discount_price FLOAT NOT NULL,
        category VARCHAR(50) NOT NULL, -- 'Male' or 'Female'
        description TEXT,
        image VARCHAR(300)
    );

CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(150) NOT NULL -- Simple storage (not hashed)
    );

CREATE TABLE
    wishlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_product (user_id, product_id)
    );

CREATE TABLE
    newsletter (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image VARCHAR(255)
    );

INSERT INTO
    products (
        title,
        price,
        discount_price,
        category,
        description,
        image
    )
VALUES
    (
        'Link bracelet',
        630.0,
        510.0,
        'Male',
        'Gold bracelet designed to match our watch straps.',
        'https://eu.danielwellington.com/cdn/shop/files/fozhs1ubcyvtntjvgqku.png'
    ),
    (
        'Cable Bracelet',
        280.0,
        250.0,
        'Female',
        'Sleek, stylish bracelet designed to last forever.',
        'https://manssion.com/cdn/shop/products/SaintTropezCable18kGold.png'
    ),
    (
        'Gold Mens Bracelet',
        624.0,
        602.0,
        'Male',
        'Classic gold bracelet for men, handcrafted.',
        'https://www.purejewels.com/wp-content/uploads/2020/07/175664005.jpg'
    );