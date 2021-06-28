import Layout from './Components/Layout'
import {Switch,Route} from 'react-router-dom'
import routes from 'src/Page/route'
function App() {
  return (
    <Layout>
        <Switch>

        {routes.map(({path,name,Component})=><Route key={name} children={(props)=>(<Component {...props} />)} exact path={path}/> )}

        </Switch>
    </Layout>
  );
}

export default App;
