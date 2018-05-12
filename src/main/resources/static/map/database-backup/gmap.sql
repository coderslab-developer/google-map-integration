-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.7.17-log


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema gmap
--

CREATE DATABASE IF NOT EXISTS gmap;
USE gmap;

--
-- Definition of table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `addressId` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(200) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `address`
--

/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` (`addressId`,`city`,`company`,`country`,`latitude`,`longitude`) VALUES 
 (1,'Rajshahi','CodersLab','Bangladesh','24.3636','88.6241'),
 (2,'Comilla','CodersLab','Bangladesh','23.4607','91.1809'),
 (3,'Khulna','CodersLab','Bangladesh','22.8456','89.5403'),
 (4,'Dhaka','CodersLab','Bangladesh','23.8103','90.4125'),
 (5,'Sylhet','CodersLab','Bangladesh','24.8949','91.8687');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;


--
-- Definition of table `driverlocation`
--

DROP TABLE IF EXISTS `driverlocation`;
CREATE TABLE `driverlocation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `driverId` int(11) DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `locationName` varchar(100) DEFAULT NULL,
  `locationTime` datetime NOT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `driverlocation`
--

/*!40000 ALTER TABLE `driverlocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `driverlocation` ENABLE KEYS */;


--
-- Definition of table `job`
--

DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `jobId` int(11) NOT NULL AUTO_INCREMENT,
  `collectionAddressId` int(11) DEFAULT NULL,
  `createDate` datetime NOT NULL,
  `delivered` tinyint(1) DEFAULT NULL,
  `deliveryAddressId` int(11) DEFAULT NULL,
  `driverAssigned` tinyint(1) DEFAULT NULL,
  `hawbNumber` varchar(200) DEFAULT NULL,
  `received` tinyint(1) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`jobId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job`
--

/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` (`jobId`,`collectionAddressId`,`createDate`,`delivered`,`deliveryAddressId`,`driverAssigned`,`hawbNumber`,`received`,`status`,`userId`) VALUES 
 (1,1,'2018-05-12 15:02:57',0,2,0,'EX62857667056496077671205201815025761',0,1,1),
 (2,3,'2018-05-12 21:05:45',0,2,0,'EX43382879188222760841205201821054438',0,1,1),
 (3,2,'2018-05-12 21:06:44',0,4,0,'EX70813485283542004851205201821064428',0,1,1),
 (4,4,'2018-05-12 21:07:40',0,1,0,'EX60999971758865724451205201821073988',0,1,1);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;


--
-- Definition of table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `userType` varchar(100) DEFAULT NULL,
  `vehicleType` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userId`,`latitude`,`longitude`,`status`,`userName`,`userType`,`vehicleType`) VALUES 
 (1,'22.354406','91.804080',1,'User A','DRIVER','VAN'),
 (2,'25.947984','88.974323',1,'User B','DRIVER','VAN'),
 (3,'23.162313','89.168808',1,'User C','DRIVER','VAN'),
 (4,'24.851366','90.935383',1,'User D','DRIVER','VAN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
