import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ReactComponent as IconError } from '@/assets/error.svg';
import { Container, Title, Wrapper } from './style';
import PropTypes from 'prop-types';
import { Button } from '@/components/button';

const ErrorBoundary = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Container>
              <Wrapper>
                <IconError />
                <Title>Something went wrong!</Title>
                <Button
                  name="Try again"
                  onClick={resetErrorBoundary}
                  className="error-btn"
                />
              </Wrapper>
            </Container>
          )}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
