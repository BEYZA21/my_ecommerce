CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    store_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'draft', -- draft, published
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Performans için index
CREATE INDEX idx_products_store_status_created 
    ON products(store_id, status, created_at);
