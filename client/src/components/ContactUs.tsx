import type React from "react";

import { motion, useInView } from "framer-motion";
import { useRef, } from "react";

import { Mail, MapPin, Phone } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute top-20 left-0 w-full h-40 pointer-events-none opacity-10">
        <div className="w-full h-full flex items-center justify-center">
          <div className="lg:text-8xl text-5xl font-bold  transform text-primary -rotate-12">
            Contact nous
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent text-black ">
            Contactez nous
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r  text-[#7B542F] mx-auto mb-6"></div>
        </motion.div>

        <div className="flex items-center justify-center  flex-col-reverse lg:flex-row  gap-12 max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <div className="cflex  items-center gap-8 space-y-6">
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-[#7B542F] mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Email
                    </h4>
                    <a
                      href="mailto:laidani.youcef@example.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      Mokhtariadominio@hotmail.it
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-[#7B542F] mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Phone
                    </h4>
                    <a
                      href="tel:+213123456789"
                      className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      06 42 08 60 22
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-text-[#7B542F]  mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      1163 rue du montaran Saran , Saran, France{" "}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=" max-w-3xl mx-auto"
          >
            <img
              src="/sec12.png"
              alt="section  images "
              className="rounded-xl w-[650px]  h-[380px]"
            />
          </motion.div>
        </div>

      </div>

    </section>
  );
}