import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const INPUT_CLASSES =
    "w-full bg-white/5 border border-white/[0.08] rounded-md text-white/85 text-[11px] font-medium " +
    "py-[7px] px-2.5 pl-7 outline-none transition-colors caret-orange-500 " +
    "placeholder:text-white/20 placeholder:text-[10px] placeholder:font-medium placeholder:tracking-[0.05em] " +
    "focus:border-white/20 focus:bg-white/[0.07]";

const LoginForm = ({ onSubmit, loading }) => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative group">
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
                    <User size={12} />
                </div>

                <input
                    required
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="Username or Email"
                    className={INPUT_CLASSES}
                />
            </div>

            <div className="relative group">
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors">
                    <Lock size={12} />
                </div>

                <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={INPUT_CLASSES}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                    {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
            </div>

            <div className="flex items-center justify-between px-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer group">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-2.5 h-2.5 rounded-sm border-white/20 bg-transparent text-orange-500 focus:ring-0"
                    />
                    <span className="text-[8px] font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-widest">
                        Remember Me
                    </span>
                </label>

                <button
                    type="button"
                    className="text-[8px] font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors"
                >
                    Help?
                </button>
            </div>

            <div className="flex justify-center pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[linear-gradient(135deg,_#f97316_0%,_#ea580c_100%)] hover:bg-[linear-gradient(135deg,_#fb923c_0%,_#f97316_100%)]
                        text-white rounded-md py-[5px] px-5 text-[9px] font-extrabold tracking-[0.15em] uppercase
                        cursor-pointer transition-all duration-150 ease-in-out
                        shadow-[0_4px_12px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_16px_rgba(249,115,22,0.45)] hover:-translate-y-px
                        active:translate-y-px active:shadow-[0_2px_8px_rgba(249,115,22,0.3)]
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                    {loading ? <Loader2 className="animate-spin" size={12} /> : 'Login'}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;