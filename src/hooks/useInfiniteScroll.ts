import { useEffect, useRef, useState } from "react";

export interface UseInfiniteScroll {
  setElement: (element: HTMLHeadingElement) => void
}

export const useInfiniteScroll = (next: () => void): UseInfiniteScroll => {
  const [element, setElement] = useState<HTMLHeadingElement>();
  const observer = useRef<IntersectionObserver>();
  const prevY = useRef(0);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const y = entries[0].boundingClientRect.y;
        prevY.current > y && next();
        prevY.current = y;
      },
      { threshold: 0.5 }
    );
  }, [next]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentObserver && currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentObserver && currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return { setElement };
};
