import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  midTargetX: number; // 중간 목표 (퍼지는 단계)
  midTargetY: number;
  size: number;
  opacity: number;
  layer: number; // 깊이 레이어 (0: 앞, 1: 중간, 2: 뒤)
}

interface LogoParticleAnimationProps {
  logoImage: HTMLImageElement | null;
  width: number;
  height: number;
  particleCount?: number;
}

export default function LogoParticleAnimation({
  logoImage,
  width,
  height,
  particleCount = 400,
}: LogoParticleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const atomsRef = useRef<Array<{ nucleusX: number; nucleusY: number }>>([]); // 원자 중심점 저장
  const [animationProgress, setAnimationProgress] = useState(0); // 0~1

  // BAESH 핵심 트레이드 컬러
  const primaryColor = '#1E6FFF'; // 메인 파란색
  const secondaryColor = '#408CFF'; // 밝은 파란색

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // 성능 향상
      willReadFrequently: false, // 읽기 최적화
    });
    if (!ctx) return;
    
    // Canvas 렌더링 최적화 (부드러운 렌더링)
    ctx.imageSmoothingEnabled = true; // 부드러운 렌더링
    ctx.imageSmoothingQuality = 'high'; // 고품질 렌더링

    canvas.width = width;
    canvas.height = height;

    // 파티클 초기화 (텍스트 영역 주변을 원형으로 감싸도록 배치)
    const initParticles = () => {
      const particles: Particle[] = [];
      const centerX = width / 2;
      const centerY = height / 2;
      
      // 텍스트 영역의 대략적인 크기 추정
      const textAreaRadius = Math.min(width, height) * 0.2;
      const innerRadius = textAreaRadius + 60;
      const outerRadius = textAreaRadius + Math.min(width, height) * 0.4;
      
      // 원자 구조 생성: 중심 핵 + 주변 전자 궤도
      const atomCount = 6; // 원자 개수
      const atoms: Array<{ 
        nucleusX: number; 
        nucleusY: number; 
        shells: Array<{ radius: number; particles: number }> 
      }> = [];
      
      // 원자들을 텍스트 영역 주변에 배치 (원형이 아닌 원자 구조)
      for (let i = 0; i < atomCount; i++) {
        const angle = (i / atomCount) * Math.PI * 2;
        // 원자 중심을 텍스트 영역 주변에 배치
        const atomRadius = innerRadius + (outerRadius - innerRadius) * 0.6;
        const nucleusX = centerX + Math.cos(angle) * atomRadius;
        const nucleusY = centerY + Math.sin(angle) * atomRadius;
        
        // 각 원자는 여러 전자 궤도를 가짐
        const shells = [
          { radius: 30, particles: 8 },  // 첫 번째 궤도
          { radius: 60, particles: 12 }, // 두 번째 궤도
          { radius: 90, particles: 16 }, // 세 번째 궤도
        ];
        
        atoms.push({ nucleusX, nucleusY, shells });
      }
      
      // 중심 핵 추가 (텍스트 영역 중심)
      const centerNucleus = {
        nucleusX: centerX,
        nucleusY: centerY,
        shells: [
          { radius: 40, particles: 10 },
          { radius: 80, particles: 14 },
          { radius: 120, particles: 18 },
        ]
      };
      atoms.push(centerNucleus);
      
      // 각 원자의 궤도에 파티클 배치
      let particleIndex = 0;
      for (const atom of atoms) {
        for (let shellIdx = 0; shellIdx < atom.shells.length; shellIdx++) {
          const shell = atom.shells[shellIdx];
          const particlesPerShell = Math.floor(particleCount / (atoms.length * atom.shells.length));
          
          for (let p = 0; p < particlesPerShell && particleIndex < particleCount; p++) {
            // 초기 위치: 원자 핵 주변에 살짝만 모여있음
            const initialAngle = Math.random() * Math.PI * 2;
            const initialRadius = shell.radius * 0.3;
            const startX = atom.nucleusX + Math.cos(initialAngle) * initialRadius;
            const startY = atom.nucleusY + Math.sin(initialAngle) * initialRadius;
            
            // 중간 목표: 화면 전체로 퍼짐
            const spreadAngle = Math.random() * Math.PI * 2;
            const spreadRadius = Math.min(width, height) * (0.3 + Math.random() * 0.3);
            const midTargetX = centerX + Math.cos(spreadAngle) * spreadRadius;
            const midTargetY = centerY + Math.sin(spreadAngle) * spreadRadius;
            
            // 최종 목표: 원자 궤도 위의 특정 위치
            const orbitAngle = (p / particlesPerShell) * Math.PI * 2 + shellIdx * 0.5;
            const orbitRadius = shell.radius;
            const targetX = atom.nucleusX + Math.cos(orbitAngle) * orbitRadius;
            const targetY = atom.nucleusY + Math.sin(orbitAngle) * orbitRadius;
            
        particles.push({
          x: startX,
          y: startY,
          vx: 0,
          vy: 0,
          targetX,
          targetY,
          size: 4, // 크기 일정하게 유지
          opacity: 0.3 + Math.random() * 0.5, // 투명도 차이로 깊이감 표현
          layer: shellIdx, // 궤도 레벨에 따라 레이어 결정
          midTargetX,
          midTargetY,
        });
            
            particleIndex++;
          }
        }
      }
      
      // 남은 파티클들을 랜덤하게 배치
      while (particleIndex < particleCount) {
        const atom = atoms[particleIndex % atoms.length];
        const shell = atom.shells[particleIndex % atom.shells.length];
        
        const initialAngle = Math.random() * Math.PI * 2;
        const initialRadius = shell.radius * 0.3;
        const startX = atom.nucleusX + Math.cos(initialAngle) * initialRadius;
        const startY = atom.nucleusY + Math.sin(initialAngle) * initialRadius;
        
        const spreadAngle = Math.random() * Math.PI * 2;
        const spreadRadius = Math.min(width, height) * (0.3 + Math.random() * 0.3);
        const midTargetX = centerX + Math.cos(spreadAngle) * spreadRadius;
        const midTargetY = centerY + Math.sin(spreadAngle) * spreadRadius;
        
        const orbitAngle = Math.random() * Math.PI * 2;
        const orbitRadius = shell.radius;
        const targetX = atom.nucleusX + Math.cos(orbitAngle) * orbitRadius;
        const targetY = atom.nucleusY + Math.sin(orbitAngle) * orbitRadius;
        
        particles.push({
          x: startX,
          y: startY,
          vx: 0,
          vy: 0,
          targetX,
          targetY,
          size: 4,
          opacity: 0.3 + Math.random() * 0.5,
          layer: particleIndex % 3,
          midTargetX,
          midTargetY,
        });
        
        particleIndex++;
      }

      particlesRef.current = particles;
      
      // 원자 중심점들 저장 (원자들 사이 연결선을 그리기 위해)
      const atomCenters: Array<{ nucleusX: number; nucleusY: number }> = [];
      for (const atom of atoms) {
        atomCenters.push({ nucleusX: atom.nucleusX, nucleusY: atom.nucleusY });
      }
      atomsRef.current = atomCenters;
    };

    initParticles();

    let frameCount = 0;
    const animationDuration = 20000; // 20초에 걸쳐 매우 천천히 진행
    let lastTime = performance.now();

    // 애니메이션 루프 (부드러운 60fps 유지)
    const animate = (currentTime: number) => {
      // 델타 타임 계산 (부드러운 애니메이션)
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // 프레임 카운트 대신 실제 시간 기반으로 진행도 계산
      frameCount += deltaTime;
      const rawProgress = Math.min(frameCount / animationDuration, 1); // 0~1
      setAnimationProgress(rawProgress);

      // 배경 페이드 효과 (트레일 효과) - 더 부드럽게
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // 페이드 속도 조정
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const connectionDistance = 180; // 연결선 그리기 거리 (적절한 거리로 조정)
      const repulsionDistance = 40; // 반발력 거리 (더 크게)
      const connectionDistanceSq = connectionDistance * connectionDistance; // 제곱 거리 (sqrt 제거)
      
      // 파티클 이동 (3단계 애니메이션)
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        let targetX, targetY;
        let moveSpeed;
        
        if (rawProgress < 0.25) {
          // 1단계: 중앙에서 전체로 퍼지기 (0~25%)
          targetX = particle.midTargetX;
          targetY = particle.midTargetY;
          moveSpeed = 0.0012; // 부드러운 이동
        } else if (rawProgress < 0.35) {
          // 2단계: 잠시 멈춤 (25~35%)
          targetX = particle.midTargetX;
          targetY = particle.midTargetY;
          moveSpeed = 0.0003; // 거의 정지
        } else {
          // 3단계: 전체에서 중앙으로 모이기 (35~100%)
          const gatherProgress = (rawProgress - 0.35) / 0.65;
          targetX = particle.targetX;
          targetY = particle.targetY;
          moveSpeed = 0.001 + gatherProgress * 0.0012; // 점점 빨라짐
        }
        
        // 목표 지점으로 이동 (델타 타임 기반으로 부드럽게)
        const dx = targetX - particle.x;
        const dy = targetY - particle.y;
        
        particle.vx += dx * moveSpeed * (deltaTime / 16); // 60fps 기준 정규화
        particle.vy += dy * moveSpeed * (deltaTime / 16);
        
        // 파티클 간 상호작용 최적화 (인접한 파티클만 체크)
        const repulsionDistanceSq = repulsionDistance * repulsionDistance;
        let nearbyCount = 0;
        const maxNearbyCheck = 15; // 체크 개수 조정
        
        for (let j = 0; j < particles.length && nearbyCount < maxNearbyCheck; j++) {
          if (i === j) continue;
          const other = particles[j];
          const pdx = other.x - particle.x;
          const pdy = other.y - particle.y;
          const pDistanceSq = pdx * pdx + pdy * pdy;

          // 빠른 거리 체크 (제곱 거리로)
          if (pDistanceSq < repulsionDistanceSq && pDistanceSq > 0) {
            nearbyCount++;
            const pDistance = Math.sqrt(pDistanceSq);
            // 반발력 (너무 가까우면 밀어냄)
            const force = (repulsionDistance - pDistance) / repulsionDistance;
            particle.vx -= (pdx / pDistance) * force * 0.0004 * (deltaTime / 16);
            particle.vy -= (pdy / pDistance) * force * 0.0004 * (deltaTime / 16);
          }
        }
        
        // 감쇠 (마찰) - 부드러운 감쇠
        const damping = Math.pow(0.90, deltaTime / 16); // 델타 타임 기반 감쇠
        particle.vx *= damping;
        particle.vy *= damping;

        // 위치 업데이트 (델타 타임 기반)
        particle.x += particle.vx * (deltaTime / 16);
        particle.y += particle.vy * (deltaTime / 16);

        // 모일수록 투명도 증가 (더 선명하게)
        if (rawProgress < 0.35) {
          // 퍼지는 단계: 투명도 유지
          particle.opacity = 0.4 + Math.random() * 0.3;
        } else {
          // 모이는 단계: 점점 선명해짐
          const gatherProgress = (rawProgress - 0.35) / 0.65;
          particle.opacity = 0.4 + gatherProgress * 0.5;
        }
      }

      // 연결선 그리기 (최적화: 거리 제곱으로 비교, sqrt 최소화)
      const connectionIntensity = rawProgress < 0.35 ? 0.3 : 0.3 + (rawProgress - 0.35) / 0.65 * 0.5;
      
      // 중복 연결 방지를 위한 Set
      const drawnConnections = new Set<string>();
      
      // 최적화: 각 파티클당 최대 연결 수 제한하고, 빠른 거리 체크
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const connections: Array<{ particle: Particle; distanceSq: number; index: number }> = [];
        
        // 최적화: 모든 파티클 체크 대신 인접한 파티클만 체크 (거리 제곱으로)
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distanceSq = dx * dx + dy * dy; // 제곱 거리 (sqrt 제거)

          // 빠른 거리 체크 (제곱 거리로)
          if (distanceSq < connectionDistanceSq) {
            connections.push({ particle: other, distanceSq, index: j });
          }
        }
        
        // 거리순으로 정렬 (제곱 거리로 정렬해도 순서는 동일)
        connections.sort((a, b) => a.distanceSq - b.distanceSq);
        
        // 최대 연결 수 제한 (성능 향상)
        const maxConnections = Math.min(4, Math.floor(2 + connectionIntensity * 2));
        
        for (let k = 0; k < Math.min(maxConnections, connections.length); k++) {
          const other = connections[k].particle;
          const connectionKey = `${Math.min(i, connections[k].index)}-${Math.max(i, connections[k].index)}`;
          
          if (drawnConnections.has(connectionKey)) continue;
          drawnConnections.add(connectionKey);
          
          // sqrt는 마지막에 한 번만 계산
          const distance = Math.sqrt(connections[k].distanceSq);
          const normalizedDistance = distance / connectionDistance;
          const baseOpacity = (1 - normalizedDistance) * 0.15;
          const opacity = Math.min(0.4, baseOpacity * connectionIntensity);
          
          ctx.strokeStyle = `rgba(30, 111, 255, ${opacity})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      // 원자 구조들 사이 연결선 그리기 (원 7개가 서로 연결됨)
      const atomConnectionIntensity = rawProgress < 0.35 ? 0.2 : 0.2 + (rawProgress - 0.35) / 0.65 * 0.5;
      const atomCenters = atomsRef.current;
      
      for (let i = 0; i < atomCenters.length; i++) {
        for (let j = i + 1; j < atomCenters.length; j++) {
          const center1 = atomCenters[i];
          const center2 = atomCenters[j];
          
          // 원자 중심점들 사이 거리 계산
          const dx = center2.nucleusX - center1.nucleusX;
          const dy = center2.nucleusY - center1.nucleusY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // 원자들 사이 연결선 그리기 (거리에 따라 투명도 조정)
          const maxAtomDistance = Math.min(width, height) * 0.6;
          const normalizedDistance = Math.min(1, distance / maxAtomDistance);
          const opacity = (1 - normalizedDistance * 0.5) * 0.3 * atomConnectionIntensity;
          
          ctx.strokeStyle = `rgba(30, 111, 255, ${opacity})`;
          ctx.lineWidth = 0.5; // 원자들 사이 연결선
          ctx.beginPath();
          ctx.moveTo(center1.nucleusX, center1.nucleusY);
          ctx.lineTo(center2.nucleusX, center2.nucleusY);
          ctx.stroke();
        }
      }

      // 파티클 그리기 (3D 구처럼 - 최적화: 정렬 최소화, 그라디언트 캐싱)
      // 최적화: 매 프레임 정렬 대신 레이어별로 그리기
      const particlesByLayer: Particle[][] = [[], [], []];
      for (const particle of particles) {
        particlesByLayer[particle.layer].push(particle);
      }
      
      // 뒤 레이어부터 앞 레이어까지 그리기
      for (let layerIdx = 2; layerIdx >= 0; layerIdx--) {
        const layerParticles = particlesByLayer[layerIdx];
        
        layerParticles.forEach((particle) => {
          // 크기는 일정하게 유지
          const finalSize = particle.size;
          
          // 레이어 투명도
          const layerOpacity = [0.9, 0.7, 0.5][particle.layer];
          
          // 모일수록 투명도 증가
          let finalOpacity;
          if (rawProgress < 0.35) {
            finalOpacity = particle.opacity * layerOpacity;
          } else {
            const gatherProgress = (rawProgress - 0.35) / 0.65;
            finalOpacity = (particle.opacity + gatherProgress * 0.3) * layerOpacity;
          }
          
          // 글로우 효과 (레이어에 따라)
          ctx.shadowBlur = (3 - particle.layer) * 4;
          ctx.shadowColor = primaryColor;
          
          // 간단한 그라디언트 (2D)
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            finalSize
          );
          
          const color = particle.layer === 0 ? primaryColor : secondaryColor;
          const alpha = Math.floor(finalOpacity * 255).toString(16).padStart(2, '0');
          const alphaMid = Math.floor(finalOpacity * 0.6 * 255).toString(16).padStart(2, '0');
          
          gradient.addColorStop(0, color + alpha);
          gradient.addColorStop(0.7, color + alphaMid);
          gradient.addColorStop(1, color + '00');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, finalSize, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowBlur = 0;
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // 애니메이션 시작 (즉시 시작)
    const timer = setTimeout(() => {
      lastTime = performance.now();
      animate(lastTime);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
