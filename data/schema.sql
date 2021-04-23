DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(255),
    decription VARCHAR(255),
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE 
);

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    person_name VARCHAR(255) NOT NULL,
    phone_number NUMERIC,
    delivery_place VARCHAR(255),
    item_order VARCHAR(255),
    quantity NUMERIC,
    notes VARCHAR(255),
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE 

);