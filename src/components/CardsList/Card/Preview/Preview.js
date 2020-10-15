import React from 'react';
import styles from './preview.css';
import {Link} from "react-router-dom";


export function Preview({url, handleClickPreview, id}) {
  return (
    <Link to={'/cardpage'} className={styles.previewContainerButton} onClick={()=>handleClickPreview(id)}>
      <img className={styles.previewImg}
           src={url}
           alt='previewPic'
      />
    </Link>
  );
}
