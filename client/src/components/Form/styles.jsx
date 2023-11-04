import { css } from "@emotion/react";

export const styles = {
  root: css`
    & .MuiTextField-root {
      margin: 10px 0px;
    },
  `,
  paper: css`
    padding: 16px;
    border-radius: 15px;
  `,
  form: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & .MuiTextField-root {
      margin: 7px 0px;
    },
  `,
  fileInput: css`
    width: 100%;
    // border: solid grey 1px;
    // border-radius: 3px;
  `,
  buttonSubmit: css`
    margin-bottom: 10px;
  `,
};
