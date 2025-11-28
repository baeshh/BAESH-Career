import { Link } from 'react-router-dom';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  position: string;
  skills: string[];
  experience: '신입' | '주니어' | '경력';
  type: '정규직' | '프로젝트' | '공모전' | '인턴';
  location: string;
  deadline: string;
  isBookmarked?: boolean;
  onBookmark?: (id: string) => void;
  aiMatch?: number;
  logo?: string;
}

export default function JobCard({
  id,
  title,
  company,
  position,
  skills,
  experience,
  type,
  location,
  deadline,
  isBookmarked = false,
  onBookmark,
  aiMatch,
  logo,
}: JobCardProps) {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmark?.(id);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '정규직':
        return { bg: 'rgba(30, 111, 255, 0.1)', color: 'var(--brand)' };
      case '프로젝트':
        return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6' };
      case '공모전':
        return { bg: 'rgba(236, 72, 153, 0.1)', color: '#EC4899' };
      case '인턴':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' };
      default:
        return { bg: 'var(--border)', color: 'var(--muted)' };
    }
  };

  const typeStyle = getTypeColor(type);

  return (
    <Link to={`/lounge/jobs/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="panel" style={{ 
        padding: 20, 
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px -8px rgba(30, 111, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
        {/* 북마크 버튼 */}
        <button
          onClick={handleBookmark}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 20,
            padding: 4,
            color: isBookmarked ? '#F59E0B' : 'var(--muted)',
            transition: 'all 0.2s ease'
          }}
        >
          {isBookmarked ? '★' : '☆'}
        </button>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          {/* 회사 로고 */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: logo ? `url(${logo})` : 'linear-gradient(135deg, var(--brand), var(--accent))',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: 20
          }}>
            {!logo && company.charAt(0)}
          </div>

          {/* 공고 정보 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* AI 매칭률 */}
            {aiMatch && (
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 4, 
                marginBottom: 8,
                padding: '4px 8px',
                background: 'rgba(30, 111, 255, 0.1)',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--brand)'
              }}>
                <span>✨</span>
                <span>AI 매칭률 {aiMatch}%</span>
              </div>
            )}

            {/* 공고 제목 */}
            <h3 style={{ 
              margin: '0 0 8px 0', 
              fontSize: 18, 
              fontWeight: 600,
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

            {/* 스킬 태그 */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 6, 
              marginBottom: 12 
            }}>
              {skills.slice(0, 5).map(skill => (
                <span key={skill} className="chip" style={{ fontSize: 11 }}>
                  {skill}
                </span>
              ))}
              {skills.length > 5 && (
                <span className="chip" style={{ fontSize: 11, color: 'var(--muted)' }}>
                  +{skills.length - 5}
                </span>
              )}
            </div>

            {/* 메타 정보 */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 8, 
              fontSize: 12, 
              color: 'var(--muted)' 
            }}>
              <span className="badge" style={{ 
                ...typeStyle, 
                fontSize: 11,
                border: 'none'
              }}>
                {type}
              </span>
              <span>·</span>
              <span>{experience}</span>
              <span>·</span>
              <span>{location}</span>
              <span>·</span>
              <span style={{ color: deadline.includes('D-') ? '#DC2626' : 'inherit' }}>
                마감 {deadline}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

