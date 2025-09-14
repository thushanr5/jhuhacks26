import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaLeaf, FaHamburger, FaBacon, FaCookieBite, FaGlassWhiskey, FaPizzaSlice, FaGlassMartini, FaBreadSlice } from 'react-icons/fa';

const NutritionContainer = styled.div`
  margin-left: 240px;
  padding: 2rem 3rem;
  background: #f8fafc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 2rem;
`;

const ScoreCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MainScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(180deg,#fff 0%,#f8fafc 100%);
  border: 1px solid #e6edf3;

  .score-value {
    font-size: 4.25rem;
    font-weight: 700;
    color: #2b6cb0;
    line-height: 1;
  }

  .score-label {
    font-size: 1rem;
    color: #4a5568;
    margin-top: 0.25rem;
  }
`;

const BreakdownSection = styled.div`
  .section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1rem;
  }
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 1rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ScoreItemCard = styled.div`
  background: #ffffff;
  border: 1px solid #eef2f6;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 1px 2px rgba(16,24,40,0.03);

  svg { font-size: 1.6rem; color: #3b82f6; }

  .item-info { flex: 1; }
  .item-category { font-weight: 700; color: #2d3748; }
  .item-score { font-size: 1rem; font-weight: 700; color: #e53e3e; }
`;

const IconWrapper = styled.div`
  background: #f1f5f9;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


type DeductionDef = {
  category: string;
  mean: number; // mean count per period
  sd: number; // standard deviation for sampling
  perUnit: number; // deduction per unit
  icon: React.ReactNode;
};

// Box-Muller normal sampler (returns a single sample)
function sampleNormal(mean = 0, sd = 1) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + sd * num;
}

const deductionDefs: DeductionDef[] = [
  { category: 'Fast food', mean: 3, sd: 1.2, perUnit: 2, icon: <FaHamburger /> },
  { category: 'Processed meat', mean: 2, sd: 1, perUnit: 2.5, icon: <FaBacon /> },
  { category: 'Fried food', mean: 1.5, sd: 0.8, perUnit: 2.5, icon: <FaPizzaSlice /> },
  { category: 'Soft drink', mean: 2, sd: 1.1, perUnit: 3, icon: <FaGlassWhiskey /> },
  { category: 'Sugary dessert', mean: 1.8, sd: 1, perUnit: 4, icon: <FaCookieBite /> },
  { category: 'Chips/cereal', mean: 1, sd: 0.6, perUnit: 1.5, icon: <FaBreadSlice /> },
  { category: 'Alcohol', mean: 1.2, sd: 0.9, perUnit: 3, icon: <FaGlassMartini /> }
];

const baseScore = 35;

const Nutrition: React.FC = () => {
  const [seed, setSeed] = useState(0);
  const [generated, setGenerated] = useState(() => {
    // initial proportional split for default seed 0
    const randomNet = Math.floor(Math.random() * baseScore) + 1;
    const totalDeductions = baseScore - randomNet;
    const weights = deductionDefs.map(d => d.mean * d.perUnit);
    const weightSum = weights.reduce((s, w) => s + w, 0) || 1;
    return deductionDefs.map((def, i) => {
      const ded = parseFloat((totalDeductions * (weights[i] / weightSum)).toFixed(2));
      return { ...def, deduction: ded } as any;
    });
  });

  useEffect(() => {
    // sample uniform integer between 1 and baseScore
    const randomNet = Math.floor(Math.random() * baseScore) + 1;
    const totalDeductions = baseScore - randomNet;
    const weights = deductionDefs.map(d => d.mean * d.perUnit);
    const weightSum = weights.reduce((s, w) => s + w, 0) || 1;
    setGenerated(
      deductionDefs.map((def, i) => {
        const ded = parseFloat((totalDeductions * (weights[i] / weightSum)).toFixed(2));
        return { ...def, deduction: ded } as any;
      })
    );
    // store the sampled net score in a transient field via seed (we'll use seed to re-run)
    // store netScore on the seed by encoding it in state not needed; we'll compute display below
  }, [seed]);

  const totalDeductions = generated.reduce((s: number, g: any) => s + (g.deduction || 0), 0);
  // The displayed net score is sampled uniformly between 1 and baseScore when regenerate is used.
  // To keep deterministic display when seed changes, derive it from totalDeductions here (inverse) but
  // ensure it stays within [1, baseScore]. We compute rawNet = baseScore - totalDeductions and clamp.
  const rawNet = baseScore - totalDeductions;
  const netScore = Math.min(baseScore, Math.max(1, Math.round(rawNet)));

  return (
    <NutritionContainer>
      <ContentWrapper>
        <PageTitle>Nutrition Summary</PageTitle>

        <ScoreCard>
          <TwoColumn>
            <LeftColumn>
              <MainScoreDisplay>
                <div className="score-value">{netScore}</div>
                <div className="score-label">Net Nutrition Score</div>
              </MainScoreDisplay>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div style={{ background: '#f0fff4', padding: '0.75rem', borderRadius: 8, border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <IconWrapper style={{ background: '#e6ffed' }}><FaLeaf style={{ color: '#16a34a' }} /></IconWrapper>
                  <div>
                    <div style={{ fontWeight: 700 }}>Healthy Eating</div>
                    <div style={{ color: '#16a34a', fontWeight: 700 }}>+{baseScore}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, padding: 12, borderRadius: 8, background: '#fff', border: '1px solid #eef2f6' }}>
                    <div style={{ fontSize: 12, color: '#718096' }}>Total Deductions</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#e53e3e' }}>{totalDeductions}</div>
                  </div>
                  <div style={{ flex: 1, padding: 12, borderRadius: 8, background: '#fff', border: '1px solid #eef2f6' }}>
                    <div style={{ fontSize: 12, color: '#718096' }}>Max Base</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#2b6cb0' }}>{baseScore}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setSeed(s => s + 1)}
                    style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: '#3182ce', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Regenerate sample
                  </button>
                  <button
                    onClick={() => setSeed(0)}
                    style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: '#edf2f7', color: '#2d3748', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </LeftColumn>

            <div>
              <BreakdownSection>
                <h2 className="section-title">Score Deductions (sampled)</h2>
                <ItemGrid>
                  {generated.map((item, index) => (
                    <ScoreItemCard key={index}>
                      <IconWrapper>{item.icon}</IconWrapper>
                      <div className="item-info">
                        <div className="item-category">{item.category}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                          <div style={{ color: '#4a5568' }}>{item.count} × {item.perUnit}</div>
                          <div className="item-score">-{item.deduction}</div>
                        </div>
                      </div>
                    </ScoreItemCard>
                  ))}
                </ItemGrid>
              </BreakdownSection>
            </div>
          </TwoColumn>
        </ScoreCard>
      </ContentWrapper>
    </NutritionContainer>
  );
};

export default Nutrition;