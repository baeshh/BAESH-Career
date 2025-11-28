import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import RecommendedJobCard from '../components/RecommendedJobCard';
import LoungeCard from '../components/LoungeCard';

type TabType = '채용' | '경진대회' | '교육프로그램' | '해커톤' | '대외활동';

// 채용 더미 데이터
const recommendedJobs = [
  {
    id: 'job-1',
    title: 'AI/ML 엔지니어 (컴퓨터 비전)',
    company: '테크스타트업',
    position: '시니어',
    matchRate: 92,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'Deep Learning'],
    summary: 'AI 기반 이미지 분석 솔루션 개발 및 딥러닝 모델 최적화를 담당합니다.',
    deadline: '3',
    logo: undefined,
  },
  {
    id: 'job-2',
    title: '프론트엔드 개발자 (React)',
    company: '핀테크 기업',
    position: '주니어',
    matchRate: 88,
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    summary: '사용자 경험을 개선하는 모던 웹 애플리케이션 개발에 참여합니다.',
    deadline: '5',
    logo: undefined,
  },
];

const allJobs = [
  {
    id: 'job-4',
    title: '백엔드 개발자 (Node.js)',
    company: '소셜 네트워크',
    position: '시니어',
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
    experience: '경력' as const,
    type: '정규직' as const,
    location: '서울 · 원격 가능',
    deadline: '2024.12.31',
    aiMatch: 78,
  },
  {
    id: 'job-5',
    title: 'AI 연구원',
    company: 'AI 연구소',
    position: '리서처',
    skills: ['Python', 'PyTorch', 'NLP', 'LLM', 'Research'],
    experience: '경력' as const,
    type: '정규직' as const,
    location: '서울',
    deadline: 'D-2',
    aiMatch: 91,
  },
];

// 활동 더미 데이터 (경진대회, 교육프로그램, 해커톤, 대외활동)
const activities = {
  경진대회: [
    {
      id: 'contest-1',
      org: '부산경제진흥원',
      verifiedOrg: true,
      title: '글로벌 혁신 스타트업 경진대회',
      category: '경진대회',
      period: '2025.03~2025.05',
      applicants: 302,
      capacity: 50,
      aiFit: 82,
      reason: '수상/발표 경험 다수',
      growth: '+10% (Pitching)',
    },
    {
      id: 'contest-2',
      org: '과학기술정보통신부',
      verifiedOrg: true,
      title: 'AI 창업 아이디어 경진대회',
      category: '경진대회',
      period: '2025.02~2025.04',
      applicants: 156,
      capacity: 30,
      aiFit: 88,
      reason: 'AI 창업 경험과 일치',
      growth: '+12% (창업 역량)',
    },
  ],
  교육프로그램: [
    {
      id: 'edu-1',
      org: '산업인력공단',
      verifiedOrg: true,
      title: 'IT 인재 인증 과정',
      category: '교육프로그램',
      period: '2025.04~2025.04',
      applicants: 78,
      capacity: 40,
      aiFit: 80,
      reason: 'SQL/백엔드 경험과 일치',
      growth: '+8% (데이터 역량)',
    },
    {
      id: 'edu-2',
      org: '한국정보화진흥원',
      verifiedOrg: true,
      title: 'AI 전문가 양성 프로그램',
      category: '교육프로그램',
      period: '2025.03~2025.06',
      applicants: 124,
      capacity: 25,
      aiFit: 85,
      reason: 'AI 전문성 강화',
      growth: '+15% (AI 역량)',
    },
  ],
  해커톤: [
    {
      id: 'hack-1',
      org: '서울시',
      verifiedOrg: true,
      title: '스마트시티 해커톤',
      category: '해커톤',
      period: '2025.02.15~2025.02.17',
      applicants: 89,
      capacity: 100,
      aiFit: 75,
      reason: '프로젝트 경험과 일치',
      growth: '+5% (협업 역량)',
    },
    {
      id: 'hack-2',
      org: '카카오',
      verifiedOrg: true,
      title: 'AI 서비스 해커톤',
      category: '해커톤',
      period: '2025.03.01~2025.03.03',
      applicants: 234,
      capacity: 150,
      aiFit: 90,
      reason: 'AI 프로젝트 경험',
      growth: '+8% (AI 실무)',
    },
  ],
  대외활동: [
    {
      id: 'activity-1',
      org: '포항테크노파크',
      verifiedOrg: true,
      title: 'AI·데이터 기반 창업 지원 프로그램',
      category: '대외활동',
      period: '2025.03~2025.06',
      applicants: 124,
      capacity: 20,
      aiFit: 87,
      reason: '포트폴리오: AI, 창업, 수상 경력과 일치',
      growth: '+12% (창업 역량)',
    },
    {
      id: 'activity-2',
      org: '청년창업재단',
      verifiedOrg: true,
      title: '스타트업 인턴십 프로그램',
      category: '대외활동',
      period: '2025.04~2025.08',
      applicants: 201,
      capacity: 30,
      aiFit: 83,
      reason: '실무 경험 쌓기',
      growth: '+10% (실무 역량)',
    },
  ],
};

export default function Lounge() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('채용');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobCategory, setSelectedJobCategory] = useState<string>('전체');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('전체');
  const [selectedExperience, setSelectedExperience] = useState<string>('전체');
  const [selectedLocation, setSelectedLocation] = useState<string>('전체');
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  const handleBookmark = (id: string) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAIRecommend = () => {
    navigate('/lounge/matching');
  };

  const handleApply = (id: string) => {
    if (id.startsWith('job-')) {
      navigate(`/lounge/jobs/${id}?apply=true`);
    } else {
      // 활동 지원 처리
      alert('지원 기능은 준비 중입니다.');
    }
  };

  const handleViewActivity = (id: string) => {
    navigate(`/lounge/activities/${id}`);
  };

  // 필터링된 채용 공고
  const filteredJobs = useMemo(() => {
    if (activeTab !== '채용') return [];
    return allJobs.filter(job => {
      if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !job.company.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedEmploymentType !== '전체' && job.type !== selectedEmploymentType) {
        return false;
      }
      if (selectedExperience !== '전체' && job.experience !== selectedExperience) {
        return false;
      }
      if (selectedLocation !== '전체' && !job.location.includes(selectedLocation)) {
        return false;
      }
      return true;
    });
  }, [activeTab, searchQuery, selectedEmploymentType, selectedExperience, selectedLocation]);

  // 필터링된 활동
  const filteredActivities = useMemo(() => {
    if (activeTab === '채용') return [];
    const tabActivities = activities[activeTab] || [];
    return tabActivities.filter(activity => {
      if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !activity.org.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {/* 상단 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>라운지</h1>
        <button
          className="button"
          onClick={() => navigate('/lounge/applications')}
          style={{
            fontSize: 14,
            height: 40,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <span>📋</span>
          <span>지원 현황</span>
        </button>
      </div>

      {/* 탭 */}
      <section className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="tabs" style={{ borderBottom: '1px solid var(--border)', padding: '0 24px' }}>
          {(['채용', '경진대회', '교육프로그램', '해커톤', '대외활동'] as TabType[]).map(tab => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ cursor: 'pointer' }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div style={{ padding: 24 }}>
          {/* 검색 바 */}
          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="input"
                placeholder={activeTab === '채용' 
                  ? "키워드 검색 (예: 프론트엔드, 마케팅 등)"
                  : "키워드 검색 (예: AI, 창업, 해커톤 등)"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  paddingLeft: 48,
                  fontSize: 15
                }}
              />
              <span style={{ 
                position: 'absolute', 
                left: 16, 
                top: '50%', 
                transform: 'translateY(-50%)',
                fontSize: 20
              }}>
                🔍
              </span>
            </div>

            {/* 채용 탭일 때만 필터 표시 */}
            {activeTab === '채용' && (
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>
                    직무
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['전체', '개발', '디자인', '기획', '마케팅', '데이터'].map(category => (
                      <button
                        key={category}
                        className={selectedJobCategory === category ? 'button' : 'button--ghost'}
                        onClick={() => setSelectedJobCategory(category)}
                        style={{ 
                          height: 32, 
                          padding: '0 16px', 
                          fontSize: 12,
                          border: selectedJobCategory === category ? 'none' : undefined
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>
                    고용 형태
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['전체', '정규직', '인턴', '프로젝트', '공모전'].map(type => (
                      <button
                        key={type}
                        className={selectedEmploymentType === type ? 'button' : 'button--ghost'}
                        onClick={() => setSelectedEmploymentType(type)}
                        style={{ 
                          height: 32, 
                          padding: '0 16px', 
                          fontSize: 12,
                          border: selectedEmploymentType === type ? 'none' : undefined
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>
                    경력
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['전체', '신입', '주니어', '경력'].map(exp => (
                      <button
                        key={exp}
                        className={selectedExperience === exp ? 'button' : 'button--ghost'}
                        onClick={() => setSelectedExperience(exp)}
                        style={{ 
                          height: 32, 
                          padding: '0 16px', 
                          fontSize: 12,
                          border: selectedExperience === exp ? 'none' : undefined
                        }}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6, display: 'block' }}>
                    지역
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['전체', '서울', '경기', '원격'].map(loc => (
                      <button
                        key={loc}
                        className={selectedLocation === loc ? 'button' : 'button--ghost'}
                        onClick={() => setSelectedLocation(loc)}
                        style={{ 
                          height: 32, 
                          padding: '0 16px', 
                          fontSize: 12,
                          border: selectedLocation === loc ? 'none' : undefined
                        }}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI 추천 버튼 */}
            <button
              className="button"
              onClick={handleAIRecommend}
              style={{
                marginTop: 8,
                background: 'linear-gradient(135deg, var(--brand), var(--accent))',
                fontSize: 14,
                fontWeight: 600,
                height: 44
              }}
            >
              ✨ AI 추천 받기 (내 AI 프로필 기반 맞춤 추천)
            </button>
          </div>

          {/* 채용 탭 컨텐츠 */}
          {activeTab === '채용' && (
            <>
              {/* 추천 공고 섹션 */}
              <section style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                    🎯 AI 추천 공고
                  </h2>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                    내 AI 클론 프로필과 스킬 기반 맞춤 추천
                  </span>
                </div>
                <div style={{ display: 'grid', gap: 16 }}>
                  {recommendedJobs.map(job => (
                    <RecommendedJobCard
                      key={job.id}
                      {...job}
                      onApply={handleApply}
                    />
                  ))}
                </div>
              </section>

              {/* 전체 공고 리스트 */}
              <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                    전체 공고 ({filteredJobs.length})
                  </h2>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="button--ghost" style={{ fontSize: 12, height: 32, padding: '0 12px' }}>
                      마감 임박순
                    </button>
                    <button className="button--ghost" style={{ fontSize: 12, height: 32, padding: '0 12px' }}>
                      AI 매칭률순
                    </button>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {filteredJobs.map(job => (
                    <JobCard
                      key={job.id}
                      {...job}
                      isBookmarked={bookmarkedItems.has(job.id)}
                      onBookmark={handleBookmark}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* 활동 탭 컨텐츠 (경진대회, 교육프로그램, 해커톤, 대외활동) */}
          {activeTab !== '채용' && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                  {activeTab} ({filteredActivities.length})
                </h2>
              </div>
              <div className="lounge-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {filteredActivities.map(activity => (
                  <LoungeCard
                    key={activity.id}
                    org={activity.org}
                    verifiedOrg={activity.verifiedOrg}
                    title={activity.title}
                    category={activity.category}
                    period={activity.period}
                    applicants={activity.applicants}
                    capacity={activity.capacity}
                    aiFit={activity.aiFit}
                    reason={activity.reason}
                    growthPredict={activity.growth}
                    onView={() => handleViewActivity(activity.id)}
                    onApply={() => handleApply(activity.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
