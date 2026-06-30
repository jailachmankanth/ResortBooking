import "./index.scss";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
    const [rating,setRating]= useState(0);

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        subject:"",
        message:"",
    });

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const sendEmail = (e)=> {
        e.preventDefault();

        if(
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message 
        ) {
            alert("Please Fill All Fields.");
            return;
        }
        emailjs
            .send(
                "service_8vvttp8",
                "template_cx8g3nm",
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    rating: rating,
                },
                "UQx9MmJoS0T2wBBC0"
            )
            .then(()=>{
                alert("Message Sent Succesfully");

                setFormData({
                    name: "",
                    email:"",
                    subject:"",
                    message:"",
                });
                setRating(0);
            })
            .catch((error) =>{
                console.log(error);
                alert("Failed To send Messsage");
            });
            
    };
    return(
        <div className="contact-page">
            <section className="contact-header">
                <h1>Get In Touch</h1>
                <p> We're here to help plan your perfect getaway.
                    Whether you have questions about our luxury resorts,
                    booking assistance or special requests,
                    our team is always ready to help.Thank You</p>
            </section>
            <section className="contact-cards">
              <div className="card">
                <div className="icon">
                    <FaMapMarkerAlt />
                </div>
                <h3>Office Address</h3>
                <a
                href="https://www.google.com/maps/search/?api=1&query=Maldives"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link">
                <p>Resort <br />
                   123 Coastal Breeze Way <br />
                   Maldives</p></a>
                </div>
                <div className="card">
                   <div className="icon"> <FaPhoneAlt /></div>
                    <h3>Phone</h3>
                    <a className="contact-link" href="tel:+919876543210">+91 9876543210</a>
                </div>
                <div className="card">
                    <div className="icon">
                    <FaEnvelope /></div>
                   <a className="contact-link" href="mailto:contact@auraresorts.com?subject=Resort%20Enquiry">
                    contact@auraresorts.com</a>
                </div>
            </section>
            <section className="contact-body">
                <div className="form-container">
                    <h2>Send us a Message</h2>
                    <form onSubmit={sendEmail}>
                        <label>Full Name</label>
                        <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        />
                        <label>Email Address</label>
                        <input 
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleChange}/>
                        <label>Subject</label>
                        <input 
                        type="text"
                        name="subject"
                        placeholder="Enter Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        />
                        <label>Message</label>
                        <textarea
                         rows="6"
                         name="message"
                         placeholder="Write your message.."
                         value={formData.message}
                         onChange={handleChange}
                         ></textarea>
                         <label>Rate Your Experience</label>
                         <div className="rating">
                            {[1,2,3,4,5].map((star)=>(
                                <span
                                  key={star}
                                  className={rating>=star?"active":""}
                                  onClick={()=>setRating(star)}
                                  >
                                     ★
                                  </span>
                            ))}
                         </div>
                            <button type="submit">  Send Message</button>

                    </form>
                </div>
                 <div className="image-container">

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
            alt="Luxury Resort"
          />
        </div> 
         </section>
        </div>
    );
}
export default Contact;