import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'Employee', department: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const user = await register(formData.name, formData.email, formData.password, formData.role);
            toast.success('Registration successful!');
            navigate(`/${user.role.toLowerCase()}/dashboard`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative z-10 px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
                <p className="text-gray-400 font-medium">Join GoalPortal</p>
            </div>
            
            <Card hoverEffect={true}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                    <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required />
                    <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                    <Input label="Department" name="department" value={formData.department} onChange={handleChange} placeholder="Engineering" />
                    
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-gray-300 ml-1">Role</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:border-blue-500 appearance-none"
                        >
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
                        Register
                    </Button>
                </form>
            </Card>

            <p className="text-center mt-6 text-gray-500 text-sm">
                Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
            </p>
        </div>
    );
};

export default Register;
