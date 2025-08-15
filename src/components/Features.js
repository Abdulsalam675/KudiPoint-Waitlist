import React, { memo, useEffect, useRef } from "react";
import "./Features.css";

function Features() {
  const cardRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const animateOnScroll = (ref) => {
      if (!ref) return null;
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
        { threshold: 0.3 }
      );
      observer.observe(ref);
      return observer;
    };

    const titleObserver = animateOnScroll(titleRef.current);
    const cardObservers = cardRefs.current.map((ref) => animateOnScroll(ref));

    return () => {
      titleObserver?.disconnect();
      cardObservers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  const features = [
    {
      title: "Swap Instantly",
      subTitle:
        "Convert USDT to Naira or vice versa in seconds with competitive rates, perfect for quick exchanges.",
      img: "/assets/swap.png",
    },
    {
      title: "Top Up Airtime & Data",
      subTitle:
        "Recharge your mobile airtime or data plans directly from your wallet with ease.",
      img: "/assets/bills.png",
    },
    {
      title: "Secure Transactions",
      subTitle:
        "Enjoy bank-grade security with PIN protection and real-time fraud detection for every transaction.",
      img: "/assets/shield.png",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="title-section" ref={titleRef}>
          <h2 className="section-title">Why Join Our Waitlist?</h2>
          <p className="section-subtitle">
            Be among the first to experience our platform’s amazing features.
          </p>
        </div>

        <div className="features-grid">
          {features.map(({ title, img, subTitle }, index) => (
            <div
              className="feature-card"
              ref={(el) => (cardRefs.current[index] = el)}
              key={index}
            >
              <div className="icon-wrapper">
                <img src={`${process.env.PUBLIC_URL}${img}`} alt={title} />
              </div>
              <div className="card-text">
                <h3>{title}</h3>
                <p>{subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Features);
