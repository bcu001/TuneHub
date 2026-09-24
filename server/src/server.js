import app from "./app.js";
import connectToDatabase from "./database/mongodb.js";
import ENV from "./config/env.js";

const PORT = ENV.PORT || 8000;

const startServer = async () => {
   try{
        await connectToDatabase();
        app.listen(PORT,()=>{
            console.log(`server is running on http://localhost:${PORT}`)
        })
    } catch(error){
        console.error("Error at startServer: ", error);
        process.exit(1);
    }
};

startServer();