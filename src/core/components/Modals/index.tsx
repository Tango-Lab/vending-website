import React from 'react';

import useClickOutside from '../../hooks/useClickOutside';
import Style from './index.module.scss';

export interface ModalTypeProps {
  visible?: boolean;
  onClickOutSide?: () => void;
  children: React.ReactNode;
}

const ModalComponent = (props: ModalTypeProps) => {
  const { children, visible, onClickOutSide } = props;
  const modalRef = useClickOutside<HTMLDivElement>({ onClickOutSide });

  if (!visible) {
    return <></>;
  }

  return (
    <div className={Style['overlay-wrapper']}>
      <div ref={modalRef} className={Style['overlay-content']}>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
