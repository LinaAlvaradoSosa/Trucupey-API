import User from "../models/user.models.js";
import Contact from "../models/contact.models.js"
import Message from "../models/contact.models.js"
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();



export async function register(req, res) {
    try {
        const {name, email, password} = req.body
        if(!name) return res.send('The name is required')
        if(!email) return res.send('The name is required')
        if(!password) return res.send('The password is required')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if(!emailRegex.test(email)) return res.send('Email is no valid')
        if(!passwordRegex.test(password)) return res.send('The password must contain uppercase, lowercase, a number and a character.')
        
        const newAdmi = await User.create(req.body);

        return res.status(201).json({ok:true, newAdmi})  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});  
    }
    
}

export async function login(req, res) {
    try {
        let infoUser = req.body;
        let user = await User.findOne({email: infoUser.email})
        if (user) {
            let clave = infoUser.password
            if (user.password == clave) {
                let payload = {
                    id: user._id,
                    roll: user.roll,
                    name: `${user.name}`
                }
                let KEY = process.env.KEY
                let token = jwt.sign(payload, KEY, {expiresIn:"2h"})
                res.status(200).json({token:token, id:user._id})
                
            } else {
                res.status(400).send({msj:"Invalid credentials"})
            }
            
        } else {
            res.status(400).send({msj:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});      
    }
    
}

export async function  saveMessage(req, res) {
    try {
        const { name, lastName, email, message } = req.body;
        if (!name || !email || !message) return res.status(400).json({ error: "Nombre, correo y mensaje son obligatorios." });
        
        const newMessage = new Contact({ name, lastName, email, message });
        await newMessage.save();
        res.status(201).json({ message: "Mensaje guardado con éxito." });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el mensaje." });
    }
};
export async function showMessages(req, res) {
    try {
        const messages = await Message.find();
        res.status(201).json({ok:true, messages})  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});
    }
}
export async function deleteMessage(req, res) {
    const { id } = req.params
    try {
        const findMessage = await Message.findById({_id: id});
        if (!findMessage) return res.send ('The message does not exist');

        const delateMessage = await Message.findByIdAndDelete({_id: id})
        res.status(201).json({ok:true, delateMessage});   
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: "Error, please contact the admin"});
    } 
}

