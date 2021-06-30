import React,{Suspense} from 'react'
import styles from './UserWall.module.scss'
import Avatar from '../Avatar'
import setting from 'src/stylesheets/svg/setting.svg'
import { useSelector } from 'react-redux'
import { useTheme } from 'src/lib/hooks/useColor'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'
import Query from 'src/lib/API/Apollo/Queries'

const Setting=React.lazy(()=>import('src/Components/SettingPanel'))
export default function UserWall({user,isLocal}) {
    const dispatch = useDispatch()
    const theme=useTheme()
    const [openMenu,setOpenMenu]=React.useState(false)
    const localUser=useSelector(state=>state.user)
    const [initConversation,{data}]=useMutation(Query.INIT_MESSAGE)

    const onInitConversation=()=>{
        const userid=parseInt(localUser.uid)
        const receiver=parseInt(user.userid)
        if(userid!==receiver){
            const first=Math.min(userid,receiver)
            const second=Math.max(userid,receiver)
            initConversation({variables:{userid1:first,userid2:second}})
        }
        

    }
    React.useEffect(()=>{
        if(data?.initConversation){
            dispatch({type:"addConversation",payload:{...data.initConversation,force:true,state:'open'}})
        }
    },[data])
    return (
        <div className={styles.container}> 
        <Suspense fallback={<FallBack/>}>

        <Setting open={openMenu} onClose={()=>{setOpenMenu(false)}}/>
        </Suspense>
        <div className={styles.userInfor} style={{backgroundColor:`rgba(${theme.background},.5)`}}>
       <div className={styles.group}>
       <Avatar size="large" userAvatar={isLocal?localUser?.profileImage:user?.picture}/>
        <p>{isLocal?localUser?.fullName:user?.userfullname}</p>
        {!isLocal&&        <button className="button" onClick={onInitConversation}>message</button>}
       </div>
        </div>
           <div className={styles.background} >
               <button onClick={()=>{setOpenMenu(true)}}><img width={35} src={setting}/></button>
           </div>
        </div>
    )
}

const FallBack=()=>{
    return <></>
}