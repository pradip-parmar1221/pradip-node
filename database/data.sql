-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 06:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `isactive` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `uuid`, `email`, `username`, `password`, `currency`, `isactive`, `created_at`, `updated_at`) VALUES
(1, 'e0987c44-93fa-45d9-a0df-0700917cefe3', 'test@gmail.com', 'pradip', 'parmar', 'USD', 1, '2024-11-20 23:01:04', '2024-11-20 23:01:04'),
(2, 'caaad905-c099-4363-a948-15d0a2eaa7cb', 'test1@gmail.com', 'pradipad', 'parmar', 'USD', 1, '2024-11-20 23:01:20', '2024-11-20 23:01:20'),
(3, '734f252f-2a62-4922-9412-f3ab2c7c3a57', 'test1@gmail.com', 'pradipad', 'parmar', 'USD', 1, '2024-11-20 23:10:52', '2024-11-20 23:10:52'),
(4, '48043c4e-8e69-4fe9-b239-3923bc6e72ed', 'test1@gmail.com', 'pradipad', 'parmar', 'USD', 1, '2024-11-20 23:10:56', '2024-11-20 23:10:56'),
(5, 'e82dfef6-4591-4672-8ca1-31a4c2066125', 'test1@gmail.com', 'pradipad', 'parmar', 'USD', 1, '2024-11-20 23:11:44', '2024-11-20 23:11:44'),
(6, 'a8491360-5d91-4d8e-b45c-f59ac545875c', 'test11@gmail.com', 'pradipad', '123456', 'USD', 1, '2024-11-20 23:13:44', '2024-11-20 23:13:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
