import styled from 'styled-components';
import Navigation from './Navigation';
import TrendingSection from './TrendingSection';
const RightSide = ({type}) => {
  return  (
    <Container>
      <Navigation/>
      <TrendingSection/>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap:1.5rem;
  padding-left:10px;
`;
export default RightSide;