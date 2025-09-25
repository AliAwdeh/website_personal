"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type SectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Section({ title, subtitle, children }: SectionProps) {
  const MotionDiv = motion.div as React.FC<HTMLMotionProps<"div">>;
  return (
    <section className="section">
      <div className="mb-8">
        <h2 className="h2">{title}</h2>
        {subtitle && <p className="p-dim mt-1">{subtitle}</p>}
      </div>
      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </MotionDiv>
    </section>
  );
}
