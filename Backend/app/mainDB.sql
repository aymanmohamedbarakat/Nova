-- CREATE DATABASE IF NOT EXISTS nova_shop;
-- USE nova_shop;
-- CREATE TABLE
--     products (
--         id INT AUTO_INCREMENT PRIMARY KEY,
--         title VARCHAR(200) NOT NULL,
--         price FLOAT NOT NULL,
--         discount_price FLOAT NOT NULL,
--         category VARCHAR(50) NOT NULL, -- 'Male' or 'Female'
--         description TEXT,
--         image VARCHAR(300)
--     );
-- CREATE TABLE
--     users (
--         id INT AUTO_INCREMENT PRIMARY KEY,
--         username VARCHAR(150) NOT NULL UNIQUE,
--         password VARCHAR(150) NOT NULL -- Simple storage (not hashed)
--     );
-- CREATE TABLE
--     wishlist (
--         id INT AUTO_INCREMENT PRIMARY KEY,
--         user_id INT NOT NULL,
--         product_id INT NOT NULL,
--         FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
--         FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
--         UNIQUE KEY unique_user_product (user_id, product_id)
--     );
-- CREATE TABLE
--     newsletter (
--         id INT AUTO_INCREMENT PRIMARY KEY,
--         title VARCHAR(255) NOT NULL,
--         content TEXT NOT NULL,
--         image VARCHAR(255)
--     );
-- INSERT INTO
--     products (
--         title,
--         price,
--         discount_price,
--         category,
--         description,
--         image
--     )
-- VALUES
--     (
--         'Link bracelet',
--         630.0,
--         510.0,
--         'Male',
--         'Gold bracelet designed to match our watch straps.',
--         'https://eu.danielwellington.com/cdn/shop/files/fozhs1ubcyvtntjvgqku.png'
--     ),
--     (
--         'Cable Bracelet',
--         280.0,
--         250.0,
--         'Female',
--         'Sleek, stylish bracelet designed to last forever.',
--         'https://manssion.com/cdn/shop/products/SaintTropezCable18kGold.png'
--     ),
--     (
--         'Gold Mens Bracelet',
--         624.0,
--         602.0,
--         'Male',
--         'Classic gold bracelet for men, handcrafted.',
--         'https://www.purejewels.com/wp-content/uploads/2020/07/175664005.jpg'
--     );
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
        image1 VARCHAR(300),
        image2 VARCHAR(300)
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
        image1,
        image2
    )
VALUES
    (
        'Gold Link Bracelet with Diamonds',
        1500.0,
        1400.0,
        'Male',
        'Heavy gold link bracelet with diamond accents.',
        'https://cdn.shopify.com/s/files/1/2417/4137/files/Iced_Out_Cuban_Link_Bracelet_10mm_Gold_View1_Shopify_Tall_7a5d5c34-f9e1-4ede-b4a1-e8c43ff9f39a.jpg?v=1727130342&width=960&height=1200&crop=center',
        'https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/productimages/BCGKB30423/medium/BCGKB30423-YG-RB-WH-250-M3.jpg'
    ),
    (
        'Diamond Cable Bracelet (18k Gold)',
        1200.0,
        1100.0,
        'Female',
        'Elegant 18k gold cable bracelet with brilliant diamonds.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKnpO2H5EzzXL7hHxfecyU40z5aiYEAmMssg&s',
        'https://cdn-images.farfetch-contents.com/15/90/10/17/15901017_30525479_600.jpg'
    ),
    (
        'Gold Mens Diamond Bracelet',
        2000.0,
        1900.0,
        'Male',
        'Brilliant round diamonds embellish striking angular links along this handsome mens bracelet, Fashioned in 14K yellow gold.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMaZvZYtNbX-yAw5zGXwCHLnvQ6lIAD3UaOQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwAH2_pVsKaonMBPrLKCgwaPBwBYfWrhExcQD23c9_V2EK-x0rNS9cnJveKvf5lekvA6k&usqp=CAU'
    ),
    (
        'Gold Diamond Cufflinks',
        800.0,
        750.0,
        'Male',
        '18k gold cufflinks with a subtle diamond inlay.',
        'https://media.neimanmarcus.com/f_auto,q_auto:low,ar_2:3,c_fit,dpr_2.0,w_300/01/nm_4814819_100242_m',
        'https://us.tateossian.com/cdn/shop/products/CF0570.png?v=1706523935'
    ),
    (
        'Gold Diamond Signet Ring',
        1100.0,
        1000.0,
        'Male',
        'Heavy gold signet ring with a single diamond.',
        'https://images.gabrielny.com/assets/~LR52243Y45JJ-1.jpg',
        'https://images-eu.ssl-images-amazon.com/images/I/61m8VR4BzQL._AC_SR462,693_.jpg'
    ),
    (
        'Diamond Gold Pendant Necklace',
        900.0,
        850.0,
        'Female',
        '18k gold pendant necklace with a delicate diamond design.',
        'https://uk.pandora.net/dw/image/v2/BFCR_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dw66fa886b/productimages/singlepackshot/352187C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5',
        'https://di2ponv0v5otw.cloudfront.net/posts/2024/04/18/6621030fcf86b132b35bc79c/m_wp_6621031c206847f2ab70bb36.webp'
    ),
    (
        'Diamond Stud Earrings (18k Gold)',
        1300.0,
        1200.0,
        'Female',
        'Classic 18k gold stud earrings with high-quality diamonds.',
        'https://m.media-amazon.com/images/I/616T5Bveo4L._AC_SL1500_.jpg',
        'https://media.thejewellershop.com/images/products/1000/BDE0034LG2025-14KG_01.jpg'
    ),
    (
        'Gold Diamond Tennis Bracelet',
        1800.0,
        1700.0,
        'Female',
        'Elegant 18k gold tennis bracelet with a continuous line of diamonds.',
        'https://cdn.itshot.com/product/1/4/14k-diamond-tennis-bracelet-half-bezel-setting-8ct-p-22516_ye.jpg?w=1',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBnuujaQjGMoBI-SW7bNdniqETy2xfEPu7rw&s'
    ),
    (
        'Gold Diamond Ring',
        1600.0,
        1500.0,
        'Female',
        '18k Gold Ring with a center diamond and side accent diamonds',
        'https://www.josephjewelry.com/images/rings-engagement/Custom-Yellow-Gold-and-Diamond-Engagement-Ring-Y-3qtr-100433.jpg',
        'https://i.pinimg.com/736x/88/0b/b3/880bb3f7cd2f1968e41bcbfb1de21d77.jpg'
    ),
    (
        'Gold Diamond Tie Clip',
        600.0,
        550.0,
        'Male',
        '18k gold tie clip with a single diamond accent.',
        'https://m.media-amazon.com/images/I/61EPnju0BIL._AC_UY1000_.jpg',
        'https://m.media-amazon.com/images/I/51QCdEPEJaL._AC_SY500_.jpg'
    ),
    (
        'Gold Diamond Brooch',
        1000.0,
        950.0,
        'Female',
        '18k gold brooch with a cluster of diamonds.',
        'https://i.etsystatic.com/6382786/r/il/7fa56a/5312396898/il_570xN.5312396898_apxm.jpg',
        'https://i.etsystatic.com/6382786/r/il/2d3204/5360571157/il_fullxfull.5360571157_jk0f.jpg'
    ),
    (
        'Gold Diamond Watch',
        2500.0,
        2300.0,
        'Male',
        '18k gold watch with diamond bezel.',
        'https://www.jbw.com/cdn/shop/products/1-jbw-cristal-34-j6383a-gold-diamond-watch-front-web.png?v=1681483207&width=1100',
        'https://www.jbw.com/cdn/shop/products/cristal-34_0000_2-jbw-cristal-34-j6383a-gold-diamond-watch-angle_png.png?v=1681483213&width=1100'
    ),
    (
        'Gold Diamond Hair Pin',
        700.0,
        650.0,
        'Female',
        '18k gold hair pin with diamond accents.',
        'https://www.butterlaneantiques.com/cdn/shop/files/VictorianPearl_DiamondHairPin_3_1000x.jpg?v=1700647641',
        'https://www.butterlaneantiques.com/cdn/shop/files/VictorianPearl_DiamondHairPin_1_1000x.jpg?v=1700647641'
    ),
    (
        'Gold Diamond Money Clip',
        650.0,
        600.0,
        'Male',
        '18k gold money clip with diamond inset.',
        'https://applesofgold.com/jewelry/gold-plated-star-cut-diamond-money-clip.jpg',
        'https://applesofgold.com/jewelry/gold-plated-star-cut-diamond-money-clip-b.jpg'
    );

INSERT INTO
    newsletter (title, content, image)
VALUES
    (
        'Spring Sale Announcement',
        'Our annual spring sale starts next Monday with discounts up to 50%...',
        'spring_sale_banner.png'
    ),
    (
        'Customer Spotlight: ABC Corp',
        'This month we highlight how ABC Corporation implemented our solutions...',
        'abc_corp_logo.jpg'
    ),
    (
        'Tech Tips: Productivity Hacks',
        'Boost your productivity with these five simple techniques...',
        'productivity_infographic.png'
    );

