import React, { useState, useEffect, useRef, memo } from "react";
import "./Hero.css";

function Hero() {
  const [isAnimated, setIsAnimated] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            entry.target.classList.add("animate");
            setIsAnimated(true);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px" }
    );

    observer.observe(header);

    return () => {
      if (header) {
        observer.unobserve(header);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="logo-container">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="KudiPoint Logo"
          className="logo"
        />
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
          <img
            src={`${process.env.PUBLIC_URL}/assets/mockup.png`}
            alt="mockup"
            className="preview-img"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Hero);
