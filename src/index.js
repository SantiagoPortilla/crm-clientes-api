const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const DBConecction = require("./database/DBConnection")
const productRoutes = require("./routes/product.route")
const customerRoutes = require("./routes/customer.route")
const config = require("./config")

// Camel case
async function starExpressServer(params) {
    const app = express()

    app.use(morgan("dev"))
    app.use(cors())

    app.use(express.json())

    const basseURL = "/api/v1"

    
    app.use(`${basseURL}/product`, productRoutes)

    app.use(`${basseURL}/customer`, customerRoutes)


    app.get("/", (request, response)=>{
        response.json({message: "Hola desde el servidor Express.js"})
    })

    await DBConecction()

    app.listen(config.port, ()=> {
        console.log(`Server listo en http://localhost:${config.port}`);
    })
}

starExpressServer();