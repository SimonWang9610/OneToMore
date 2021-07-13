DROP USER IF EXISTS 'onetomore'@'localhost';
DROP DATABASE IF EXISTS otmdb;
CREATE DATABASE otmdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'onetomore'@'localhost' IDENTIFIED WITH mysql_native_password BY '961002';
GRANT SELECT, INSERT, DELETE, UPDATE ON otmdb.* TO 'onetomore'@'localhost';
