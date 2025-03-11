import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME!,
    process.env.DATABASE_USER!,
    process.env.DATABASE_PASSWORD,
    {
        host:process.env.DATABASE_HOST,
        dialect:'mysql',
        logging:false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch(err => {
        console.error('Error connected to the database:',err)
    })
    
export default sequelize;