/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : bms_db

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-02-26 11:45:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `book`
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int(26) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `code` varchar(26) NOT NULL COMMENT '图书编号',
  `name` varchar(40) NOT NULL COMMENT '图书名',
  `description` varchar(100) NOT NULL COMMENT '图书描述',
  `isBorrow` varchar(2) NOT NULL DEFAULT '00' COMMENT '是否被借阅：00-未被借、01-已被借',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code唯一` (`code`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', 'ab001', '大陆通史（一）', '《大陆通史》第一册，记载大陆上古时代的历史', '00', '2018-02-14 10:24:07', '2018-02-14 10:24:12');
INSERT INTO `book` VALUES ('2', 'ab002', '大陆通史（二）', '大陆通史二', '01', '2018-02-23 15:07:23', '2018-02-23 15:07:27');
INSERT INTO `book` VALUES ('3', 'ab003', '大陆通史（三）', '大陆通史三', '00', '2018-02-23 15:07:16', '2018-02-23 15:07:21');
INSERT INTO `book` VALUES ('4', 'ab004', '大陆通史（四）', '大陆通史四', '00', '2018-02-23 15:07:08', '2018-02-23 15:07:08');
INSERT INTO `book` VALUES ('5', 'ab005', '大陆通史（五）', '大陆通史五', '00', '2018-02-24 10:39:49', '2018-02-24 10:53:39');

-- ----------------------------
-- Table structure for `borrow`
-- ----------------------------
DROP TABLE IF EXISTS `borrow`;
CREATE TABLE `borrow` (
  `id` int(26) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(26) NOT NULL COMMENT '借阅者id',
  `bid` int(26) NOT NULL COMMENT '图书id',
  `date` datetime NOT NULL COMMENT '借阅日期',
  `isReturn` varchar(2) NOT NULL DEFAULT '00' COMMENT '是否归还：00-未还、01-已还',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of borrow
-- ----------------------------
INSERT INTO `borrow` VALUES ('1', '2', '1', '2018-02-24 15:16:32', '1');
INSERT INTO `borrow` VALUES ('2', '3', '2', '2018-02-24 16:50:05', '00');
INSERT INTO `borrow` VALUES ('3', '2', '1', '2018-02-24 17:47:48', '1');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(26) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `account` varchar(26) NOT NULL COMMENT '账号',
  `password` varchar(26) NOT NULL COMMENT '密码',
  `username` varchar(26) DEFAULT NULL COMMENT '用户名',
  `type` varchar(2) NOT NULL DEFAULT '00' COMMENT '用户类型：00-管理员，01-用户',
  PRIMARY KEY (`id`,`account`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin001', 'admin001', '管理员001', '00');
INSERT INTO `user` VALUES ('2', 'user001', 'user001', '用户001', '01');
INSERT INTO `user` VALUES ('3', 'user002', 'user002', '用户002', '01');
