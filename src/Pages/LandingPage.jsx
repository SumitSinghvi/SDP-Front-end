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
            <section className='border-y border-black px-[150px] py-[2rem] flex bg-gradient-to-r from-[#eedfaf] to-[#c49d28]'>
                <div className='w-3/4 pr-4'>
                    <h1 className='font-bold text-[2rem]'>Imagine Whole Communnity</h1>
                    <h1 className='font-bold text-[2rem] -mt-2'>Protecting Your Brand</h1>
                    <p className='mt-[1rem]'>Give your customers the power to easily verify your products, transforming them into a loyal force safeguarding your brand from counterfeit threats</p>
                    <a href='#contact'>
                        <button className='mt-[1.5rem] px-[1.5rem] py-[0.5rem] rounded-sm bg-gray-800 text-white'>Request a Demo</button>
                    </a>
                </div>
                <div className='w-1/4'>
                    <img src="protect-from-theif.png" alt="theif" className='rounded-lg'/>
                </div>
            </section>
            <section className='px-[150px] py-[4rem] flex flex-col'>
                <h1 className='text-[1.25rem] mb-[3.5rem]'>Experience Cutting-Edge Anti-Counterfeiting Innovation</h1>
                    <div className='flex'>
                        <div>
                            <h2>App-less and Easy For End Consumer</h2>
                            <p className='w-1/2 py-[0.5rem] text-[0.8rem] text-gray-800'>Consumer doesn't have to download any app, we use the native capabilities of smartphone to scan, which increases the overall consumer adoption and engagement.</p> 
                            <h2 className='mt-[2rem]'>Empowers Consumers to Report Fakes</h2>
                            <p className='w-1/2 py-[0.5rem] text-[0.8rem] text-gray-800'>Consumers can easily report the incident of counterfeiting from their smartphones, along with the pictures and other specific details, which may be used as evidence, this deters the retailers to deal with the shady suppliers.</p>
                            <h2 className='mt-[2rem]'>Enhanced Customer Trust and Loyalty</h2>
                            <p className='w-1/2 py-[0.5rem] text-[0.8rem] text-gray-800'>By providing transparent and reliable product authentication, our system fosters trust and loyalty among your customer base, reinforcing your brand's reputation as a provider of authentic and quality products.</p>
                            <h2 className='mt-[2rem]'>Cost-effective and Sustainable Solution</h2>
                            <p className='w-1/2 py-[0.5rem] text-[0.8rem] text-gray-800'>Our anti-counterfeit system offers a cost-effective and sustainable solution to protect your brand's integrity and revenue streams. By mitigating the financial and reputational risks associated with counterfeit products, you can focus on driving business growth and innovation.</p>
                        </div>
                        <div className='-mt-[4rem]'>
                            <img src="scan.png" alt="" />
                            <img src="theif.png" alt="" />
                            <img src="cost.png" alt="" />
                        </div>
                    </div>
            </section>
            <section id='contact' className='flex justify-center items-center bg-gray-100 py-[5rem]'>
                <div className='bg-[#dec782] py-[4rem] px-[20rem] text-[1.5rem] flex flex-col text-center'>
                    <h1>How May We Help You?</h1>
                    <p className='text-[1rem] py-[1rem] text-gray-700'>Get a free no obligation cost benefit analysis</p>
                    <div>
                        <form onSubmit={handleSubmit} className='flex gap-4 py-[1rem]'>
                            <input required ref={emailRef} className='text-[1rem] px-[1rem] outline-none' placeholder='Enter email'/>
                            <button type='submit' className='text-[1rem] bg-white px-[1rem]'>Submit</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
  )
}
