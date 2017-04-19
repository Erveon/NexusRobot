
CREATE DATABASE IF NOT EXISTS `downtaunt_db`;
USE `downtaunt_db`;

CREATE TABLE `custom_commands` (
	`command_name` varchar(20) NOT NULL,
	`command_output` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `custom_commands` (`command_name`,`command_output`) VALUES ('command','output');

ALTER TABLE `custom_commands`
  ADD PRIMARY KEY (`command_name`);