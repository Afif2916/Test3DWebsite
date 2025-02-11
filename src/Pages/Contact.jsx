import React, { useState, useRef, Suspense } from "react"
import emailjs from '@emailjs/browser'
import { Canvas } from "@react-three/fiber"
import Fox from "../Models/Fox"
import Loader from "../Components/Loader"
import useAlert from "../Hooks/useAlert"
import Alert from "../Components/Alert"

const Contact = () => {

    const [form, setForm] = useState({name: "", email: "" , message: ""})
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef(null)
    const [currentAnimation, setCurrentAnimation] = useState('idle')
    const {alert, showAlert, hideAlert} = useAlert()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFocus = () => setCurrentAnimation('walk')

    const handleBlur = () => setCurrentAnimation('idle')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation('hit')
      
        try {
          await emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
              from_name: form.name,
              to_name: "Afif",
              from_email: form.email,
              to_email: "afif2916@gmail.com",
              message: form.message,
              reply_to: form.email
            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
          );
          setIsLoading(false);
          showAlert({show: true, text: 'Message Sent Successfully!', type:'success'})
          

          setTimeout(() => {
            hideAlert()
            setCurrentAnimation("idle")
            setForm({
                name: "",
                email: "",
                message:"",
            })
          }, [3000])
        } catch (error) {
          setIsLoading(false);
          console.error("EmailJS error:", error);
          setCurrentAnimation("idle")
          showAlert({show: true, text: 'I Didnt receive your Message', type:'danger'})
        }
      };
      
      console.log(currentAnimation)
    return(
        <section className="relative flex lg:flex-row flex-col max-container">

            {alert.show && <Alert {...alert} />}
            <Alert {...alert} />
            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text">Get In touch</h1>

                <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleSubmit}>

                <label className='text-black-500 font-semibold'>
            Name
            <input
              type='text'
              name='name'
              className='input'
              placeholder='John'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              name='email'
              className='input'
              placeholder='John@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
              name='message'
              rows='4'
              className='textarea'
              placeholder='Write your thoughts here...'
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

                    <button className="btn" type="submit" onFocus={handleFocus} onBlur={handleBlur} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>

            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0,0,5],
                        fov: 75,
                        near: 0.1,
                        far: 1000
                    }}
                >
                    <directionalLight intensity={2.5} position={[0,0,1]} />
                    <Suspense fallback={<Loader />}>
                        <Fox
                            currentAnimation={currentAnimation} 
                            position={[0.5, 0.35, 0]}
                            rotation={[12.6, -0.6, 0]}
                            scale={[0.5,0.5,0.5]}
                        />
                    </Suspense>

                </Canvas>
            </div>

        </section>
    )
}

export default Contact