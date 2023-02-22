-- Cria a base de dados
CREATE DATABASE IF NOT EXISTS `chat-zap-zap`;
USE `chat-zap-zap`;

-- Cria a tabela `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE = InnoDB;

-- Cria a tabela `users_room`
CREATE TABLE IF NOT EXISTS `users_room` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `user_id_1` INT NOT NULL,
  `user_id_2` INT NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `room_id_UNIQUE` (`room_id`),
  INDEX `user_id_1_idx` (`user_id_1`),
  INDEX `user_id_2_idx` (`user_id_2`),
  CONSTRAINT `fk_user_id_1`
    FOREIGN KEY (`user_id_1`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id_2`
    FOREIGN KEY (`user_id_2`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Cria a tabela `user_message`
CREATE TABLE IF NOT EXISTS `user_message` (
  `user_id` INT NOT NULL,
  `room_id` INT NOT NULL,
  `message` VARCHAR(200) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`user_id`, `room_id`),
  INDEX `fk_user_message_room`
    (`room_id`),
  CONSTRAINT `fk_user_message_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_message_room`
    FOREIGN KEY (`room_id`)
    REFERENCES `users_room` (`room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
