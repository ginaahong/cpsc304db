CREATE DATABASE IF NOT EXISTS 'Craigsbook';
USE 'Craigsbook';

DROP TABLE IF EXISTS 'Advertisement';
DROP TABLE IF EXISTS 'Post_Likes';
DROP TABLE IF EXISTS 'User';
DROP TABLE IF EXISTS 'Seller';
DROP TABLE IF EXISTS 'Buyer';
DROP TABLE IF EXISTS 'Transaction_Has';
DROP TABLE IF EXISTS 'Comment';
DROP TABLE IF EXISTS 'Product_Posts';
DROP TABLE IF EXISTS 'Product_Photo';
DROP TABLE IF EXISTS 'Uses';

CREATE TABLE 'Advertisement' (
    'aid' INTEGER,
    'adimage' VARCHAR(500), -- image LINK
    'adlink' VARCHAR(500), -- if click on add, should link to
    'adtag' VARCHAR(20),
    PRIMARY KEY (aid)
);
