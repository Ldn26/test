import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>  
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
            <iframe
              title="King of Sedari Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=1163+Rue+de+Montaran,+Orléans,+France&output=embed"
            ></iframe>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                pointerEvents: "none",
              }}
            ></div>
          </div>

      <footer className="bg-gradient-to-b from-muted/80 to-muted dark:bg-gray-900 py-8 relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center">
            <img
              src={"/logo.svg"}
              alt="Immobilier Logo"
              className="w-28 md:w-32 object-contain animate-fade-in"
            />
          </Link>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 animate-pulse text-center">
            © 2025 Immobilier. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {[
              {
                icon: <FaFacebook />,
                link: "https://www.facebook.com/profile.php?id=100064067344055",
                color: "text-blue-600",
              },
              {
                icon: <FaInstagram />,
                link: "https://www.instagram.com",
                color: "text-pink-500",
              },
              {
                icon: <IoLogoTiktok />,
                link: "https://www.tiktok.com",
                color: "text-black dark:text-white",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${social.color} hover:scale-125 transition-transform duration-500 animate-bounce-slow`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Animated Gradient Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 animate-marquee"></div>
      </footer>
    </>
  );
}

export default Footer;
