import { ReactComponent as CheckSuccessIcon } from '../../../assets/icons/check-success.svg';
import LoaderBlock from '../../../components/Loader/LoaderBlock';
import AlertSection from '../AlertSection';
import useActivate from './useActivate';
import '../style.css';

function Activate() {
  const { navigate, isUserActivated } = useActivate();

  if (isUserActivated) {
    return (
      <AlertSection
        title="User Activated"
        description="Now you can login with your email and password."
        buttonLabel="Go to Login"
        onButtonClick={() => navigate('/')}
        icon={<CheckSuccessIcon />}
      />
    );
  }

  return <LoaderBlock text="Loading..." />;
}

export default Activate;
