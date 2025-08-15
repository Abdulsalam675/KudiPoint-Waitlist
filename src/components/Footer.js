import React, { memo, useEffect, useRef } from "react";
import "./Footer.css";

function Footer() {
  const footerContentRef = useRef(null); // Renamed to reflect targeting footer-content

  useEffect(() => {
    const footerContent = footerContentRef.current;
    if (!footerContent) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footerContent);

    return () => {
      if (footerContent) {
        observer.unobserve(footerContent);
      }
    };
  }, []);

  const socialMedia = [
    {
      name: "Facebook",
      img: "/assets/facebook.png",
      url: "https://www.facebook.com/profile.php?id=61553805782231",
    },
    {
      name: "Instagram",
      img: "/assets/instagram.png",
      url: "https://www.instagram.com/official_kudipoint.ng?igsh=YzljYTk1ODg3Zg==",
    },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content" ref={footerContentRef}>
        <h2 className="footer-title">Be the first to try Kudipoint</h2>
        <div className="social-links">
          {socialMedia.map(({ name, img, url }) => (
            <a href={url} target="_blank" rel="noopener noreferrer" key={name}>
              <img
                src={`${process.env.PUBLIC_URL}${img}`}
                alt={name}
                className="social-icon"
              />
            </a>
          ))}
        </div>
        <p className="footer-copy">© 2025 KudiPoint. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default memo(Footer);
