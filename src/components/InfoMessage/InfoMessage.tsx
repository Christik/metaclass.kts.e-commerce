import { FC, PropsWithChildren } from "react";

import Title, { TitleSize } from "@components/Title";
import classnames from "classnames";

import styles from "./InfoMessage.module.scss";

type InfoMessageProps = PropsWithChildren<{
  className?: string;
}>;

const InfoMessage: FC<InfoMessageProps> = ({ className, children }) => {
  return (
    <Title
      className={classnames(styles["info-message"], className)}
      size={TitleSize.s}
    >
      {children}
    </Title>
  );
};

export default InfoMessage;
