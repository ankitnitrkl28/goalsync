import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const user = await login(email, password);
            toast.success(`Welcome back, ${user.name}!`);
            navigate(`/${user.role.toLowerCase()}/dashboard`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative z-10 px-4">
            <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 mx-auto mb-4">
                    <span className="text-white font-bold text-3xl">G</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
                <p className="text-gray-400 font-medium">Log in to your GoalPortal account</p>
            </div>
            
            <Card hoverEffect={true}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input 
                        label="Email Address" 
                        type="email" 
                        name="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="john.doe@company.com" 
                        required 
                    />
                    
                    <div className="space-y-1">
                        <Input 
                            label="Password" 
                            type="password" 
                            name="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••" 
                            required 
                        />
                        <div className="text-right">
                             <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-purple-400 transition-colors">Forgot password?</Link>
                        </div>
                    </div>

                    <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                        Sign In
                    </Button>
                </form>
            </Card>

            <p className="text-center mt-8 text-gray-500 text-sm">
                Don't have an account? <Link to="/register" className="text-blue-400 hover:text-purple-400 hover:underline transition-colors font-medium">Request access</Link>
            </p>
        </div>
    );
};

export default Login;
