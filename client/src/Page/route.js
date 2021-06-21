


import UserPage from './UserPage'
import HomePage from "./HomePage"
const routes= [
    {
        name:'home',
        path:'/',
        Component:HomePage
    },
    {
        name:'user',
        path:'/user/:uid',
        Component:UserPage
    },
    {
        name:'post',
        path:'/post',
        Component:()=><h1>post page</h1>
    }
]

export default routes