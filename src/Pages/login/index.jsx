import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../../Authentication/firebase'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'

function index() {
    const [userInput, setUserInput] = useState({ mail: "", password: "" })
    const navigate = useNavigate()

    function handleChange(e) {
        setUserInput({ ...userInput, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const credentials = await signInWithEmailAndPassword(auth, userInput.mail, userInput.password)
                .then((res) => {
                    localStorage.setItem('accessToken', res.user.accessToken)
                })
            const userDetais = await axios.get(`http://localhost:3000/profiles?user_mail=${userInput.mail}`)
            localStorage.setItem('user_id', userDetais.data[0]?.id)
            navigate('/home')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="login-container">

            <div className="login-banner">
                <img src="sara-dubler-Koei_7yYtIo-unsplash.jpg" alt="resort" />

                <div className="overlay"></div>

                <div className="banner-content">
                    <h1>The Grandoria Collections</h1>
                    <p>
                        “A world of grandeur, luxury, and exceptional experiences.”
                    </p>
                </div>
            </div>

            <div className="login-form-wrapper">
                <form className="login-form" onSubmit={handleSubmit}>

                    <h2 className="form-title">Welcome Back</h2>

                    <p className="form-slogan">
                        Sign in to access your tailored luxury experience.
                    </p>

                    <div className="input-group">
                        <input
                            type="email"
                            name="mail"
                            placeholder="Email Address"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="submit-btn" type="submit">
                        Sign In
                    </button>

                    <p className="signup-text">
                        Don't have an account?
                        <Link to="/signup">Sign Up</Link>
                    </p>

                </form>
            </div>

        </div>
    )
}

export default index