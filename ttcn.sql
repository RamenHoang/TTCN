-- MySQL dump 10.13  Distrib 8.0.21, for osx10.14 (x86_64)
--
-- Host: localhost    Database: ttcn
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ta_baithi`
--

DROP TABLE IF EXISTS `ta_baithi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ta_baithi` (
  `MaBaiThi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `TenBaiThi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `CheDo` tinyint(1) DEFAULT NULL,
  `NgayTao` date DEFAULT NULL,
  `BaiThiYeuThich` tinyint(1) DEFAULT NULL,
  `MaUserTao` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'user_0123456789',
  `ChuDe` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `ThoiGianBatDau` datetime DEFAULT NULL,
  `ThoiGianThi` int DEFAULT NULL,
  `AnhBia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `MatKhauBaiThi` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`MaBaiThi`),
  KEY `MaUser` (`MaUserTao`),
  CONSTRAINT `ta_baithi_ibfk_1` FOREIGN KEY (`MaUserTao`) REFERENCES `ta_user` (`MaUser`) ON DELETE SET DEFAULT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ta_baithi`
--

LOCK TABLES `ta_baithi` WRITE;
/*!40000 ALTER TABLE `ta_baithi` DISABLE KEYS */;
INSERT INTO `ta_baithi` VALUES ('baithi_czBsGrIK6y','HSG',0,NULL,0,'user_gn5I8D5032','string','2020-11-11 09:26:00',40,NULL,'123qwe!@#'),('baithi_fsCAZwCDnd','HSG CCC',0,'2020-11-10',0,'user_gn5I8D5032','string','2020-11-11 09:26:00',40,NULL,'123qwe!@#');
/*!40000 ALTER TABLE `ta_baithi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ta_cauhoi`
--

DROP TABLE IF EXISTS `ta_cauhoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ta_cauhoi` (
  `MaCauHoi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `NoiDungCauHoi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `MaNganHang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'nganhang_0123456789',
  `AnhDinhKem` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`MaCauHoi`),
  KEY `MaNganHang` (`MaNganHang`),
  CONSTRAINT `ta_cauhoi_ibfk_1` FOREIGN KEY (`MaNganHang`) REFERENCES `ta_nganhang` (`MaNganHang`) ON DELETE SET DEFAULT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ta_cauhoi`
--

LOCK TABLES `ta_cauhoi` WRITE;
/*!40000 ALTER TABLE `ta_cauhoi` DISABLE KEYS */;
/*!40000 ALTER TABLE `ta_cauhoi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ta_dapan`
--

DROP TABLE IF EXISTS `ta_dapan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ta_dapan` (
  `MaDapAn` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `MaCauHoi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `NoiDungDapAn` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `CauTraLoiDung` tinyint(1) NOT NULL,
  `AnhDinhKem` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`MaDapAn`),
  KEY `MaCauHoi` (`MaCauHoi`),
  CONSTRAINT `ta_dapan_ibfk_1` FOREIGN KEY (`MaCauHoi`) REFERENCES `ta_cauhoi` (`MaCauHoi`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ta_dapan`
--

LOCK TABLES `ta_dapan` WRITE;
/*!40000 ALTER TABLE `ta_dapan` DISABLE KEYS */;
/*!40000 ALTER TABLE `ta_dapan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ta_goicauhoi`
--

DROP TABLE IF EXISTS `ta_goicauhoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ta_goicauhoi` (
  `MaCauHoi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `MaBaiThi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`MaCauHoi`,`MaBaiThi`),
  KEY `MaBaiThi` (`MaBaiThi`),
  CONSTRAINT `ta_goicauhoi_ibfk_1` FOREIGN KEY (`MaBaiThi`) REFERENCES `ta_baithi` (`MaBaiThi`) ON DELETE CASCADE,
  CONSTRAINT `ta_goicauhoi_ibfk_2` FOREIGN KEY (`MaCauHoi`) REFERENCES `ta_cauhoi` (`MaCauHoi`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ta_goicauhoi`
--

LOCK TABLES `ta_goicauhoi` WRITE;
/*!40000 ALTER TABLE `ta_goicauhoi` DISABLE KEYS */;
/*!40000 ALTER TABLE `ta_goicauhoi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ta_hstraloi`
--

DROP TABLE IF EXISTS `ta_hstraloi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ta_hstraloi` (
  `MaCauTraLoi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `MaBaiThi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `MaUserThi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `DiemThi` float DEFAULT NULL,
  `MaCauHoi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `TraLoi` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`MaCauTraLoi`),
  KEY `MaBaiThi` (`MaBaiThi`),
  KEY `MaUserThi` (`MaUserThi`),
  KEY `TA_HSTRALOI_FK` (`MaCauHoi`,`MaBaiThi`),
  CONSTRAINT `ta_hstraloi_ibfk_1` FOREIGN KEY (`MaBaiThi`) REFERENCES `ta_goicauhoi` (`MaBaiThi`) ON DELETE CASCADE,
  CONSTRAINT `ta_hstraloi_ibfk_2` FOREIGN KEY (`MaCauHoi`) REFERENCES `ta_goicauhoi` (`MaCauHoi`) ON DELETE CASCADE,
  CONSTRAINT `ta_hstraloi_ibfk_3` FOREIGN KEY (`MaUserThi`) REFERENCES `ta_user` (`MaUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ta_hstraloi`
--

LOCK TABLES `ta_hstraloi` WRITE;
/*!40000 ALTER TABLE `ta_hstraloi` DISABLE KEYS */;
/*!40000 ALTER TABLE `ta_hstraloi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ta_nganhang`
--

DROP TABLE IF EXISTS `ta_nganhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ta_nganhang` (
  `MaNganHang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `TenNganHang` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `LinhVuc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `MoTa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `ThuocTinh` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`MaNganHang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ta_nganhang`
--

LOCK TABLES `ta_nganhang` WRITE;
/*!40000 ALTER TABLE `ta_nganhang` DISABLE KEYS */;
INSERT INTO `ta_nganhang` VALUES ('nganhang_psQPgZ2AxQ','Tin học đại cương','C++','Khó vãi lều',0),('nganhang_ZrUKr2ne5p','17Nh11','AI','Oh shit',0);
/*!40000 ALTER TABLE `ta_nganhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ta_user`
--

DROP TABLE IF EXISTS `ta_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ta_user` (
  `MaUser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `HoTen` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `GioiTinh` int DEFAULT NULL,
  `NgaySinh` date DEFAULT NULL,
  `QueQuan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `NgheNghiep` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `SoNgayHoatDong` smallint DEFAULT NULL,
  `TrangThai` int DEFAULT NULL,
  `Email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `SoDienThoai` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `NoiLamViec` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `Username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`MaUser`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ta_user`
--

LOCK TABLES `ta_user` WRITE;
/*!40000 ALTER TABLE `ta_user` DISABLE KEYS */;
INSERT INTO `ta_user` VALUES ('user_gn5I8D5032','Nguyễn Văn Bố',1,NULL,'Quảng Nam','hs',NULL,NULL,'ramen1235@gmail.com','0123456789','Mỹ','ramen1235','$2b$10$myV2o8wu8BxJEoRuHPWz4uc4QbPYMBP2w.BZ48PJW9Up3WCZnZjJO'),('user_iBb25tJ9wz','Hà Văn Thạnh',NULL,NULL,NULL,'hs',NULL,NULL,NULL,NULL,NULL,'hungmldut','$2b$10$59sukQFUAqQLUF7/vcbS3OgVjw6zNUlh/0OdFZnCkONqo7RBPVZY6'),('user_IkBvk21cay','Hà Văn Thạnhh',NULL,NULL,NULL,'hs',NULL,NULL,NULL,NULL,NULL,'hungmldutt','$2b$10$RJ7Py3ZydXW1uj5AO152reu8dkcZXFdy9IumulVe9u9khbiO3uj4G'),('user_roVsEXwseg','Nguyễn Văn Đời',1,'1999-11-11','Quảng Nam','adm',NULL,NULL,'ramen0000@gmail.com','0123456789','Mỹ','ramen0000','$2b$10$v/4xrDAFX9i0p.HFxNO0t.ZA6wmg2LBKaHTXGHQjsvY2F1.p2BR0G');
/*!40000 ALTER TABLE `ta_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-13  5:50:59
