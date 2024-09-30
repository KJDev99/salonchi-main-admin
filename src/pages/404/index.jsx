import { ReactComponent as Icon404 } from '@/assets/404.svg';
import { Box, Container, Text, Title, Wrapper } from './style';
import { Button } from '@/components/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon404 />
        </Box>
        <Title className="not-found-title">Page Not Found</Title>
        <Text className="not-found-description">
          This page doesn’t exist or was removed! We suggest you back to home
        </Text>
        <Button
          name="Back to Home"
          className="go-back"
          onClick={() => navigate(-1)}
        />
      </Wrapper>
    </Container>
  );
};

export default NotFound;
