USE otmdb;

DROP TABLE IF EXISTS t_comment;
DROP TABLE IF EXISTS t_like;
DROP TABLE IF EXISTS t_collection;
DROP TABLE IF EXISTS t_article;
DROP TABLE IF EXISTS t_user;

CREATE TABLE t_article (
	Guid VARCHAR(36) NOT NULL PRIMARY KEY,
	Author VARCHAR(36) NOT NULL,
	Title VARCHAR(128) NULL,
	Content VARCHAR(16000) NOT NULL,
	CreatedAt DATETIME NOT NULL,
	Category VARCHAR(5) NULL,
	LastModified DATETIME NULL,
	ViewsCount INT
	-- FOREIGN KEY (Guid) REFERENCES t_comment(ArticleGuid)
) CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE t_comment (
	ID INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
	Guid VARCHAR(36) NOT NULL PRIMARY KEY,
	Content VARCHAR(1024) NOT NULL,
	ArticleGuid VARCHAR(36) NOT NULL,
	CreationDate DATETIME NOT NULL,
	Author VARCHAR(128) NOT NULL,
	ReplyToUser VARCHAR(36) NULL,
	ReplyToArticle VARCHAR(36) NULL,
	FOREIGN KEY (ArticleGuid) REFERENCES t_article (Guid) 
    ON DELETE CASCADE ON UPDATE CASCADE
) CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE t_like (
	ID INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
	ArticleGuid VARCHAR(36) NOT NULL,
	UserGuid VARCHAR(36) NOT NULL,
	CreatedAt DATETIME NOT NULL,
	FOREIGN KEY (ArticleGuid) REFERENCES t_article (Guid)
    ON DELETE CASCADE ON UPDATE CASCADE
) CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE t_user (
    Guid VARCHAR(36) NOT NULL PRIMARY KEY,
	Username VARCHAR(36) NOT NULL UNIQUE,
    Email VARCHAR(70) NOT NULL,
    SaltKey VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    LastLogin DATETIME NULL,
	IsAactivated BIT NULL,
    Mobile VARCHAR(20) NULL
) CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE t_collection (
	ID INT(10) NOT NULL UNIQUE AUTO_INCREMENT,
	Guid VARCHAR(36) NOT NULL,
    ArticleGuid VARCHAR(36) NOT NULL,
	Category VARCHAR(5) NULL,
	CreatedAt DATETIME NOT NULL,
	FOREIGN KEY (Guid) REFERENCES t_user (Guid)
    ON DELETE CASCADE ON UPDATE CASCADE
 ) CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;


