"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Animated Section Component
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Animated Card Component
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={scaleIn}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fade In Text Component
interface FadeInTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInText({ children, className = "", delay = 0 }: FadeInTextProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Container for lists
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className = "" }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Item for list children
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

// Animated Number Counter
interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({ value, suffix = "", className = "" }: AnimatedNumberProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      {value}{suffix}
    </motion.span>
  );
}

// Step-by-step Guide Animation
interface AnimatedStepProps {
  stepNumber: number;
  title: string;
  description: string;
  children?: ReactNode;
}

export function AnimatedStep({ stepNumber, title, description, children }: AnimatedStepProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={fadeInUp}
      className="relative pl-12 sm:pl-16 pb-8 last:pb-0"
    >
      {/* Step Number Circle */}
      <div className="absolute left-0 top-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-primary/20"
        >
          {stepNumber}
        </motion.div>
      </div>
      
      {/* Connecting Line */}
      <div className="absolute left-[19px] top-10 w-0.5 h-full bg-gradient-to-b from-brand-primary/30 to-transparent" />
      
      {/* Content */}
      <div>
        <h3 className="font-semibold text-text-primary text-lg mb-2">{title}</h3>
        <p className="text-text-secondary mb-4">{description}</p>
        {children}
      </div>
    </motion.div>
  );
}
