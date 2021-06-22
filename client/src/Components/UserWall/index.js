import React,{Suspense} from 'react'
import styles from './UserWall.module.scss'
import Avatar from '../Avatar'
import setting from 'src/stylesheets/svg/setting.svg'
import { useSelector } from 'react-redux'
const Setting=React.lazy(()=>import('src/Components/SettingPanel'))
export default function UserWall({user,isLocal}) {
    const [openMenu,setOpenMenu]=React.useState(false)
    const localUser=useSelector(state=>state.user)
    return (
        <div className={styles.container}> 
        <Suspense fallback={<FallBack/>}>

        <Setting open={openMenu} onClose={()=>{setOpenMenu(false)}}/>
        </Suspense>
        <div className={styles.userInfor}>
       <div className={styles.group}>
       <Avatar size="large" userAvatar={isLocal?localUser?.profileImage:user?.picture}/>
        <p>{isLocal?localUser?.fullName:user?.userfullname}</p>
       </div>
        </div>
           <div className={styles.background}>
               <button onClick={()=>{setOpenMenu(true)}}><img width={35} src={setting}/></button>
           </div>
        </div>
    )
}

const FallBack=()=>{
    return <></>
}