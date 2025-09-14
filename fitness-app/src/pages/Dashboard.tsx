import { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardContainer = styled.div`
  margin-left: 240px;
  padding: 80px 2rem 2rem;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  /* left sidebar narrower, right chart column wider */
  grid-template-columns: 280px 2fr;
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StatsCard = styled(Card)`
  h3 {
    margin: 0 0 1rem;
    color: #4a5568;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .number {
    font-size: 2rem;
    font-weight: 600;
    color: #2d3748;
    cursor: pointer;
    transition: background-color 0.2s;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    
    &:hover {
      background: #f7fafc;
    }
  }

  input {
    font-size: 2rem;
    font-weight: 600;
    color: #2d3748;
    width: 100%;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.2rem 0.5rem;
    
    &:focus {
      outline: none;
      border-color: #4299e1;
    }
  }
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  
  &:hover {
    color: #4299e1;
    background: #f7fafc;
  }
`;

const ChartCard = styled(Card)`
  grid-column: 1 / -1;
`;

const initialWeightData = [
  { date: '1/1', weight: 180 },
  { date: '1/8', weight: 178 },
  { date: '1/15', weight: 176 },
  { date: '1/22', weight: 175 },
  { date: '1/29', weight: 174 },
];

const Dashboard = () => {
  // load persisted weight and history if available
  const persistedWeight = typeof window !== 'undefined' ? localStorage.getItem('ft_weight') : null;
  const persistedHistory = typeof window !== 'undefined' ? localStorage.getItem('ft_weight_history') : null;

  const [weightData, setWeightData] = useState<{ date: string; weight: number }[]>(() => {
    try {
      return persistedHistory ? JSON.parse(persistedHistory) : initialWeightData;
    } catch {
      return initialWeightData;
    }
  });

  const [stats, setStats] = useState(() => ({
    workouts: '4',
    weight: persistedWeight ?? '174',
    calories: '2100',
    activeMinutes: '45'
  }));
  
  const [editing, setEditing] = useState<string | null>(null);
  
  const handleEdit = (stat: string) => {
    setEditing(stat);
  };
  
  const handleSave = (stat: string, value: string) => {
    setStats(prev => ({ ...prev, [stat]: value }));
    
    // Update weight graph when weight is changed
    if (stat === 'weight') {
      const newWeight = parseFloat(value);
      if (!isNaN(newWeight)) {
        const currentDate = new Date();
        const newEntry = {
          date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
          weight: newWeight
        };
        setWeightData(prev => {
          const next = [...prev.slice(1), newEntry];
          try { localStorage.setItem('ft_weight_history', JSON.stringify(next)); } catch { /* ignore storage errors */ }
          return next;
        });
  try { localStorage.setItem('ft_weight', String(newWeight)); } catch { /* ignore storage errors */ }
      }
    }
    
    setEditing(null);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent, stat: string, value: string) => {
    if (e.key === 'Enter') {
      handleSave(stat, value);
    }
  };

  return (
    <DashboardContainer>
      <TwoColumnLayout>
        <div>
          <StatsCard style={{ marginBottom: 16 }}>
            <h3>
              Current Weight
              <EditButton onClick={() => handleEdit('weight')}>
                <span role="img" aria-label="edit">✏️</span>
              </EditButton>
            </h3>
            {editing === 'weight' ? (
              <input
                type="number"
                value={stats.weight}
                onChange={(e) => setStats(prev => ({ ...prev, weight: e.target.value }))}
                onBlur={(e) => handleSave('weight', e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'weight', stats.weight)}
                autoFocus
              />
            ) : (
              <div className="number" onClick={() => handleEdit('weight')}>
                {stats.weight} lbs
              </div>
            )}
          </StatsCard>

          <StatsCard style={{ marginBottom: 16 }}>
            <h3>
              Workouts This Week
              <EditButton onClick={() => handleEdit('workouts')}>
                <span role="img" aria-label="edit">✏️</span>
              </EditButton>
            </h3>
            {editing === 'workouts' ? (
              <input
                type="text"
                value={stats.workouts}
                onChange={(e) => setStats(prev => ({ ...prev, workouts: e.target.value }))}
                onBlur={(e) => handleSave('workouts', e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'workouts', stats.workouts)}
                autoFocus
              />
            ) : (
              <div className="number" onClick={() => handleEdit('workouts')}>
                {stats.workouts}
              </div>
            )}
          </StatsCard>

          <StatsCard style={{ marginBottom: 16 }}>
            <h3>
              Calories Today
              <EditButton onClick={() => handleEdit('calories')}>
                <span role="img" aria-label="edit">✏️</span>
              </EditButton>
            </h3>
            {editing === 'calories' ? (
              <input
                type="text"
                value={stats.calories}
                onChange={(e) => setStats(prev => ({ ...prev, calories: e.target.value }))}
                onBlur={(e) => handleSave('calories', e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'calories', stats.calories)}
                autoFocus
              />
            ) : (
              <div className="number" onClick={() => handleEdit('calories')}>
                {stats.calories}
              </div>
            )}
          </StatsCard>

          <StatsCard>
            <h3>
              Active Minutes
              <EditButton onClick={() => handleEdit('activeMinutes')}>
                <span role="img" aria-label="edit">✏️</span>
              </EditButton>
            </h3>
            {editing === 'activeMinutes' ? (
              <input
                type="text"
                value={stats.activeMinutes}
                onChange={(e) => setStats(prev => ({ ...prev, activeMinutes: e.target.value }))}
                onBlur={(e) => handleSave('activeMinutes', e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'activeMinutes', stats.activeMinutes)}
                autoFocus
              />
            ) : (
              <div className="number" onClick={() => handleEdit('activeMinutes')}>
                {stats.activeMinutes}
              </div>
            )}
          </StatsCard>
        </div>

        <div>
          <ChartCard>
            <h3>Weight Progress</h3>
            <div style={{ width: '100%', height: 360 }}>
              <ResponsiveContainer>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['auto', 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#4299e1" 
                    strokeWidth={2}
                    dot={{ fill: '#4299e1', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#718096', fontSize: '0.9rem' }}>
              Click the weight value above to update the graph
            </div>
          </ChartCard>
        </div>
      </TwoColumnLayout>
    </DashboardContainer>
  );
};

export default Dashboard;