import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Canvas from './Canvas';
import data from './data';
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Add this

gsap.registerPlugin(ScrollTrigger);

function App() {
    const text =
        "THIRTYSIXSTUDO—FOR ALL THINGS DIGITAL PRODUCTION — ";
    const [showCanvas, setShowCanvas] = useState(false);
    const headingref = useRef(null);
    const growingSpan = useRef(null);

    // Presentation item i.e. Agile, Innovative and connected gsap animation
    useGSAP(() => {
        Splitting({ by: 'chars' });
        document.querySelectorAll(".presentation-item .title").forEach((title) => {
            const chars = title.querySelectorAll(".char");

            gsap.set(title, { perspective: 800 });
            gsap.set(chars, { transformOrigin: "left center", backfaceVisibility: "hidden" });

            gsap.fromTo(chars,
                {
                    x: -40,
                    rotateY: -70,
                    scaleX: 0.5,
                    opacity: 0,
                },
                {
                    x: 0,
                    rotateY: 0,
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.025,
                    ease: "none", // use none with scrub
                    scrollTrigger: {
                        trigger: title.parentElement,
                        start: "top 95%",
                        end: "+=200",
                        scrub: 1.5
                    }
                }
            );
        });

        // NEW TEXT REVEAL ANIMATION- How section
        const text = document.querySelector(".reveal-text");

        if (text) {
            const words = text.innerText.split(" ");

            text.innerHTML = words
                .map(
                    word =>
                        `<span class="word"><span class="word-inner">${word}</span></span> `
                )
                .join("");

            gsap.fromTo(
                ".word-inner",
                {
                    y: "100%",
                    opacity: 0
                },
                {
                    y: "0%",
                    opacity: 1,
                    stagger: 0.03,
                    ease: "none",
                    scrollTrigger: {
                        trigger: text,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1
                    }
                }
            );
        }
    }, { scope: null });

    
    useEffect(() => {
        const locomotiveScroll = new LocomotiveScroll();
        Splitting();
    }, []);


    //   What section gsap animation
      useGSAP(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".what-container",
            start: "top 75%",
            end: "top 20%",
            scrub: 1.5
          }
        });
      
        tl.from(".what-section-title", {
          x: -150,
          opacity: 0,
          rotate: -8,
          ease: "none"
        })
      
        .from(".what-heading", {
          scaleX: 0.2,
          scaleY: 1.4,
          opacity: 0,
          filter: "blur(30px)",
          rotateX: 70,
          transformOrigin: "center center",
          ease: "none"
        }, 0.1)
      
        .from(".p-what", {
          y: 150,
          opacity: 0,
          filter: "blur(10px)",
          ease: "none"
        }, 0.3);
      
      });

    //   Who section gsap animation 
    useGSAP(() => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".who-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      
        tl.from(".who-title", {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        })
      
        .from(".who-text", {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.5");
      
      });

          
    // Talk section gsap animation
    useGSAP(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".talk-container",
            start: "top 75%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        });
      
        tl.from(".section-title", {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "expo.out"
        })
      
        .from(".talk-label", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out"
        }, "-=0.5")
      
        .from(".talk-heading", {
          y: 120,
          opacity: 0,
          skewY: 4,
          duration: 1.4,
          ease: "expo.out"
        }, "-=0.4")
      
        .from(".talk-para", {
          y: 80,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");
      
      });

    // On click Show Canvas Effect
    useEffect(() => {
        const handleClick = (e) => {
            setShowCanvas((prevShowCanvas) => {
                if (!prevShowCanvas) {
                    gsap.set(growingSpan.current, {
                        top: e.clientY,
                        left: e.clientX
                    });
                    gsap.to(".presentation-item", {
                        borderBottomColor: "rgba(255,255,255,0.25)",
                        duration: 1.2,
                        ease: "power2.inOut"
                    });
                    gsap.to("body", {
                        color: "#000",
                        backgroundColor: "#fd2c2a",
                        duration: 1.2,
                        ease: "power2.inOut"
                    });
                    gsap.to("footer", {
                        color: "#000",
                        backgroundColor: "#fd2c2a",
                        duration: 1.2,
                        ease: "power2.inOut"
                    });

                    gsap.to(growingSpan.current, {
                        scale: 1000,
                        duration: 2,
                        ease: "power2.inOut",
                        onComplete: () => {
                            gsap.set(growingSpan.current, {
                                scale: 0,
                                clearProps: "all"
                            });
                        }
                    });
                   
                } else {
                    gsap.to("body", {
                        color: "#000",
                        backgroundColor: "#fff",
                        duration: 1.2,
                        ease: "power2.inOut"
                    });
                    gsap.to("footer", {
                        color: "#000",
                        backgroundColor: "#fff",
                        duration: 1.2,
                        ease: "power2.inOut"
                    });
                }

                return !prevShowCanvas;
            });
        };

        const headingElement = headingref.current;
        headingElement.addEventListener("click", handleClick);

        // Clean up event listener on unmount
        return () => headingElement.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            <span ref={growingSpan}
                className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"></span>
            
            {/* ----------- Main Section ------------- */}
            <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
                {
                    showCanvas && data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}
                <div className="w-full relative z-[1] h-screen">

                    {/* ----------- Navbar Section ------------- */}
                    <nav className="w-full p-4 flex justify-between z-50">
                        <div className='brand text-2xl font-md '>Thirtysixstudio</div>
                        <div className='links flex gap-10'>
                            {
                                ["What we do", "Who we are", "How we give back", "Talk to us"].map((link, index) => (
                                    <a key={index}
                                        href={
                                            `#${link.toLowerCase()
                                            }`
                                        }
                                        className="text-xl hover:opacity-60 transition-all duration-300">
                                        {link} </a>
                                ))
                            } 
                        </div>
                    </nav>
                    <hr />

                    {/* ----------- SubContain ------------- */}
                    <div className="textcontainer w-full  px-[25%] pt-[5%]">
                        <div className='text w-[40%]'>
                            <h3 className='text-4xl leading-[1.3]'>
                                At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
                            </h3>
                            <p className='text-md w-[105%] mt-6 font-normal'>
                                We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
                            </p>
                            <p className='text-md mt-7 mb-10'>Scroll</p>
                        </div>
                    </div>

                    {/* ----------- Circular-text Section ------------- */}
                    <div className="circle-container">
                        <div className="circle-wrapper">
                            <div className="circle-text">
                                {text.split("").map((char, index) => {
                                    const rotation = (360 / text.length) * index;
                                    const radius = 110; // half of 220px wrapper

                                    return (
                                        <span
                                            key={index}
                                            style={{
                                                transform: `rotate(${rotation}deg) translate(0, -${radius}px)`,
                                                transformOrigin: '0 0'
                                            }}
                                        >
                                            {char}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ----------- Heading-Title  ------------- */}
                    <div className="w-full relative bottom-35 left-0 mt-40">
                        <h1 ref={headingref}
                            className="text-[17rem] font-normal tracking-tight leading-none pl-5 mt-10">
                            Thirtysixstudios
                        </h1>
                    </div>
                </div>
            </div>

            {/* ----------- What Section ------------- */}
            <div className="w-full relative h-screen mt-32 px-10">
                {
                    showCanvas && data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)
                }
                <div className="textcontainer w-full  px-[25%] pt-[5%]">
                    <div className=' text w-[40%]'>
                        <h2 className="what-section-title text-xl tracking-tighter">
                            <span className="nb">01</span>
                            <span className="dash"> — </span>
                            <span className="text">
                                WHAT WE DO</span>
                        </h2>
                    </div>
                </div>
                <div class="what-container">
                    <p className='what-heading'>
                        We elevate creative production in the advertising industry, transforming ambitious ideas into reality.
                    </p>
                    <div className="p-container">
                        <p class="p-what">
                            By combining cutting-edge craft with modern technology and top-tier processes, we deliver sophisticated work that resonates.<br></br>
                            Our agile approach balances innovation with simplicity, ensuring your journey with us is seamless, transparent, and rewarding from start to finish.
                        </p>
                    </div>
                </div>
            </div>

            {/* ----------- Who Section ------------- */}
            <div className="w-full relative h-screen mt-32 px-10">
                {
                    showCanvas && data[2].map((canvasdets, index) => <Canvas details={canvasdets} />)
                }
                <div className="textcontainer w-full  px-[25%] pt-[0%]">
                    <div className=' text w-[40%]'>
                        <h2 className="who-title text-xl tracking-tighter font-light">
                            <span class="nb">02</span>
                            <span class="dash"> — </span>
                            <span class="text">
                                WHO WE ARE</span>
                        </h2>
                    </div>
                </div>
                <div class="who-container">
                    <p className='who-text'>
                        We elevate creative production, while creating impact and opportunity.                    </p>
                </div>

                <div className="presentation-section" class="section">
                    <div className="presentation-item" >
                        <h2 className="title" data-splitting>
                            Agile
                        </h2>

                        <p class="p-who1">
                            We live and breathe efficiency and are not limited by geography.
                        </p>
                    </div>

                    <div className="presentation-item">
                        <h2 className="title" data-splitting>
                            Innovative
                        </h2>

                        <p class="p-who2">
                            We use carefully crafted operational processes and new technology.
                        </p>
                    </div>

                    <div className="presentation-item">
                        <h2 className="title" data-splitting>
                            Connected
                        </h2>
                        <p class="p-who3">
                            We are community-focused and deeply connected to culture.
                        </p>
                    </div>
                </div>
            </div>

            {/* ----------- How Section ------------- */}
            <div className="w-full relative h-screen mt-32 px-10">
                {
                    showCanvas && data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)
                }
                <div class="how-section">
                    <div class="content">
                        <div className=' text w-[70%]'>
                            <h2 className="text-md tracking-tighter font-light ml-40">
                                <span class="nb">03</span>
                                <span class="dash"> — </span>
                                <span class="text">
                                    HOW WE GIVE BACK</span>
                            </h2>
                        </div>

                        <div className="give-back-content">
                            <p className="reveal-text">
                                At Thirtysixstudio, we recognize that our industry can perpetuate harm.
                                We believe we have to try and reverse some of these imbalances.
                                That's why we're launching SS36, our local social sustainability hub.

                                Through SS36, we reinvest some of our revenue and expertise into the
                                communities that shape culture and trends. Our main focus is on
                                bridging gaps for those affected by systemic obstacles related to race,
                                sexuality, wealth and gender identity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ----------- Talk Section ------------- */}
            <div className="w-full relative h-screen mt-32 px-10">
                {
                    showCanvas && data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)
                }
                <div className="textcontainer w-full  px-[25%] pt-[5%]">
                    <div className=' text w-[40%]'>
                        <h2 className="section-title text-xl tracking-tighter">
                            <span class="nb">04</span>
                            <span class="dash"> — </span>
                            <span class="text">
                                TALK TO US</span>
                        </h2>
                    </div>
                </div>
                <div class="talk-label talk-container">
                    <h2 className='text-md mt-10 font-bold-520'>TALENT</h2>
                    <p className='talk-heading' data-splitting>
                        Thirtysixstudio is always on the lookout for talented collaborators.                    </p>
                    <div className="p-container">
                        <p class="p-talk1 talk-para">
                            We welcome progressive individuals who take pride in delivering exceptional work and possess a continuous drive to learn and grow.</p>
                        <p class="p-talk2 talk-para">We believe this drive thrives best when paired with sustainable workplace practices, because the sharpest, most creative minds need space and nurture to explore, experience, and create.</p>
                    </div>
                </div>
            </div>

            {/* ----------- Footer Section ------------- */}
            <div className=" w-10vh relative  mt-32 p-0">
                {
                    showCanvas && data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)
                }
                <footer className="footer">

                    <div className="footer-top">
                        <span>Built with React</span>
                        <span>GSAP Animations</span>
                        <span>Locomotive Scroll</span>
                        <span>Responsive Design</span>
                    </div>

                    <div className="footer-center">
                        <h2 className=''>
                            Building immersive digital
                            experiences through motion,
                            interaction and storytelling.
                        </h2>
                        <button className='mr-20 mb-20 ml-20%'
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                })
                            }
                        >
                            Back To Top ↑
                        </button>
                    </div>

                    <div className="footer-bottom">
                        <p>
                            A modern interactive website inspired by Thirtysixstudio.
                            Built to explore advanced animations, smooth scrolling,
                            immersive transitions and responsive experiences.
                        </p>

                        <h1>Thirtysixstudio</h1>
                    </div>

                </footer></div>
        </>
    );
}
export default App;
