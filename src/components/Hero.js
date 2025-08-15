import React, { useState, useEffect, useRef, memo } from "react";
import "./Hero.css";

function Hero() {
  const [isAnimated, setIsAnimated] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            entry.target.classList.add("animate");
            setIsAnimated(true); // Prevent re-animation
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px" } // Trigger when 30% visible
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, [isAnimated]);

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/assets/logo.png" alt="KudiPoint Logo" className="logo" />
      </div>
      <div className="wrapper">
        <header className="header" ref={headerRef}>
          <h1>Your All-in-One Wallet for Crypto & Naira</h1>
          <p>
            Swap, send, and spend crypto or Naira with ease — join our waitlist
            and be the first to try it.
          </p>
          <form>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Join Waitlist</button>
          </form>
        </header>
        <div className="preview">
          <img src="/assets/mockup.png" alt="mockup" className="preview-img" />
        </div>
      </div>
    </div>
  );
}

export default memo(Hero);
