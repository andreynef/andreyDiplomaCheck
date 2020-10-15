import React from 'react';
import styles from './card..css';
import {Controls} from "./Controls/Controls";
import {Info} from "./Info/Info";
import {Preview} from "./Preview/Preview";

export function Card({add,url, clickedImageObj,isHeartError, setIsHeartError, created, likes, handleClickHeart, profile, name, ava, description, open, id, handleClickPreview, pressed, setPressed, setLikedId, likePhoto, isLiked, isAuth, whoIs}) {
  return (
    <div className={styles.card}>
      {whoIs === 'moreButton'
        ?
        <div className={styles.loadMoreContainer} onClick={add}>
          <span className={styles.loadMoreText}>Load more</span>
        </div>
        :
        <>
          <Info created={created} profile={profile} name={name} ava={ava} description={description}/>
          <Preview url={url} handleClickPreview={handleClickPreview} id={id}/>
          <Controls clickedImageObj={clickedImageObj} isHeartError={isHeartError} likes={likes} handleClickHeart={handleClickHeart} isLiked={isLiked} id={id}/>
        </>
        }
    </div>
  )
}
