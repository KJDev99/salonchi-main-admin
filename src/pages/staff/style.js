import { styled } from 'styled-components';

export const Text = styled('p')`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-decoration: none;
`;
