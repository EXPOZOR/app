"use client";

import { motion } from "framer-motion";

/**
 * Small client boundaries for entry/viewport motion inside otherwise static
 * server components. Keeping these primitives in one module prevents entire
 * marketing sections from becoming client components just for decoration.
 */
export const MotionA = motion.a;
export const MotionArticle = motion.article;
export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionLi = motion.li;
export const MotionP = motion.p;
export const MotionSpan = motion.span;
export const MotionUl = motion.ul;
