CREATE DATABASE IF NOT EXISTS `clean_architecture`;

USE `clean_architecture`;

DROP TABLE IF EXISTS `instant`;
CREATE TABLE `instant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdOn` varchar(255) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `height` double NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,  
  `user` varchar(255) NOT NULL,
  `weight` double NOT NULL,
  `width` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE DATABASE IF NOT EXISTS `mock_clean_architecture`;

USE `mock_clean_architecture`;

DROP TABLE IF EXISTS `instant`;
CREATE TABLE `instant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdOn` varchar(255) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `height` double NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,  
  `user` varchar(255) NOT NULL,
  `weight` double NOT NULL,
  `width` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
