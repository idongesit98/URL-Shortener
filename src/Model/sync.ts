import sequelize from "../Utils/Config/sqlConnect"

const syncDatabase = async() =>{
    try {
        sequelize.sync().then(() =>{
            console.log("Database sync successfully")
        })
    } catch (error) {
        console.error("Error syncing database:", error)
    }
}

export default syncDatabase