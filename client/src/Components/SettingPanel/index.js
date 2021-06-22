import React from 'react'
import styles from './SettingPanel.module.scss'
import { useSelector } from 'react-redux'
import API from 'src/lib/API/UserAPI'
import {useDispatch} from 'react-redux'
import TYPE from 'src/ReduxStore/bin/CONSTANT'
function DispatchAvatar(res) {

    return (dispatch)=>{
      const { picture } = res;
    const payload = {
     
      profileImage: picture,
      
    };
      dispatch({ type: TYPE.changeAvatar, payload: payload });
    }
  
  }

export default function SettingPanel({open,onClose}) {
    const uid=useSelector(state=>state.user.uid)
    const dispatch = useDispatch(null)
    const ref=React.useRef(null)
    const onSubmit=(e)=>{
        e.preventDefault()
        const form=new FormData()
        
        form.append('avatar',ref.current.files[0])
        API.setUserAvatar(uid,form).then(res=>{
           
            dispatch(DispatchAvatar(res.rows[0]))
        })
        
       
    }
   if(open){
    return (
        <div className={styles.container}>
          
            <div className={styles.mainContent}>
                <form onSubmit={onSubmit} >

                <label>change profile picture</label>
                <input ref={ref} required name="avatar" type="file" accept="image/*"/>
                <button type="submit">set</button>
                </form>
                <button onClick={onClose}>close</button>
            </div>
        </div>
    )
   }
   return <></>
}
