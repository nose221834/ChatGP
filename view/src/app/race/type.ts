import { SubmitHandler } from "react-hook-form";


export type SubmitProps = {
  text: string;
};

export type InteProps = {
  path: string;
  order: number;
  scene: number;
  submit: SubmitHandler<SubmitProps>;
};

export type ResponceProps = {
  text: string;
};

export type ProgProps = {
  order: number;
  scene: number;
  click: () => void;
};
