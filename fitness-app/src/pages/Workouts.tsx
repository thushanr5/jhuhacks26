import styled from 'styled-components';
import { FaDumbbell, FaPlus, FaFire, FaClock, FaPlay } from 'react-icons/fa';

const WorkoutsContainer = styled.div`
  margin-left: 240px;
  padding: 40px 3rem 3rem;
  background: #f8fafc;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const PageTitle = styled.h1`
  color: #1a202c;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  font-weight: 600;
`;

const PageSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

const WorkoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const WorkoutCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.05);
    border-color: #4299e1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #edf2f7;

  svg {
    font-size: 1.5rem;
    color: #4299e1;
    background: #ebf8ff;
    padding: 0.5rem;
    border-radius: 10px;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #2d3748;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CardInfo = styled.div`
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.6;
  display: grid;
  gap: 1rem;
  flex: 1;
`;

const WorkoutMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 12px;

  svg {
    color: #4299e1;
  }
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.9rem;

  svg {
    font-size: 1.1rem;
  }
`;

const CategoryTag = styled.span`
  display: inline-block;
  padding: 0.35rem 1rem;
  background: #ebf8ff;
  color: #2b6cb0;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: auto;
  width: fit-content;
`;

const StartButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  margin-top: 1.5rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background: #3182ce;
    transform: translateY(-1px);
  }

  svg {
    font-size: 0.875rem;
  }
`;

const AddWorkoutCard = styled(WorkoutCard)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  color: #64748b;
  border: 2px dashed #e2e8f0;
  background: transparent;
  min-height: 220px;
  font-size: 1.1rem;
  font-weight: 500;

  svg {
    font-size: 2rem;
    color: #4299e1;
    opacity: 0.9;
  }

  &:hover {
    border-color: #4299e1;
    color: #4299e1;
    background: #f8fafc;

    svg {
      opacity: 1;
    }
  }
`;

const workouts = [
  {
    id: 1,
    title: 'Upper Body Strength',
    exercises: 8,
    duration: 45,
    category: 'Strength',
    calories: 350,
    difficulty: 'Intermediate'
  },
  {
    id: 2,
    title: 'Core Workout',
    exercises: 6,
    duration: 30,
    category: 'Strength',
    calories: 250,
    difficulty: 'Beginner'
  },
  {
    id: 3,
    title: 'Lower Body Power',
    exercises: 7,
    duration: 40,
    category: 'Strength',
    calories: 400,
    difficulty: 'Advanced'
  },
  {
    id: 4,
    title: 'HIIT Cardio',
    exercises: 10,
    duration: 35,
    category: 'Cardio',
    calories: 450,
    difficulty: 'Intermediate'
  }
];

const Workouts = () => {
  return (
    <WorkoutsContainer>
      <PageHeader>
        <PageTitle>My Workouts</PageTitle>
        <PageSubtitle>Track and manage your custom workout routines</PageSubtitle>
      </PageHeader>
      <WorkoutGrid>
        {workouts.map(workout => (
          <WorkoutCard key={workout.id}>
            <CardHeader>
              <FaDumbbell />
              <CardTitle>{workout.title}</CardTitle>
            </CardHeader>
            <CardInfo>
              <WorkoutMetrics>
                <MetricItem>
                  <FaClock />
                  <span>{workout.duration} min</span>
                </MetricItem>
                <MetricItem>
                  <FaFire />
                  <span>{workout.calories} cal</span>
                </MetricItem>
              </WorkoutMetrics>
              <div>{workout.exercises} exercises</div>
              <div>Difficulty: {workout.difficulty}</div>
              <CategoryTag>{workout.category}</CategoryTag>
              <StartButton>
                <FaPlay />
                Start Workout
              </StartButton>
            </CardInfo>
          </WorkoutCard>
        ))}
        <AddWorkoutCard>
          <FaPlus />
          <span>Create New Workout</span>
        </AddWorkoutCard>
      </WorkoutGrid>
    </WorkoutsContainer>
  );
};

export default Workouts;