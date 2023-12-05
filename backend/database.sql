-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema chat-zap-zap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema chat-zap-zap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chat-zap-zap` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `chat-zap-zap` ;

-- -----------------------------------------------------
-- Table `chat-zap-zap`.`SequelizeMeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat-zap-zap`.`SequelizeMeta` (
  `name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chat-zap-zap`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat-zap-zap`.`users` (
  `phone_number` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`phone_number`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chat-zap-zap`.`users_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat-zap-zap`.`users_rooms` (
  `room_id` VARCHAR(255) NOT NULL,
  `phone_number1` VARCHAR(255) NOT NULL,
  `phone_number2` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`room_id`),
  INDEX `phone_number1` (`phone_number1` ASC) VISIBLE,
  INDEX `phone_number2` (`phone_number2` ASC) VISIBLE,
  CONSTRAINT `users_rooms_ibfk_1`
    FOREIGN KEY (`phone_number1`)
    REFERENCES `chat-zap-zap`.`users` (`phone_number`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `users_rooms_ibfk_2`
    FOREIGN KEY (`phone_number2`)
    REFERENCES `chat-zap-zap`.`users` (`phone_number`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
