'use client';
import { addMessageAction } from "@/actions/messages-actions";
import Footer from "@/components/footer";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ContactPage(){
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFormErrors({});
        
        const formData = new FormData(event.target);
        const result = await addMessageAction(formData);

        if (result.errors) {
            console.log(result.errors);
            setFormErrors(result.errors);
        } else {
            toast.success("Message has been sent!");
            event.target.reset();
        }

        setIsSubmitting(false);
    };
    return <>
     {/* intro */}
     <div className="relative w-full h-[300px] mx-auto overflow-hidden parent-container">
                <div className="w-full bg-watch h-[300px] bg-cover bg-center text-white flex justify-center items-center ">
                    <div className="flex justify-between  max-w-[1000px] w-[80%] mt-8">
                        <h1 className="sm:text-4xl text-2xl font-bold">Contact</h1>
                        <p className="text-xl ">Home &rsaquo; &rsaquo; <span className="text-[#ef233c]">Contact Us</span> </p>
                    </div>
                </div>
            </div>
            {/* body */}
            <div className="flex flex-col w-full items-center mt-[80px]">
                <h1 className="text-[#ef233c] font-bold text-sm">GET IN TOUCH</h1>
                <h2 className="sm:text-4xl text-3xl font-bold mt-1 text-center">Contact With Our Support During Emergency!</h2>
                <div className="flex sm:flex-row flex-col gap-4 w-full justify-center mt-[50px]">
                    {/* 1 */}
                    <div className="flex w-[320px]">
                        <div className="h-full p-4">
                            <div className="bg-[#ef233c] p-[13px] rounded-full"><FaMapMarkerAlt className="text-white text-3xl"/></div>
                        </div>
                        <div>
                            <p className="text-xl font-bold">Office Address:</p>
                            <p  className="text-lg">lorem Lorem ipsum, #4148 Honey street, NY - 62617.</p>
                        </div>
                    </div>
                    {/* 1 */}
                    <div className="flex w-[320px]">
                        <div className="h-full p-4">
                            <div className="bg-[#ef233c] p-[13px] rounded-full"> <FaPhoneAlt className="text-white text-3xl" />
                            </div>
                        </div>
                        <div>
                            <p className="text-xl font-bold">Call for help :</p>
                            <p className="text-lg">+961 70 558 236</p>
                            <p className="text-lg">+961 71 558 236</p>
                        </div>
                    </div>
                    {/* 1 */}
                    <div className="flex w-[320px]">
                        <div className="h-full p-4">
                            <div className="bg-[#ef233c] p-[13px] rounded-full"><FaEnvelope className="text-white text-3xl" /></div>
                        </div>
                        <div>
                            <p className="text-xl font-bold">Mail us:</p>
                            <p className="text-lg">support@gmail.com.</p>
                            <p className="text-lg">support3@gmail.com.</p>
                        </div>
                    </div>
                </div>
                {/* ends of contact features */}
                <div className="flex flex-col items-center mt-[50px] w-full">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[800px] w-full p-2">
                    <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name*" 
                    required 
                    className="w-full p-4 border border-transparent focus:ring-0 focus:outline-none focus:border-[#ef233c] rounded-md" 
                    />
                    {formErrors?.name && <p className="text-red-500 ml-2">{formErrors.name}</p>}
                    <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email*" 
                    required 
                    className="w-full p-4 border border-transparent focus:ring-0 focus:outline-none focus:border-[#ef233c] rounded-md" 
                    />
                    {formErrors?.email && <p className="text-red-500 ml-2">{formErrors.email}</p>}
                    <input 
                    type="text" 
                    name="phone" 
                    placeholder="Enter Your Phone Number*" 
                    required 
                    className="w-full p-4 border border-transparent focus:ring-0 focus:outline-none focus:border-[#ef233c] rounded-md" 
                    />
                    {formErrors?.phone && <p className="text-red-500 ml-2">{formErrors.phone}</p>}
                    <textarea
                    name="message"
                    placeholder="Type Your Message Here*"
                    required
                    className="w-full min-h-[200px] p-4 border border-transparent focus:ring-0 focus:outline-none focus:border-[#ef233c] rounded-md resize-y"
                    />
                    {formErrors?.message && <p className="text-red-500 ml-2">{formErrors.message}</p>}
                    <button className="bg-[#ef233c] text-white text-xl p-3 w-[200px] rounded-sm self-end hover:bg-[#ef233bae]">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                    </form>
                </div>
                {/* ends of message form */}
                <div className="w-full max-w-[800px] p-2"> 
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26496.810299484838!2d35.50106364918212!3d33.887045161565155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut!5e0!3m2!1sen!2slb!4v1737746613924!5m2!1sen!2slb" 
                    className="w-full" 
                    height="400" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
            </div> 
            <Footer/>
    </>
}