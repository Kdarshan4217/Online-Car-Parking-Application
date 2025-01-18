import React, { useEffect, useState } from "react";
import { useLocation, useNavigate , useParams } from "react-router-dom";
import axios from "axios";

const PaymentComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { salonId } = useParams();
    const amount = location.state?.amount || 0; // 🔹 Now correctly fetching amount from Booking
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const appointmentData = location.state?.appointmentData;
    const selectedServices = location.state?.services ;


    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve, reject) => {
                if (window.Razorpay) {
                    resolve();
                    return;
                }
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = resolve;
                script.onerror = () => reject("Failed to load Razorpay SDK.");
                document.body.appendChild(script);
            });
        };

        const handlePayment = async () => {
            setError(null);
            setIsLoading(true);

            if (amount <= 0) {
                setError("Invalid amount. Please try again.");
                setIsLoading(false);
                return;
            }

            try {
                await loadRazorpayScript();
                const options = {
                    key: "rzp_test_W1Q8BUqjEuknLa",
                    amount: amount * 100,
                    currency: "INR",
                    name: "SaloonIT",
                    description: "Payment for Salon Services",
                    handler:  async function  (response) {
                       console.log(response.data);
                        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                        try {
                            const resp = await axios.post("https://localhost:44371/api/Payments", {
                                UserId : JSON.parse(localStorage.getItem("user")).userId,
                                SalonId : salonId,
                                Appointments : appointmentData.map((a) => ({...a ,paymentMethod: "Test" ,price: selectedServices.find((s)=>s.serviceId === a.serviceId)?.cost})),
                                
                              });
    
                            navigate(`/salons/${salonId}/booking/payment/payment-success`, {
                                state: { paymentId: response.razorpay_payment_id },
                            });
                        } catch (error) {
                            alert("Something went wrong.")
                        }
                    },
                    prefill: {
                        name: "Customer Name",
                        email: "customer@example.com",
                        contact: "9999999999",
                    },
                    theme: { color: "#F37254" },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.on("payment.failed", (response) => {
                    console.error("Payment failed:", response.error);
                    setError(`Payment failed: ${response.error.description || "An unexpected error occurred."}`);
                });
                // razorpay.on("payment.success" , async (response) =>{
                    
                // })
                razorpay.open();
            } catch (err) {
                setError("An unexpected error occurred. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        handlePayment();
    }, [amount, navigate, ]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {isLoading ? (
                <div>
                    <h2>Processing Payment...</h2>
                    <p>Amount: ₹{amount}</p>
                </div>
            ) : (
                <div>
                    {error ? (
                        <div style={{ color: "red", marginTop: "100px" }}>
                            <h3>Error</h3>
                            <p>{error}</p>
                            <button onClick={() => navigate("/")} style={{ padding: "10px 20px", background: "#F37254", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                                Go Back
                            </button>
                        </div>
                    ) : (
                        <h2>Payment initialized. Follow the Razorpay popup to complete your payment.</h2>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentComponent;
