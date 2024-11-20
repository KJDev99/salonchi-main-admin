import styled from "styled-components";

export const List = styled("ul")`
  .product-list {
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      &:nth-child(4n) {
        border-bottom: 1px solid #eee;
      }
      &:last-child {
        border-bottom: 1px solid transparent;
      }
      .product-image {
        width: 70px;
        height: 70px;
      }
    }
  }
`;
export const ListItem = styled("li")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  &.product-list-item {
    border-bottom: 0;
  }
  span {
    color: rgba(0, 0, 0, 0.87);
    &.comment {
      background-color: rgba(0, 0, 0, 0.087);
      border-radius: 6px;
      max-width: 50%;
      padding: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      text-decoration: none;
    }
    &.address-info {
      width: 25%;
      text-align: right;
    }
  }
  .comments-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 60%;
  }

  .comment-item {
    padding: 5px 10px 15px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    position: relative;
  }

  .comment-text {
    font-size: 14px;
    color: #333;
    margin: 0 0 5px 0;
  }

  .comment-time {
    font-size: 11px;
    color: #777;
    position: absolute;
    right: 5px;
    bottom: 5px;
  }

  .badge {
    background-color: ${(props) => props?.getstatus?.backgroundColor};
    padding: 6px;
    border-radius: 12px;
    color: ${(props) => props?.getstatus?.color};
    font-size: 12px;
    height: 25px;
    display: flex;
    align-items: center;
  }
`;

export const StatusWrapper = styled("div")``;
