import { useTranslation } from 'react-i18next';
import LangSwitcher from '../LangSwitcher';

function NavBar() {
  const { t } = useTranslation();

  // const navigate = useNavigate();

  // !! get the id pararms if the route have params
  // const { id } = useParams();

  // Here how to use the navigate   navigate({pathName : "..." , search : "...[?something=3000]"})

  // !! Access the pathname property to get the current route
  // const location = useLocation();
  // const currentRoute = React.useMemo(() => location.pathname, [location]);

  return (
    <div className=" lg:container mx-auto bg-primary py-4 flex justify-between items-center px-10 h-[50px] lg:h-[70px] shadow-lg sticky top-0  z-50">
      <h1 className=" text-2xl lg:text-4xl pl-0 lg:pl-6 text-bolder font-bold text-secondary">
        {t('logo')}
      </h1>
      <LangSwitcher />
    </div>
  );
}

export default NavBar;
