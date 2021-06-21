import React from "react";
import styles from "./MediaViewer.module.scss";
import { getImageURL } from "src/lib/Ultilities/getURL";
export default function MediaViewer({ media }) {
  const [index, setIndex] = React.useState(0);
  
  const navigate = (dir) => () => {
    setIndex((old) =>
      dir === "r" ? Math.min(old + 1,media.length-1) : Math.max(old - 1 ,0)
    );
  };
  return (
    <div className={styles.container}>
      {index > 0 && (
        <button onClick={navigate("l")} className={styles.Left}>
          {"<"}
        </button>
      )}
      <Show media={media[index]} />
      {index < media.length - 1 && (
        <button onClick={navigate("r")} className={styles.Right}>
          {">"}
        </button>
      )}
    </div>
  );
}
const Image = ({ image }) => {
  return <img alt="user post" className={styles.Image} src={getImageURL(image)} />;
};

const Video = ({ video }) => {
  return (
    <video
      // style={{ width: "100%" }}
      controls
      className={styles.Video}
      src={getImageURL(video)}
    />
  );
};
const Show = ({ media }) => {
  if (media.type.match(/^video/)) {
    return <Video video={media} />;
  }
  return <Image image={media} />;
};
