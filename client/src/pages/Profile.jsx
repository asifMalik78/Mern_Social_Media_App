import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import PostSide from '../components/PostSide';
import ProfileSide from '../components/ProfileSide';
import RightSide from '../components/RightSide';
import { getProfile } from '../apiCalls';
import { useEffect } from 'react';
const Profile = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const fetchProfile = async () => {
      await getProfile(dispatch , id);
    }
    useEffect(() =>{
      fetchProfile();
    } , [id]);
    return (
        <Container>
          <main>
            <ProfileSide type= {"profile"}/>
            <PostSide type = {"profile"}/>
            <RightSide type = {"profile"} />
          </main>
        </Container>
      );
}


const Container = styled.section`
  max-width: ${({ theme }) => theme.screens.xl};
  margin: 0 auto;
  height:calc(100vh - 20px);
  overflow: hidden;
  main {
    display: grid;
    grid-template-columns: 21rem auto 20rem;
    font-size:2rem;
    /* overflow: scroll; */
  }
`;
export default Profile;
