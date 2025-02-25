import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import gsap from "gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import sideAnime from "/public/images/fogetpassword.lottie"; // Ensure this is a .lottie file

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const loaderRef = useRef(null);

    // GSAP Animation
    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
    }, [step]);

    // Show/Hide Loader
    const showLoader = () => {
        setLoading(true);
        gsap.to(loaderRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    };

    const hideLoader = () => {
        gsap.to(loaderRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => setLoading(false) });
    };

    // API Calls
    const handleSendOtp = async () => {
        showLoader();
        try {
            await axios.post("http://localhost:8080/auth/forgot-password", null, { params: { email } });
            toast.success("OTP sent successfully!");
            setStep(2);
        } catch (error) {
            toast.error("Error sending OTP");
        } finally {
            hideLoader();
        }
    };

    const handleVerifyOtp = async () => {
        showLoader();
        try {
            const response = await axios.post("http://localhost:8080/auth/verify-otp", null, { params: { email, otp } });
            if (response.data === "OTP Verified!") {
                toast.success("OTP Verified!");
                setStep(3);
            } else {
                toast.error("Invalid OTP!");
            }
        } catch (error) {
            toast.error("Error verifying OTP");
        } finally {
            hideLoader();
        }
    };

    const handleResetPassword = async () => {
        showLoader();
        try {
            await axios.post("http://localhost:8080/auth/reset-password", null, { params: { email, newPassword } });
            toast.success("Password reset successfully!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            toast.error("Error resetting password");
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="flex flex-col font-walsheim md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-yellow-500 to-orange-600 p-6 relative">
            {/* Loader */}
            {loading && (
                <div ref={loaderRef} className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Left Side: Lottie Animation */}
            <div className="hidden md:block w-1/2">
                <DotLottieReact src={sideAnime} autoplay loop className="max-w-sm mx-auto" />
            </div>

            {/* Right Side: Form */}
            <div ref={containerRef} className="w-full md:w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-lg">
                {step === 1 && (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Password?</h2>
                        <h1 className="text-sm font-walsheim text-gray-400 mb-6 text-center ">Enter your email and we'll send you a one-time password (OTP) to reset your password.</h1>
                        <input
                            type="email"
                            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-1  focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                            onClick={handleSendOtp}>
                            Send OTP
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter OTP</h2>
                        <input
                            type="text"
                            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-green-400"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                            onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Password</h2>
                        <input
                            type="password"
                            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button className="mt-4 w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
                            onClick={handleResetPassword}>
                            Reset Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PasswordReset;
