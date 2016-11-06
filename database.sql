CREATE DATABASE IF NOT EXISTS `nexus_twitch`;
USE `nexus_twitch`;

CREATE TABLE `nude_counter` (
  `username` varchar(20) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `nude_counter` (`username`, `count`) VALUES ('sample', 0);

ALTER TABLE `nude_counter`
  ADD PRIMARY KEY (`username`);
