import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import LogoParticleAnimation from '../components/LogoParticleAnimation';
import logoSrc from '../assets/BAESH logo.png';

export default function Landing() {
  const navigate = useNavigate();
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // 로고 이미지 로드
    const img = new Image();
    img.src = logoSrc;
    img.crossOrigin = 'anonymous';
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 파티클 애니메이션 배경 */}
      {logoImage && dimensions.width > 0 && (
        <LogoParticleAnimation
          logoImage={logoImage}
          width={dimensions.width}
          height={dimensions.height}
          particleCount={250}
        />
      )}

      {/* 콘텐츠 */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
          textAlign: 'center',
        }}
      >
        {/* 텍스트 */}
        <div
          style={{
            color: '#ffffff',
            animation: 'fadeInUp 1.2s ease-out 0.2s both',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              margin: '0 0 16px 0',
              lineHeight: 1.2,
              background: 'linear-gradient(120deg, #ffffff 0%, #e2edff 45%, #9ac5ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            당신의 커리어 AI 클론과 <br />
            함께 성장하세요.
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
            }}
          >
            Beyond AI, Toward Humanity.
          </p>
        </div>

        {/* CTA 버튼 */}
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '18px 48px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #1E6FFF 0%, #408CFF 100%)',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(30, 111, 255, 0.4)',
            transition: 'all 0.3s ease',
            animation: 'fadeInUp 1.4s ease-out 0.4s both',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(30, 111, 255, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 111, 255, 0.4)';
          }}
        >
          BAESH와 함께하기
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

