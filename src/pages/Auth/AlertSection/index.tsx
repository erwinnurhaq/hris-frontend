import { Button } from 'antd';

import { IAlertSection } from './alertsection.interface';
import '../style.css';

function AlertSection({
  className,
  icon: Icon,
  title,
  description,
  isShowButton = true,
  buttonLabel = 'OK',
  onButtonClick,
  isLoading = false,
}: IAlertSection) {
  return (
    <div
      className={`auth-pages-container animation-fade-in-top alert-section-container ${className}`}
    >
      {Icon !== null || Icon !== undefined ? (
        <div className="animation-scale-in">{Icon}</div>
      ) : null}
      <h6 className="alert-section__title">{title}</h6>
      <p className="alert-section__description">{description}</p>
      {isShowButton && (
        <Button
          htmlType="button"
          className="auth-pages__button alert-section__button"
          disabled={isLoading}
          loading={isLoading}
          onClick={(ev) => (onButtonClick ? onButtonClick(ev) : null)}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}

export default AlertSection;
