import Product from "../models/products.models.js";



export async function create(req, res) {
    const {name, price} = req.body;
    try {
        if(!name) return res.send ('Product name is required');
        if(!price) return res.send('Product price is required');
        const newProduct = new Product(req.body);
        await newProduct.save()
        res.status(201).json({ok:true, newProduct})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});
    }
    
}
export async function updateProduct(req, res) {
    try {
        const data = req.body;
        const { id } = req.params

        const findProduct = await Product.findById ({_id: id})
        if(!findProduct) return res.send('The product does not exist')

        const updateProduct = await Product.findByIdAndUpdate(id, data)
        res.status(201).json({ok:true, updateProduct})  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});
    }
    
}
export async function deleteProduct (req, res) {
    const { id } = req.params
    try {
        const findProduct = await Product.findById({_id: id});
        if (!findProduct) return res.send ('The product does not exist');

        const deleteProduct = await Product.findByIdAndDelete({_id : id});
        res.status(201).json({ok:true, deleteProduct})  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});
    }
    
}
export async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(201).json({ok:true, products})  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});
    }
    
}
export async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findById({_id:id});
        if(!product) return res.send('The product does not exist');
        res.status(201).json({ok:true, product})  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});
    }
}
export const getProductsByType = async (req, res) => {
    try {
        const { type } = req.params; 

        const validTypes = ["libretas", "ropa", "accesorios", "hogar"];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: "Tipo de producto no válido" });
        }

        const products = await Product.find({ type }); // Filtra por tipo
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};
export const getProductsByName = async (req, res) => {
    try {
        let name  = req.params.name
        if (name) {
            let data = await Product.find({name:{$regex:name, $options: 'i' }});
            res.status(200).json(data)
        } else {
            let dataProducts = await Product.find();
            res.status(200).json(dataProducts)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Ha ocurrido algo, comunícate con el admin" });
    }
};



