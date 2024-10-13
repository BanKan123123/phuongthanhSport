import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, TextInput, Button, Label } from 'flowbite-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Default credentials
        const defaultUsername = 'admin';
        const defaultPassword = '123qwe';

        if (username === defaultUsername && password === defaultPassword) {
            // Store credentials in LocalStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            // Redirect to admin page
            navigate('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Modal show={true} size="md">
                <Modal.Header>Đăng nhập</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleLogin}>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="mb-4">
                            <Label htmlFor="username" value="Tên đăng nhập" />
                            <TextInput
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" value="Mật khẩu" />
                            <TextInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">Đăng nhập</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Login;
