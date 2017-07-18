SET NAMES utf8;
DROP DATABASE IF EXISTS starlight;
CREATE DATABASE starlight CHARSET=utf8;
USE starlight;

CREATE TABLE sl_user(
uid INT PRIMARY KEY AUTO_INCREMENT,
uname VARCHAR(10),
upwd VARCHAR(20)
);
INSERT INTO sl_user VALUES
(null,'EasunGuo','123456'),
(null,'Jack','123456'),
(null,'Rose','123456');

CREATE TABLE sl_pic(
pid INT PRIMARY KEY AUTO_INCREMENT,
pname VARCHAR(10),
purl VARCHAR(20),
likeNum INT,
uid INT,
tid VARCHAR(10)
);
INSERT INTO sl_pic VALUES
(null,'picture1','1.jpg',0,1,'1,2'),
(null,'picture2','2.jpg',1,1,'1'),
(null,'picture3','3.jpg',0,1,'2,3'),
(null,'picture4','4.jpg',1,2,'4,5,6'),
(null,'picture5','5.jpg',0,2,'1,3,5'),
(null,'picture6','6.jpg',3,2,'2,4,6'),
(null,'picture7','7.jpg',0,3,'2,5'),
(null,'picture8','8.jpg',0,3,'1,6'),
(null,'picture9','9.jpg',0,3,'3,4');

CREATE TABLE sl_like(
lid INT PRIMARY KEY AUTO_INCREMENT,
uid INT,
pid INT
);
INSERT INTO sl_like VALUES
(null,1,2),
(null,1,4),
(null,1,6),
(null,2,6),
(null,3,6);

CREATE TABLE sl_tag(
tid INT PRIMARY KEY AUTO_INCREMENT,
tname VARCHAR(10)
);
INSERT INTO sl_tag VALUES
(null,'color'),
(null,'sky'),
(null,'star'),
(null,'night'),
(null,'portrait'),
(null,'war');