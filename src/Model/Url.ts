import { DataType, DataTypes, Model } from "sequelize"; 
import sequelize from '../Utils/Config/sqlConnect';

class Url extends Model{
    public id!: number;
    public original_url!:string;
    public short_code!:string;
    public access_count!:number;
    public readonly created_at!:Date;
}

Url.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        original_url:{
            type:DataTypes.STRING(2048),
            allowNull:false
        },
        short_code:{
            type:DataTypes.STRING(10),
            allowNull:false,
            unique:true
        },
        access_count:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        }
    },
    {
        sequelize,
        tableName:'urls',
        timestamps:true,
        createdAt:'created_at'
    }
);

export default Url;