import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    'projectsdb',   //base de datos
    'postgres', //usuario
    '',  //passwprd
    {
        host: "localhost",
        dialect: "postgres",
    }
);