CREATE DATABASE IF NOT EXISTS `nexus_twitch`;
USE `nexus_twitch`;

CREATE TABLE `command_counter` (
  `command` varchar(20) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `command_counter` (`command`, `count`) VALUES ('nudes', 0);
