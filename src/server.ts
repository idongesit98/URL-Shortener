import app from './app';
import syncDatabase from './Model/sync';

const PORT = 4000

syncDatabase()

app.listen(PORT, ()=>{
    console.log(`Server is runnning on PORT: ${PORT}`)
})
