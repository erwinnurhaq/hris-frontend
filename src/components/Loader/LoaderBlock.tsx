import { CSSProperties } from 'react';
import { Spin } from 'antd';

interface ILoaderBlock {
  className?: string | undefined;
  style?: CSSProperties | undefined;
  text?: string | undefined;
}

function LoaderBlock({ className, style, text }: ILoaderBlock) {
  return (
    <div className={`loading-container-block ${className ? className : ''}`} style={style}>
      <Spin tip={text} />
    </div>
  );
}

export default LoaderBlock;
