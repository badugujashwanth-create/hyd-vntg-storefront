import { useEffect, useRef, useState } from 'react';

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${className} reveal ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
