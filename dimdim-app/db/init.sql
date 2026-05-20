CREATE TABLE IF NOT EXISTS contas (
    id SERIAL PRIMARY KEY,
    titular VARCHAR(100) NOT NULL,
    saldo DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

-- Inserindo alguns dados iniciais
INSERT INTO contas (titular, saldo) VALUES ('Leandro', 1500.50);
INSERT INTO contas (titular, saldo) VALUES ('Gabriel', 3200.00);
INSERT INTO contas (titular, saldo) VALUES ('Kaiky', 800.75);
