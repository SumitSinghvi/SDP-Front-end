import React, { useEffect, useRef } from 'react'
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();
    const user = localStorage.getItem('username')
    useEffect(() => {
        if(user){
            navigate('/App');
        }
    },[user])
    const emailRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        var payload = {
            "content": "New email submission:",
            "embeds": [
                {
                    "title": "Email Address",
                    "description": emailRef.current.value,
                    "color": 16777215 // You can set a custom color if desired
                }
            ]
        };
    
        // Send the payload to the Discord webhook
        fetch(import.meta.env.VITE_DISCORD_WEBHOOK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                console.error("Error sending email submission to Discord:", response.statusText);
            } else {
                console.log("Email submission sent successfully to Discord!");
                // You can add additional logic here if needed
            }
        })
        .catch(error => {
            console.error("Error sending email submission to Discord:", error);
        });
    }
    return (
        <div className='flex flex-col m-auto'>
            <Nav />
            <section className='border-y border-black px-6 lg:px-12 py-8 lg:py-16 flex flex-col lg:flex-row bg-gradient-to-r from-[#eedfaf] to-[#c49d28]'>
                <div className='w-full lg:w-3/4 lg:pr-8'>
                    <h1 className='font-bold text-2xl lg:text-3xl xl:text-4xl'>Imagine Whole Community</h1>
                    <h1 className='font-bold text-2xl lg:text-3xl xl:text-4xl mt-1'>Protecting Your Brand</h1>
                    <p className='mt-4 lg:mt-6 xl:mt-8'>Give your customers the power to easily verify your products, transforming them into a loyal force safeguarding your brand from counterfeit threats</p>
                    <a href='#contact'>
                        <button className='mt-6 lg:mt-8 px-4 lg:px-6 py-2 lg:py-3 rounded-sm bg-gray-800 text-white'>Request a Demo</button>
                    </a>
                </div>
                <div className='w-full lg:w-1/4 mt-6 lg:mt-0'>
                    <img src="protect-from-theif.png" alt="thief" className='rounded-lg mx-auto lg:mx-0'/>
                </div>
            </section>
            <section id='benefits' className='px-6 lg:px-12 py-8 lg:py-16 flex flex-col'>
                <h1 className='text-lg lg:text-xl xl:text-2xl mb-8 lg:mb-12'>Experience Cutting-Edge Anti-Counterfeiting Innovation</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <img src="scan.png" alt="Scan" className='w-24 h-24 mx-auto mb-6' />
                        <h2 className='text-lg font-semibold mb-2'>App-less and Easy For End Consumer</h2>
                        <p className='text-sm text-gray-800'>Consumer doesn't have to download any app, we use the native capabilities of smartphone to scan, which increases the overall consumer adoption and engagement.</p>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <img src="theif.png" alt="Thief" className='w-24 h-24 mx-auto mb-6' />
                        <h2 className='text-lg font-semibold mb-2'>Empowers Consumers to Report Fakes</h2>
                        <p className='text-sm text-gray-800'>Consumers can easily report the incident of counterfeiting from their smartphones, along with the pictures and other specific details, which may be used as evidence, this deters the retailers to deal with the shady suppliers.</p>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <img src="scan.png" alt="Scan" className='w-24 h-24 mx-auto mb-6' />
                        <h2 className='text-lg font-semibold mb-2'>Enhanced Customer Trust and Loyalty</h2>
                        <p className='text-sm text-gray-800'>By providing transparent and reliable product authentication, our system fosters trust and loyalty among your customer base, reinforcing your brand's reputation as a provider of authentic and quality products.</p>
                    </div>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <img src="cost.png" alt="Cost" className='w-24 h-24 mx-auto mb-6' />
                        <h2 className='text-lg font-semibold mb-2'>Cost-effective and Sustainable Solution</h2>
                        <p className='text-sm text-gray-800'>Our anti-counterfeit system offers a cost-effective and sustainable solution to protect your brand's integrity and revenue streams. By mitigating the financial and reputational risks associated with counterfeit products, you can focus on driving business growth and innovation.</p>
                    </div>
                </div>
            </section>
            <section id='contact' className="min-h-[600px] flex items-center justify-center bg-gray-100">
                <div className="bg-[#dec782] p-8 md:py-[5rem] rounded-sm text-center shadow-md w-full md:w-3/4 lg:w-[60%]">
                    <h1 className="text-xl mb-4 md:text-2xl">How may we help you ?</h1>
                    <p className="text-gray-600 mb-4 md:mb-8 text-[0.8rem] md:text-[1rem]">Get a free no obligation cost benefit analysis</p>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center sm:flex-row">
                        <input
                            required
                            ref={emailRef}
                            className="w-full sm:w-auto mb-2 sm:mr-2 sm:mb-0 border border-gray-300 rounded-sm px-4 py-1 focus:outline-none"
                            type="email"
                            placeholder="Enter your email"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-1 bg-black text-white rounded-sm hover:bg-gray-800 focus:outline-none"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
  )
}
