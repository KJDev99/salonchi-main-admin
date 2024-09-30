import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea } = Input;

export const Textarea = styled(TextArea)`
  border-color: #eee;
  margin: 4px 0px;
  &.area-error {
    border: 1px solid var(--main-red);
  }
`;
