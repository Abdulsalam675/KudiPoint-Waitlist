import React, { useState, useEffect, useRef, memo } from "react";
import "./Hero.css";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function Hero() {
  const [isAnimated, setIsAnimated] = useState(false);
  const headerRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoinWaitlist = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("https://kudipoint.ng/wait-list.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      const message = data.message || "Something went wrong";

      if (data.status) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setLoading(false);
      setFormData({ name: "", email: "" });
    }
  };

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
          <form onSubmit={handleJoinWaitlist}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? (
                <ClipLoader size={25} color="#fff" />
              ) : (
                "Join Waitlist"
              )}
            </button>
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
      <Toaster />
    </div>
  );
}

export default memo(Hero);
