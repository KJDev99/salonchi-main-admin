import styled from 'styled-components';

export const UploadWrapper = styled('div')`
  .ant-upload-select {
    border: none !important;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  }
  .ant-upload-list-item-error {
    border-color: transparent;
  }
`;

export const VideoWrapper = styled('div')`
   position: relative;
   width: fit-content;
   .icon{
    position: absolute;
    z-index: 1;
    font-size: 20px;
    top: 20px;
    right:10px;
    cursor: pointer;
    background-color: white;
    padding: 10px;
    border-radius: 50%;
   }

`;

