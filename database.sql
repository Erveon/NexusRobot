
CREATE DATABASE IF NOT EXISTS `nexus_twitch`;
USE `nexus_twitch`;

CREATE TABLE `nude_counter` (
  `username` varchar(20) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `nude_counter` (`username`, `count`) VALUES ('sample', 0);

ALTER TABLE `nude_counter`
  ADD PRIMARY KEY (`username`);



CREATE TABLE `custom_commands` (
	`command_name` varchar(20) NOT NULL,
	`command_output` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `custom_commands` (`command_name`,`command_output`) VALUES ('command','output');

ALTER TABLE `custom_commands`
  ADD PRIMARY KEY (`command_name`);