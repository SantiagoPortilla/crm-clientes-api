const Customer = require("../schemas/Customer")

const getCustomers = async (req, res) => {
    try {
        const { search, limit} = req.query
        
        const regex = new RegExp(search, 'i')

        const customers = await Customer.find({ 
            $or: [{name: regex}, {email: regex}, {company: regex}] 
        })

        return res.status(200).json({
            ok: true,
            message: "",
            customers,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error con el servidor"
        })
    }
}

const createCustomer = async (req, res) =>{
    try {
        console.log(req.body);   
        const {name, email, company, phone} = req.body

        const newCustomer = new Customer({name, email, company, phone})

        const customerSaved = await newCustomer.save()

        return res.status(200).json({
            ok: true,
            message: "Cliente creado con exito",
            customer: customerSaved
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error con el servidor"
        })
    }
}

const updateCustomer = async (req, res) => {
    try {  
        const {id, name, email, company, phone} = req.body

        const userExist = await Customer.exists({_id: id})

        if (!userExist) return res.status(404).json({
            ok: false,
            message: "No existe el cliente"
        })

        const customerUpdate = await Customer.findByIdAndUpdate(
            id, {
                $set: { name, email, company, phone},
        }, {new: true})

        return res.status(200).json({
            ok: true,
            message: "Cliente actualizado con exito",
            product: null
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error con el servidor"
        })
    }
}

const deleteCustomer = async (req, res) => {
    try {  
        const { id } = req.body

        const userExist = await Customer.exists({_id: id})

        if (!userExist) return res.status(500).json({
            ok: false,
            message: "No existe el cliente"
        })

        const customerDeleted = await Customer.deleteOne({ _id: id})

        return res.status(404).json({
            ok: true,
            message: "Cliente eliminado con exito",
            customer: {_id: id, ...customerDeleted}
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Ocurrio un error con el servidor"
        })
    }
}

module.exports = {getCustomers, createCustomer, updateCustomer, deleteCustomer}