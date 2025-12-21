import React, { useEffect, useRef, useState } from 'react';
import '../../styles/statItem.css';

interface StatItemProps {
  number: string;       
  label: string;
  delay?: number;          

  className?: string;
  numberClassName?: string;
  labelClassName?: string;
  style?: React.CSSProperties;
}

const formatWithCommas = (n: number, decimals = 0) => {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.floor(n).toLocaleString();
};

const extractNumericPrefix = (s: string) => {
  const m = s.match(/^([\d,]+(?:\.\d+)?)/);
  if (!m) return { numeric: null, rawNumericString: '', suffix: s };
  const raw = m[1];
  const cleaned = raw.replace(/,/g, '');
  const numeric = cleaned.includes('.') ? parseFloat(cleaned) : parseInt(cleaned, 10);
  const suffix = s.slice(raw.length);
  return { numeric, rawNumericString: raw, suffix };
};

const StatItem: React.FC<StatItemProps> = ({
  number,
  label,
  delay = 0,
  className = '',
  numberClassName = '',
  labelClassName = '',
  style
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState<string>(number); 
  const animatedRef = useRef(false);

  useEffect(() => {
    animatedRef.current = false;
    setDisplay(number);
  }, [number]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            setTimeout(() => {
              startAnimation(number, setDisplay);
            }, delay);
          }
        });
      },
      { threshold: 0.5 } 
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [number, delay]);

  return (
    <div ref={ref} className={`stat-item ${className}`} style={style}>
      <div className={`stat-number ${numberClassName}`} aria-hidden>
        {display}
      </div>
      <div className={`stat-label ${labelClassName}`}>
        {label}
      </div>
    </div>
  );
};

export default StatItem;

/* Helpers */

function startAnimation(targetStr: string, setDisplay: (v: string) => void) {
  const { numeric, rawNumericString, suffix } = extractNumericPrefix(targetStr);

  if (numeric === null) {
    setDisplay(targetStr);
    return;
  }

  const decimals = rawNumericString.includes('.') ? (rawNumericString.split('.')[1].length) : 0;
  const targetValue = numeric;
  const duration = 900; 
  const startTime = performance.now();

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    const current = targetValue * eased;
    const formatted = decimals > 0
      ? Number(current.toFixed(decimals)).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : formatWithCommas(Math.round(current));

    setDisplay(`${formatted}${suffix}`);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setDisplay(`${rawNumericString}${suffix}`);
    }
  };

  requestAnimationFrame(tick);
}
