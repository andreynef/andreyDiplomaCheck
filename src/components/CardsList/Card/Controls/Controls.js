import React from 'react';
import styles from './controls.css';
import HeartIconUnpressed from "../../../../img/HeartIconUnpressed.svg";
import HeartIconPressed from "../../../../img/HeartIconPressed.svg";


export function Controls({likes, clickedImageObj,id,isLiked, handleClickHeart, isHeartError}) {

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.likesContainer}>
        <span className={styles.likesValue}>{likes}</span>
        <button className={styles.button} onClick={()=>handleClickHeart(id)}>
          {/*<img src={isLiked? HeartIconPressed : HeartIconUnpressed} alt={'heart'}/>*/}
          {isLiked? <HeartIconPressed/> : <HeartIconUnpressed/>}
        </button>
      </div>
        {isHeartError && clickedImageObj.id===id && (
          <div className={styles.errorContainer}>
            <span className={styles.errorValue}>You are not authorized</span>
          </div>
        )}
    </div>
  );
}


