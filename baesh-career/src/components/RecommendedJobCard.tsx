import { Link } from 'react-router-dom';

interface RecommendedJobCardProps {
  id: string;
  title: string;
  company: string;
  position: string;
  matchRate: number;
  skills: string[];
  summary: string;
  deadline: string;
  logo?: string;
  onApply?: (id: string) => void;
}

export default function RecommendedJobCard({
  id,
  title,
  company,
  position,
  matchRate,
  skills,
  summary,
  deadline,
  logo,
  onApply,
}: RecommendedJobCardProps) {
  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApply?.(id);
  };

  return (
    <Link to={`/lounge/jobs/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="panel" style={{ 
        padding: 20, 
        cursor: 'pointer',
        background: 'linear-gradient(135deg, rgba(30, 111, 255, 0.05) 0%, rgba(64, 140, 255, 0.05) 100%)',
        border: '2px solid rgba(30, 111, 255, 0.2)',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px -8px rgba(30, 111, 255, 0.3)';
        e.currentTarget.style.borderColor = 'rgba(30, 111, 255, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(30, 111, 255, 0.2)';
      }}
      >
        {/* AI 매칭률 배지 */}
        <div style={{ 
          position: 'absolute',
          top: 16,
          right: 16,
          padding: '6px 12px',
          background: 'linear-gradient(135deg, var(--brand), var(--accent))',
          borderRadius: 999,
          color: 'white',
          fontSize: 12,
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(30, 111, 255, 0.3)'
        }}>
          AI 매칭률 {matchRate}%
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          {/* 회사 로고 */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: logo ? `url(${logo})` : 'linear-gradient(135deg, var(--brand), var(--accent))',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: 24,
            boxShadow: '0 4px 12px rgba(30, 111, 255, 0.2)'
          }}>
            {!logo && company.charAt(0)}
          </div>

          {/* 공고 정보 */}
          <div style={{ flex: 1, minWidth: 0, paddingRight: 100 }}>
            {/* 공고 제목 */}
            <h3 style={{ 
              margin: '0 0 8px 0', 
              fontSize: 20, 
              fontWeight: 700,
              lineHeight: 1.3
            }}>
              {title}
            </h3>

            {/* 기업명 + 포지션 */}
            <div style={{ 
              fontSize: 14, 
              color: 'var(--muted)', 
              marginBottom: 12 
            }}>
              {company} · {position}
            </div>

            {/* 포지션 세부 요약 */}
            <p style={{ 
              fontSize: 13, 
              lineHeight: 1.6, 
              color: 'var(--text)',
              margin: '0 0 12px 0'
            }}>
              {summary}
            </p>

            {/* 핵심 기술 스택 */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 6, 
              marginBottom: 16 
            }}>
              {skills.map(skill => (
                <span key={skill} className="chip" style={{ 
                  fontSize: 11,
                  background: 'rgba(30, 111, 255, 0.1)',
                  color: 'var(--brand)',
                  borderColor: 'rgba(30, 111, 255, 0.2)'
                }}>
                  {skill}
                </span>
              ))}
            </div>

            {/* 마감일 */}
            <div style={{ 
              fontSize: 12, 
              color: 'var(--muted)',
              marginBottom: 12
            }}>
              마감 D-{deadline}
            </div>

            {/* 지원하기 버튼 */}
            <button
              className="button"
              onClick={handleApply}
              style={{
                fontSize: 13,
                height: 36,
                padding: '0 20px'
              }}
            >
              지원하기
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

