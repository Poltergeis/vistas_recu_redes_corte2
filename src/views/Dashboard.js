import './Dashboard.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Dashboard() {
    const [email, setEmail] = useState('');
    const [tokenExists, setTokenExists] = useState(false);
    let token = sessionStorage.getItem('authToken');

    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            let response = await fetch(process.env.REACT_APP_API_URL + '/auth/token', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            });
            response = await response.json();
            if (response.success) {
                console.info("usuario valido");
                setEmail(response.email);
                setTokenExists(true);
            } else {
                console.warn("usuario invalido");
                console.error(response.message);
                navigate("/");
            }
        })();
    }, []);

    async function handleDelete() {
        let response = await fetch(process.env.REACT_APP_API_URL + '/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        response = await response.json();
        alert(response.message);
        if (response.success) {
            alert(response.message);
            setEmail('');
        } else {
            console.error(response.message);
        }
    }

    async function handleEdit() {
        Swal.fire({
            title: 'Editar Usuario',
            html: `
                <input id="email" class="swal2-input" placeholder="Correo electrónico" />
            `,
            focusConfirm: false,
            preConfirm: async () => {
                const email = document.getElementById('email').value;
                
                if (!email) {
                    Swal.showValidationMessage('Por favor ingrese todos los campos');
                    return false;
                }
                let response = await fetch(process.env.REACT_APP_API_URL + '/edit', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({email})
                });
                response = await response.json();
                if (response.success) {
                    setEmail(response.email);
                    token = response.token;
                    return true;
                } else {
                    Swal.showValidationMessage(response.message);
                    return false;
                }
            }
        });
    }

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="dashboard-content">
                <div className="info-item">
                    <strong>Correo electrónico:</strong> {email}
                </div>
                <div className="info-item">
                    <strong>Token Existente:</strong> {tokenExists ? "Sí" : "No"}
                </div>
                <div className="button-group">
                    <button onClick={handleEdit} className="edit-button">Editar</button>
                    <button onClick={handleDelete} className="delete-button">Eliminar</button>
                </div>
            </div>
        </div>
    );
};