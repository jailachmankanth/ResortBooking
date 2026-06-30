import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import auth from '../../Authentication/firebase'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './style.scss'

function index() {
    const [userInput, setUserInput] = useState({ name: "", mail: "", password: "" })
    const navigate = useNavigate()

    function handleChange(e) {
        setUserInput({ ...userInput, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, userInput.mail, userInput.password)
            await axios.post('http://localhost:3000/profiles', {
                "user_name": userInput.name,
                "user_mail": userInput.mail

            })
            navigate('/login')

        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="signup-container">

            <div className="signup-banner">
                <img src="sara-dubler-Koei_7yYtIo-unsplash.jpg" alt="resort" />

                <div className="overlay"></div>
                
                <div className="banner-content">
                    <h1>The Grandoria Collections</h1>

                    <p>
                        “A world of grandeur, luxury, and exceptional experiences.”
                    </p>
                </div>
            </div>

            <div className="signup-form-wrapper">

                <form className="signup-form" onSubmit={handleSubmit}>

                    <h2 className="form-title">
                        Create an Account
                    </h2>

                    <p className="form-slogan">
                        Join Aura Resorts and begin your luxury getaway journey.
                    </p>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="mail"
                        placeholder="Email Address"
                        required
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                    />

                    <button className="button-btn" type="submit">
                        Create Account
                    </button>

                    <p className="login-link">
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </p>

                </form>

            </div>

        </div>
    )
}

export default index