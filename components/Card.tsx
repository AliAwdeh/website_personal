"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type CardProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`card p-6 ${className ?? ""}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
