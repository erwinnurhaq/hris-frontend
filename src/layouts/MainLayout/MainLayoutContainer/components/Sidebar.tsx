import { useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const hideOnPath = ['/welcome'];

  if (hideOnPath.includes(location.pathname)) {
    return null;
  }
  return <div>Side bar</div>;
}

export default Sidebar;
