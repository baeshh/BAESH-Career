import { useEffect, useRef, useState } from 'react';
import LogoParticleAnimation from './LogoParticleAnimation';
import logoSrc from '../assets/BAESH logo.png';

export default function LogoParticleHero() {
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // 로고 이미지 로드
    const img = new Image();
    img.src = logoSrc;
    img.onload = () => {
      setLogoImage(img);
    };

    // 컨테이너 크기 업데이트
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="login-hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 파티클 애니메이션 배경 */}
      {logoImage && dimensions.width > 0 && (
        <LogoParticleAnimation
          logoImage={logoImage}
          width={dimensions.width}
          height={dimensions.height}
          particleCount={1000}
        />
      )}

      {/* 콘텐츠 */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 28, height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
            {logoImage && (
              <img
                src={logoSrc}
                alt="BAESH 로고"
                style={{
                  width: 120,
                  height: 'auto',
                  filter: 'drop-shadow(0 0 20px rgba(30, 111, 255, 0.5))',
                }}
              />
            )}
          </div>
          <h1 className="login-hero__title" style={{ textAlign: 'center' }}>
            당신의 커리어 AI 클론과 <br />함께 성장하세요.
          </h1>
          <p style={{ textAlign: 'center', margin: 0 }}>
            Beyond AI, Toward Humanity.
          </p>
        </div>
        <div className="login-hero__chips" style={{ justifyContent: 'center' }}>
          <span className="login-hero__chip">⚡ 실시간 성장 인사이트</span>
          <span className="login-hero__chip">🤝 1:1 커리어 코칭</span>
          <span className="login-hero__chip">🚀 글로벌 네트워크 추천</span>
        </div>
      </div>
    </div>
  );
}

