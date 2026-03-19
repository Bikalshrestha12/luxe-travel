"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { clsx } from "clsx";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = "gold",
  size = "md",
  type = "button",
  disabled = false,
  strength = 40,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!btnRef.current || disabled) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      gsap.to(btnRef.current, {
        x: dx * strength,
        y: dy * (strength * 0.6),
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(innerRef.current, {
        x: dx * (strength * 0.4),
        y: dy * (strength * 0.3),
        duration: 0.5,
        ease: "power3.out",
      });
    },
    [strength, disabled]
  );

  const onMouseLeave = useCallback(() => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.to(innerRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-5 text-lg",
  };

  const variantClasses = {
    gold: "bg-gradient-to-br from-gold-500 to-gold-600 text-obsidian-900 font-semibold",
    outline:
      "border border-gold-600/40 text-gold-400 hover:border-gold-500 hover:text-gold-300",
    ghost:
      "text-text-secondary hover:text-text-primary",
  };

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "relative inline-flex items-center justify-center rounded-full",
        "overflow-hidden transition-all duration-300",
        "font-outfit tracking-wide",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {variant === "gold" && (
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, #f3dc85, #e4b020)",
          }}
        />
      )}
      <span ref={innerRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
