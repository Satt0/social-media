import React, { useRef ,useState,useEffect,useCallback} from "react";
import styles from "./PostEdit.module.scss";
import { useMedia } from "src/lib/hooks/useMedia";
import {Badge} from '@material-ui/core'
import API from 'src/lib/API/UserAPI'
import {useSelector} from 'react-redux'
import {useTheme} from 'src/lib/hooks/useColor'
function MyEditor({value,setValue}) {
  
  return (
    <div className={styles.editorWrapper}>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
function MyFileViewer({files,handleFiles}) {
    const deleteFile=useCallback((index)=>{
      return ()=>{
          handleFiles(state=>state.filter((file,i)=>index!==i))
      }
  },[handleFiles])
  return <div className={styles.fileViewerWrapper}>
      {files.map((file,index)=><ImageReview key={'file+'+index} onDelete={deleteFile(index)} index={index+1} file={file}/>)}
  </div>;
}

function ImageReview({file,index,onDelete}){
    const [img,setImg]=useState('')
    const bgStyle={
        backgroundPosition:"center",
        backgroundSize:'cover',
        display:'flex',
        alignItems:'flex-end',
        justifyContent:"space-between"
    }
    useEffect(() => {
        const reader = new FileReader();
  reader.addEventListener('load', (event) => {
   const src=(event.target.result);
   
    setImg(src)
  },[]);
  reader.readAsDataURL(file);
    }, [file])
        return <div draggable style={{backgroundImage:`url(${img})`,...bgStyle}}>
            <Badge  badgeContent={index} color="secondary">
            <div style={{height:15,width:15}}></div>

            </Badge>
            <button onClick={onDelete} style={{backgroundColor:"var(--light-button)",color:'white'}} className="button">delete</button>
        </div>
}



export default function PostEdit({ onClose,appendPost }) {
  const theme=useTheme()
    const [editorState, setEditorState] = React.useState("");
  const user=useSelector(state=>state.user)
  const fileRef = useRef(null);
  const [files,appendFile,handleFiles] = useMedia();
  const [viewFile,setViewFile]=useState(false)
  
  const postButton = { display: "flex", justifyContent: "flex-end" };
  const [isLock,setLock]=useState(false);
  const [status,setStatus]=useState({message:''})
  const onChangeInput=useCallback((value)=>{
    if(status.message){
      setStatus({message:''})
    }
    setEditorState(value)
  },[setStatus,setEditorState,status.message])
  const triggerFileUploads = useCallback(() => {
    fileRef.current.click();
  },[fileRef])
  const closeEditor = useCallback((e) => {
    onClose();
  },[onClose])
  const onPost=useCallback(()=>{
     
    setLock(true)
    setStatus({message:"posting!"})
 },[])
  useEffect(()=>{
    if(isLock===true){
      if(user.uid && editorState.trim().length){
        var data = new FormData()
        data.append('content', editorState)
        data.append('count', files.length)
        data.append('uid', user.uid)
        files.forEach((file)=>{
            data.append(`uploads`,file)
        })
        
        
        API.makePost(data).then(res=>{
            if(res.postid){
              const newPost={
                ...res,
                datecreated:Date.now(),
                user:{
                    userid:user.uid,
                    userfullname:user.fullName,
                    picture:user.profileImage
                }
              }
              appendPost(newPost)
              setStatus({message:"success!"})
              onClose()
            }
        }).catch(e=>{
          setStatus({message:"post failed!"})
          setLock(false)
        })
       }else{
         
        setStatus({message:"no empty post!"})
        setLock(false)
       }
    }
  },[isLock,user.uid,editorState,files,appendPost,onClose])


  return (
    <div   className={styles.container} style={{backgroundColor:`rbga(${theme.background},.3)`}}>
      {/* files input hidden */}
      <div className={styles.hiddenInput}>
        <input
          onChange={appendFile}
          ref={fileRef}
          type="file"
          multiple
          accept="image/png, image/gif, image/jpeg, video/*"
        />
      </div>
      {/* overlay */}
      <div
        title="close editor"
        className={styles.overlay}
        onClick={(e) => {
          if(!isLock){
            onClose();
          }
          
        }}
      ></div>
      {/* text editor */}
      <div className={styles.editor} style={{backgroundColor:theme.background,color:theme.text}}>
        <div className={styles.userProfile}>
          <p>{!viewFile?'Write post':"Edit file ("+files.length+")"} <strong>{status.message}</strong></p>
        </div>

        {viewFile?<MyFileViewer files={files} handleFiles={handleFiles}/>:<MyEditor value={editorState} setValue={onChangeInput}/>}

        <div className={styles.groupButton}>
          <button disabled={isLock} className="button" onClick={triggerFileUploads}>
            add media
          </button>
          <Badge invisible={viewFile} badgeContent={files.length || 0} color="secondary">
          <button className="button" onClick={()=>{setViewFile(s=>!s)}}>view {viewFile?'post':'media'}</button>
</Badge>
          <div style={postButton}>
            <button disabled={isLock} className="button bg-pink" onClick={onPost}>post</button>
          </div>
          <button className="button" disabled={isLock} onClick={closeEditor}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
