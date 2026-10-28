'use client';

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import styles from './ScreenCarousel.module.css';

const COMPACT_QUERY = '(max-width: 1100px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const AUTOPLAY_INTERVAL_MS = 4000;
/** 마우스로 이만큼 이상 끌면 다음/이전 장으로 넘긴다 */
const DRAG_THRESHOLD_PX = 50;

type DragState = { startX: number; startScrollLeft: number; startIndex: number };

type ScreenCarouselProps = {
  label: string;
  /** 점 버튼 이름 (슬라이드 순서와 같다) */
  slideTitles: string[];
  children: ReactNode;
};

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    // 정적 HTML을 만들 때는 넓은 화면 기준
    () => false,
  );
}

/**
 * 1100px 초과: 화면을 나란히 보여 준다.
 * 1100px 이하: 한 장씩 보여 주는 슬라이드 — 스와이프·점 버튼으로 넘기고, 4초마다 자동으로 넘어간다.
 * 자동 넘김은 마우스가 슬라이드(화면·설명) 위에 있는 동안만 쉰다. 직접 넘기면 그 장부터 다시 4초를 센다.
 * 터치는 기본 스크롤로, 마우스는 끌어서(drag) 좌우로 넘긴다.
 */
export default function ScreenCarousel({ label, slideTitles, children }: ScreenCarouselProps) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);

  const isCompact = useMediaQuery(COMPACT_QUERY);
  // 동작 줄이기 설정이면 미끄러지지 않고 바로 바뀐다
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const scrollToSlide = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({
        left: index * track.clientWidth,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion],
  );

  const autoplayActive = isCompact && !hovered;

  // activeIndex가 바뀔 때마다 타이머를 새로 걸어, 직접 넘긴 뒤에도 4초를 다시 센다
  useEffect(() => {
    if (!autoplayActive) return;
    const timer = window.setTimeout(() => {
      scrollToSlide((activeIndex + 1) % slides.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [autoplayActive, activeIndex, slides.length, scrollToSlide]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  // 마우스 끌기: 끄는 동안은 스냅을 끄고 손을 따라 움직이다가, 놓으면 넘길 장으로 맞춘다
  const dragRef = useRef<DragState | null>(null);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!isCompact || !track || event.pointerType !== 'mouse' || event.button !== 0) return;
    event.preventDefault();
    track.setPointerCapture(event.pointerId);
    track.dataset.dragging = 'true';
    dragRef.current = {
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      startIndex: Math.round(track.scrollLeft / track.clientWidth),
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag) return;
    track.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag) return;
    dragRef.current = null;
    delete track.dataset.dragging;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);

    const dragged = event.clientX - drag.startX;
    let target = drag.startIndex;
    if (dragged <= -DRAG_THRESHOLD_PX) target += 1;
    if (dragged >= DRAG_THRESHOLD_PX) target -= 1;
    scrollToSlide(Math.min(Math.max(target, 0), slides.length - 1));
  };

  return (
    <div className={styles.carousel}>
      <div
        ref={trackRef}
        className={styles.track}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={isCompact ? 0 : undefined}
        onScroll={handleScroll}
        // 터치의 탭은 hover로 남아 계속 멈추므로 실제 마우스만 본다
        onPointerEnter={(event) => setHovered(event.pointerType === 'mouse')}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {slideTitles.map((title, index) => (
          <button
            key={title}
            type="button"
            className={styles.dot}
            aria-label={title}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
