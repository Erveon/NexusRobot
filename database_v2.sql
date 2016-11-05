CREATE DATABASE IF NOT EXISTS `nexus_twitch`;
USE `nexus_twitch`;

CREATE TABLE `command_counter_v2` (
  `username` varchar(20) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `command_counter_v2` (`username`, `count`) VALUES ('sample', 0);

ALTER TABLE `command_counter_v2`
  ADD PRIMARY KEY (`username`);
