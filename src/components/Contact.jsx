import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [currentLocation, setCurrentLocation] = useState(null);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Name validation
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }

        // Message validation
        if (formData.message.trim() === '') {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Save data to localStorage
            const previousData = JSON.parse(localStorage.getItem('contactFormData')) || [];
            const newData = [...previousData, formData];
            localStorage.setItem('contactFormData', JSON.stringify(newData));

            // Optionally, you can clear the form after submission
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            toast("Message sent Successfully");
        }
    };

    useEffect(() => {
        // Display errors in the console for debugging
        console.log(errors);
    }, [errors]);


    useEffect(() => {
        // Use the Geolocation API to get the user's current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            (error) => {
                console.error('Error getting current location:', error.message);
            }
        );
    }, []);

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />

            <div style={{ padding: "4rem" }}>
                <h2>Contact Us</h2>
                <p>
                    Have questions, feedback, or just want to get in touch? We'd love to hear from you!
                </p>

                <h3>Contact Information</h3>
                <p>
                    Email: <a href="mailto:recipx@gmail.com">recipx@gmail.com</a>
                    <br />
                    Phone: <a href="tel:123456789">123456789</a>
                </p>

                <h3>Connect on Social Media</h3>
                <p>
                    Follow us on social media for the latest updates, recipes, and community interactions:
                    <br />
                    - Facebook: <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Recipex Facebook</a>
                    <br />
                    - Twitter: <a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer">Recipex Twitter</a>
                    <br />
                    - Instagram: <a href=" https://www.instagram.com/accounts/login/?hl=en" target="_blank" rel="noopener noreferrer">Recipex Instagram</a>
                </p>

                <h3>Visit Our Office</h3>
                <p>
                If you prefer a face-to-face conversation, you can visit our office at:
                <br />
               Recipex
                <br />
                {currentLocation && (
                    <a
                        href={`https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                       recipex address
                    </a>
                )}
            </p>


                <h3>Send Us a Message</h3>
                <p>
                    Use the form below to send us a message. We'll get back to you as soon as possible!
                </p>

                {/* Add a simple contact form here with fields for name, email, message, etc. */}
                {/* You may want to use a form library like Formik or react-hook-form for more advanced form handling */}
                {/* Example: */}
                {/* 
            */}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    <p className="error">{errors.name}</p>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    <p className="error">{errors.email}</p>

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
                    <p className="error">{errors.message}</p>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact