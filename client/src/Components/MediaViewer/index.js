import React from "react";
import styles from "./MediaViewer.module.scss";
import { getImageURL } from "src/lib/Ultilities/getURL";
import back from "src/stylesheets/svg/back.svg";
import forward from "src/stylesheets/svg/forward.svg";
export default function MediaViewer({ media }) {
  const [index, setIndex] = React.useState(0);
  const containerRef = React.useRef(null);
  const [thisDimension,setDimension]=React.useState({width:0,height:0})
  const navigate = (dir) => () => {
    setIndex((old) =>
      dir === "r" ? Math.min(old + 1, media.length - 1) : Math.max(old - 1, 0)
    );
  };
  React.useEffect(() => {
    
      const changeHandler=()=>{
        
        
          const newWidth=containerRef.current.offsetWidth;
          const newHeight=containerRef.current.offsetHeight;
            setDimension({width:newWidth,height:newHeight})
        
      }
      changeHandler()
      if(typeof window){
        window.addEventListener('resize',changeHandler)

      }
      return()=>{
        if(typeof window){
          window.removeEventListener('resize',changeHandler)

        }
      }
  }, [index]);
  
  return (
    <div className={styles.container} ref={containerRef}>
      {index > 0 && (
        <button onClick={navigate("l")} className={styles.Left}>
          <img alt="go back" src={back} />
        </button>
      )}
      <Show ctnDimension={thisDimension}  media={media[index]} />
      {index < media.length - 1 && (
        <button onClick={navigate("r")} className={styles.Right}>
          <img alt="go forward" src={forward} />
        </button>
      )}
    </div>
  );
}
const Image = ({ image ,ctnDimension}) => {
  const thisRef=React.useRef(null)
  const [moreWidth,setMoreWidth]=React.useState(false)
  return (
    <img
        ref={thisRef}
        onLoad={(e)=>{
        const image=e.target
        const thisWidth=image.offsetWidth
        const thisHeight=image.offsetHeight
        if(thisWidth > ctnDimension.width){
          setMoreWidth(true)
        }
        if(thisHeight>ctnDimension.height){
          setMoreWidth(false)
        }
      
        }}
        style={{userSelect:"none"}}
      alt="user post"
      className={moreWidth?styles.ImageWidth:styles.ImageHeight}
      src={getImageURL(image)}
    />
  );
};

const Video = ({ video }) => {
  return (
    <video
      controls
      className={styles.Video}
      src={getImageURL(video)}
    />
  );
};
const Show = ({ media ,ctnDimension}) => {
  if (media.type.match(/^video/)) {
    return <Video video={media} />;
  }
  return <Image ctnDimension={ctnDimension}  image={media} />;
}

