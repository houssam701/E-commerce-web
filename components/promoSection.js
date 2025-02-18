'use client';
// In app/components/promoSection.js
import { motion } from 'framer-motion';

const PromoSection = () => {
    return (
        <div className="relative w-full h-[400px] mx-auto overflow-hidden parent-container">
            <div className="relative w-full h-[400px] bg-image5 bg-cover bg-center bg-no-repeat flex justify-center items-center">
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20">
                    <motion.h3
                        className="sm:text-2xl text-[#ef233c]"
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, damping: 25 }}
                    >
                        Up To 70% Off Now
                    </motion.h3>

                    <motion.h1
                        className="sm:text-5xl text-3xl text-white font-bold"
                        initial={{ x: -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, damping: 25 }}
                    >
                        Mid Season Sales
                    </motion.h1>
                </div>
            </div>
        </div>
    );
}

export default PromoSection;
