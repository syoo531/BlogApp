import { css } from "@emotion/react";

export const styles = {
  media: css`
    height: 0;
    padding-top: 56.25%;
    background-color: rgba(0, 0, 0, 0.3);
    background-blend-mode: darken;
  `,
  border: css`
    border: solid;
  `,
  fullHeightCard: css`
    height: 100%;
  `,
  card: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 15px;
    height: 100%;
    position: relative;
  `,
  overlay: css`
    position: absolute;
    top: 20px;
    left: 20px;
    color: white;
  `,
  overlay2: css`
    position: absolute;
    top: 20px;
    right: 0px;
    color: white;
  `,
  grid: css`
    display: flex;
  `,
  tags: css`
    padding: 10px 16px;
  `,
  message: css`
    padding: 5px 16px;
    font-size: 17px;
    // line-height: 3em;
    // over-flow: hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
  `,
  cardActions: css`
    padding: 0px 16px 8px 16px;
    display: flex;
    justify-content: space-between;
  `,
};
