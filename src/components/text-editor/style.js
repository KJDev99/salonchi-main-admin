import styled from "styled-components";
import ReactQuill from "react-quill";

export const Reactquill = styled(ReactQuill)`
  border-color: #000;
  width: 100%;
  margin: 4px 0px;
  &.area-error {
    border: 1px solid var(--main-red);
  }

  .ql-container {
    
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    background: #fefcfc;
  }
  .ql-snow.ql-toolbar {
    display: block;
    background: #eaecec;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }
  .ql-bubble .ql-editor {
    border: 1px solid #ccc;
    border-radius: 0.5em;
  }
  .ql-editor {
    min-height: 18em;
  } 
`;
