
import './App.scss'
import {createBrowserHistory} from 'history'
import {Router, Switch,Route} from 'react-router-dom'
import Contact from './page/Contact/Contact';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import New from './page/New/New';
import Register from './page/Register/Register';
import { HomeTemplates } from './templates/HomeTemplates/HomeTemplate';
import Detail from './page/Detail/Detail';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './page/Checkout/Checkout';
import { Suspense,lazy } from 'react';
import { UserTemplates } from './templates/UserTemplates/Usertemplate';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate'
import Loading from './component/Loading/Loading';
import Film from './page/Admin/Film/Film';
import ThongTintaikhoan from './page/Admin/User/User';
import AddNewFilm from './page/Admin/Film/addNewFilm/AddNewFilm';
import Edit from './page/Admin/Film/Edit/EditFilm';
import Showtime from './page/Admin/Film/Showtime/Showtime';
import {CheckUserTemplates} from './templates/CheckUserTemplate/CheckUserTemplate'
import EditUser from './page/Admin/User/EditUser';
import HistoryBooking from './page/HistoryBooking/HistoryBooking';
const CheckoutTemplateLazy = lazy(()=>import ('./templates/CheckoutTemplate/CheckoutTemplate'))



export const history = createBrowserHistory();
 
function App() {
  return (
    <Router history= {history} >
      <Loading />
      <Switch>
      <HomeTemplates path="/home" exact Component={Home} />
      <HomeTemplates path="/contact" exact Component={Contact} />
      <HomeTemplates path="/new" exact Component={New} />
      <HomeTemplates path="/detail/:id" exact Component={Detail} />
      <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />


     
      <AdminTemplate path='/admin/films' exact Component={Film} />
      <AdminTemplate path='/admin/films/addnewfilm' exact Component={AddNewFilm} />
      <AdminTemplate path='/admin/films/edit/:id' exact Component={Edit} />
      <AdminTemplate path='/admin/films/showtime/:id/:tenphim' exact Component={Showtime} />



      <UserTemplates path="/login" exact Component={Login} />

      <UserTemplates path="/register" exact Component={Register} />
      <Route path='/historybooking' exact component={HistoryBooking} />
      <CheckUserTemplates path='/user/thongtintaikhoan' exact Component={ThongTintaikhoan} />
      <CheckUserTemplates path='/user/edit' exact Component={EditUser} />
    {/* <Suspense  fallback={<h3>Loading....</h3>}>
      <CheckoutTemplateLazy path='/checkout/:id' exact Component={Checkout} />
      </Suspense> */}
      <HomeTemplates path="/" exact Component={Home} />

      </Switch>
    </Router>

  );
}

export default App;
