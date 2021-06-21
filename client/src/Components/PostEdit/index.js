import React, { useRef ,useState,useEffect} from "react";
import styles from "./PostEdit.module.scss";
import { useMedia } from "src/lib/hooks/useMedia";
import {Badge} from '@material-ui/core'
import API from 'src/lib/API/UserAPI'
import {useSelector} from 'react-redux'
import Post from "../Post";
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
    const deleteFile=(index)=>{
        return ()=>{
            handleFiles(state=>state.filter((file,i)=>index!==i))
        }
    }
  return <div className={styles.fileViewerWrapper}>
      {files.map((file,index)=><ImageReview onDelete={deleteFile(index)} index={index+1} file={file}/>)}
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
    const [editorState, setEditorState] = React.useState("");
  const uid=useSelector(state=>state.user.uid)
  const fileRef = useRef(null);
  const [files,appendFile,handleFiles] = useMedia();
  const [viewFile,setViewFile]=useState(false)
  const postButton = { display: "flex", justifyContent: "flex-end" };
  const triggerFileUploads = () => {
    fileRef.current.click();
  };
  const closeEditor = (e) => {
    onClose();
  };
  const onPost=()=>{
     if(uid && editorState.trim().length){
      var data = new FormData()
      data.append('content', editorState)
      data.append('count', files.length)
      data.append('uid', uid)
      files.forEach((file,index)=>{
          data.append(`uploads`,file)
      })
      
      
      API.makePost(data).then(res=>{
          if(res.postid){

            appendPost(res)

            onClose()
          }
      })
     }else{
       alert("check your post again!")
     }
     
  }
  return (
    <div className={styles.container}>
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
          onClose();
          e.stopPropagation();
        }}
      ></div>
      {/* text editor */}
      <div className={styles.editor}>
        <div className={styles.userProfile}>
          <p>{!viewFile?'Write post':"Edit file ("+files.length+")"}</p>
        </div>

        {viewFile?<MyFileViewer files={files} handleFiles={handleFiles}/>:<MyEditor value={editorState} setValue={setEditorState}/>}

        <div className={styles.groupButton}>
          <button className="button" onClick={triggerFileUploads}>
            add media
          </button>
          <Badge invisible={viewFile} badgeContent={files.length || 0} color="secondary">
          <button className="button" onClick={()=>{setViewFile(s=>!s)}}>view {viewFile?'post':'media'}</button>
</Badge>
          <div style={postButton}>
            <button className="button bg-pink" onClick={onPost}>post</button>
          </div>
          <button className="button" onClick={closeEditor}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
