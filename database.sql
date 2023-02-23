-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema chat-zap-zap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema chat-zap-zap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chat-zap-zap` ;
USE `chat-zap-zap` ;

-- -----------------------------------------------------
-- Table `chat-zap-zap`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat-zap-zap`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `phone_number_UNIQUE` (`phone_number` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chat-zap-zap`.`users_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat-zap-zap`.`users_room` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `user_id1` INT NOT NULL,
  `user_id2` INT NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE INDEX `room_id_UNIQUE` (`room_id` ASC) VISIBLE,
  INDEX `id_idx` (`user_id1` ASC, `user_id2` ASC) VISIBLE,
  CONSTRAINT `id_fk_1`
    FOREIGN KEY (`user_id1`)
    REFERENCES `chat-zap-zap`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `id_fk_2`
    FOREIGN KEY (`user_id2`)
    REFERENCES `chat-zap-zap`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chat-zap-zap`.`user_message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat-zap-zap`.`user_message` (
  `user_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  `message` VARCHAR(200) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`user_id`, `room_id`),
  INDEX `room_id_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `id`
    FOREIGN KEY (`user_id`)
    REFERENCES `chat-zap-zap`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `room_id`
    FOREIGN KEY (`room_id`)
    REFERENCES `chat-zap-zap`.`users_room` (`room_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
