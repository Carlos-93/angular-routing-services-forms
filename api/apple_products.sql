-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-05-2024 a las 22:34:20
-- Versión del servidor: 8.0.36
-- Versión de PHP: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `apple_products`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `reference` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `offer` tinyint(1) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`reference`, `name`, `price`, `description`, `type`, `offer`, `image`) VALUES
('53-001', 'iPhone 15 Pro Max', 1299.99, 'El iPhone 15 Pro Max es el smartphone más potente y avanzado jamás creado por Apple', 'iPhone', 0, './assets/images/iphone15-pro.png'),
('53-002', 'iPhone 15', 999.99, 'El iPhone 15 es el smartphone más potente y avanzado jamás creado por Apple', 'iPhone', 1, './assets/images/iphone15.png'),
('53-003', 'iPhone 15 Plus', 1099.99, 'El iPhone 15 Plus es el smartphone más potente y avanzado jamás creado por Apple', 'iPhone', 0, './assets/images/iphone15-plus.png'),
('53-004', 'MacBook Pro M3', 1999.99, 'El MacBook Pro M3 es el portátil más potente y avanzado jamás creado por Apple', 'Mac', 0, './assets/images/macbook-pro-m3.png'),
('53-005', 'MacBook Air M3', 999.99, 'El MacBook Air M3 es el portátil más potente y avanzado jamás creado por Apple', 'Mac', 1, './assets/images/macbook-air-m3.png'),
('53-006', 'MacBook Pro M2', 1499.99, 'El MacBook Pro M2 es el portátil más potente y avanzado jamás creado por Apple', 'Mac', 0, './assets/images/macbook-pro-m2.png'),
('53-007', 'iPad Pro', 799.99, 'El iPad Pro es la tablet más potente y avanzada jamás creada por Apple', 'iPad', 0, './assets/images/ipad-pro.png'),
('53-008', 'iPad Air', 499.99, 'El iPad Air es la tablet más potente y avanzada jamás creada por Apple', 'iPad', 1, './assets/images/ipad-air.png'),
('53-009', 'iPad Mini', 399.99, 'El iPad Mini es la tablet compacta más potente y avanzada jamás creada por Apple', 'iPad', 0, './assets/images/ipad-mini.png'),
('53-010', 'Apple Watch Ultra 2', 399.99, 'El Apple Watch Ultra 2 es el smartwatch más potente y avanzado jamás creado por Apple', 'Apple Watch', 0, './assets/images/watch-ultra-2.png'),
('53-011', 'Apple Watch SE', 199.99, 'El Apple Watch SE es el smartwatch más potente y avanzado jamás creado por Apple', 'Apple Watch', 1, './assets/images/watch-se.png'),
('53-012', 'Apple Watch Series 7', 499.99, 'El Apple Watch Series 7 es el smartwatch más avanzado y con más funcionalidades jamás creado por Apple', 'Apple Watch', 0, './assets/images/watch-series7.png'),
('53-013', 'AirPods Pro 2ª Gen', 199.99, 'Los AirPods Pro 2ª Gen son los auriculares inalámbricos más potentes y avanzados jamás creados por Apple', 'AirPods', 0, './assets/images/airpods-pro-2gen.png'),
('53-014', 'AirPods 3ª Gen', 299.99, 'Los AirPods 3ª Gen son los auriculares inalámbricos más potentes y avanzados jamás creados por Apple', 'AirPods', 1, './assets/images/airpods-3gen.png'),
('53-015', 'AirPods Max', 549.99, 'Los AirPods Max son los auriculares de diadema más avanzados y con mejor calidad de sonido jamás creados por Apple', 'AirPods', 0, './assets/images/airpods-max.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`reference`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
