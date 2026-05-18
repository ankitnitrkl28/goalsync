import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            toast.success('Password reset link sent to ' + email);
            setIsLoading(false);
            setEmail('');
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto relative z-10 px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Reset Password</h1>
                <p className="text-gray-400 font-medium">Enter your email to receive a reset link</p>
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

                    <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                        Send Reset Link
                    </Button>
                </form>
            </Card>

            <p className="text-center mt-8 text-gray-500 text-sm">
                Remembered your password? <Link to="/login" className="text-blue-400 hover:text-purple-400 hover:underline transition-colors font-medium">Log in</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
