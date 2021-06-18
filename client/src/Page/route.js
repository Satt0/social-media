



import HomePage from "./HomePage"
const routes= [
    {
        name:'home',
        path:'/',
        Component:HomePage
    },
    {
        name:'user',
        path:'/user',
        Component:()=><h1>user page</h1>
    },
    {
        name:'post',
        path:'/post',
        Component:()=><h1>post page</h1>
    }
]

export default routes