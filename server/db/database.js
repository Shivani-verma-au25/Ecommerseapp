import mongoose from 'mongoose'


const databseConnection = () => {
    try {
        mongoose.connect(`${process.env.MONGO_DB_URL}`)
        .then(()=> console.log("Server is connect to Your database !"))
        .catch((e) => console.log("GEtting Error from DataBase" ,e))
    } catch (error) {
        console.log("Error" ,error);
        
    }
}

export default databseConnection
