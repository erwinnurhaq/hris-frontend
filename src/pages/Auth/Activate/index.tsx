import { ReactComponent as CheckSuccessIcon } from 'assets/icons/check-success.svg';
import LoaderBlock from 'components/Loader/LoaderBlock';

import AlertSection from '../AlertSection';
import useActivate from './useActivate';
import '../style.css';

function Activate() {
  const { navigate, isUserActivated } = useActivate();

  if (isUserActivated) {
    return (
      <AlertSection
        title="User Telah Aktif"
        description="Sekarang anda bisa login menggunakan email dan password."
        buttonLabel="Ke Login"
        onButtonClick={() => navigate('/')}
        icon={<CheckSuccessIcon />}
      />
    );
  }

  return <LoaderBlock text="Loading..." />;
}

export default Activate;
