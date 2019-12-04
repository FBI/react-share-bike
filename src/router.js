import React from 'react'
import { HashRouter, Route, Switch, Redirect }from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Login from './pages/login'
import Admin from './admin'
import Button from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notifications from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Formlogin from './pages/form/login'
import FormReg from './pages/form/register'
import BasicTable from './pages/table/basic'
import HighTable from './pages/table/high'
import CityManage from './pages/city'
import OrderManage from './pages/order'
import OrderDetails from './pages/order/details'
import UserMange from './pages/user'
import BarChart from './pages/echarts/bar'
import PieChart from './pages/echarts/pie'
import LineChart from './pages/echarts/line'
import MapBike from './pages/map/mapBike'
import RichTextEditor from './pages/richTextEditor'
import PermisstionSetting from './pages/permission'
import NoMatch from './pages/noMatch/noMatch'
import CommonDetails from './commonDetails'
import SagaPage from './pages/ui/Saga'

export default class GlobalRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/common'  render={() => 
                                <CommonDetails>
                                    <Route path='/common/order/detail/:orderId' component={OrderDetails} />
                                </CommonDetails>
                        } />
                        <Route path='/' render={() => 
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home} />
                                    <Route path='/ui/buttons' component={Button} />
                                    <Route path='/ui/modals' component={Modals} />
                                    <Route path='/ui/loadings' component={Loadings} />
                                    <Route path='/ui/notifications' component={Notifications} />
                                    <Route path='/ui/messages' component={Messages} />
                                    <Route path='/ui/tabs' component={Tabs} />
                                    <Route path='/ui/gallery' component={Gallery} />
                                    <Route path='/ui/carousel' component={Carousel} />
                                    <Route path='/redux/saga' component={SagaPage} />
                                    <Route path='/form/login' component={Formlogin} />
                                    <Route path='/form/reg' component={FormReg} />
                                    <Route path='/table/basic' component={BasicTable} />
                                    <Route path='/table/high' component={HighTable} />
                                    <Route path='/city' component={CityManage} />
                                    <Route path='/order' component={OrderManage} />
                                    <Route path='/user' component={UserMange} />
                                    <Route path='/BikeMap' component={MapBike} />
                                    <Route path='/charts/bar' component={BarChart} />
                                    <Route path='/charts/pie' component={PieChart} />
                                    <Route path='/charts/line' component={LineChart} />
                                    <Route path='/rich' component={RichTextEditor} />
                                    <Route path='/permission' component={PermisstionSetting} />
                                    <Redirect to='/home' />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}