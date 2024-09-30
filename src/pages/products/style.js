import { Space } from 'antd';
import styled from 'styled-components';

export const ActionWrapper = styled(Space)`
  .edit-btn {
    background-color: #e7f0ec;
    border: none;
  }
  .delete-btn {
    background-color: #f33434;
    border: none;
    svg {
      color: #fff;
    }
  }
`;

export const Text = styled('p')`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-decoration: none;
`;
