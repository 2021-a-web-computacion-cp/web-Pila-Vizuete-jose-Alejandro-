-- CreateTable
CREATE TABLE `cita_medica` (
    `id_cita` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `fecha_registo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `seguro_social` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_cita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
