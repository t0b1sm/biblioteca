import { criarUsuario, buscarUsuarioPorEmail } from "../models/userModel";

export async function registrarUsuario(req, res) {
    try {
        const {nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({erro: "Preencha todos os campos!"});
        }

        const SenhaForte = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if(!SenhaForte.test(senha)){
            return res.status(400).json({erro: "A senha deve ter pelo menos 6 caracteres, uma letra maiúscula e um caractere especial."});
        }

        const usuarioExistente = await buscarUsuarioPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({erro: "Email já cadastrado!"});
        }

        const novoUsuario = await criarUsuario (nome, email, senha);
        res.status(201).json({mensagem: "Usuário cadastrado com sucesso!", usuario: novoUsuario});
    
    
    }catch(error){
        console.error(error);
        res.status(500).json({erro: "Erro ao cadastrar usuário."});
    }
}