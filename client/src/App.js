import Layout from './Components/Layout'
import {Switch,Route} from 'react-router-dom'
import routes from 'src/Page/route'
// import ChatBubble from 'src/Components/ChatBubble';
function App() {
  return (
    <Layout>
        {/* <ChatBubble/> */}
        <Switch>

        {routes.map(({path,name,Component})=><Route key={name} children={(props)=>(<Component {...props} />)} exact path={path}/> )}

        </Switch>
    </Layout>
  );
}

export default App;
