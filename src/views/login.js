import './login.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Convertimos el cuerpo a JSON
            });
    
            const data = await response.json(); // Parseamos la respuesta JSON
            console.error(data.message);
            // Verificamos si el token existe
            const token = data.token;
            if (!token) {
                alert("no se pudo hacer el login");
                return;
            }
    
            sessionStorage.setItem("authToken", token);
            navigate("/dashboard");
    
        } catch (error) {
            console.error("Error en la solicitud de login:", error);
        }
    }
    

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <div>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Introduce tu correo"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu contraseña"
                        required
                    />
                </div>
                <button onClick={handleLogin}>Iniciar sesión</button>
                <Link to={'/register'}>registrate</Link>
            </div>
        </div>
    );
}