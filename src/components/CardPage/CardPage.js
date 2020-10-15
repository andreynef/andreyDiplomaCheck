import React from 'react';
import styles from './cardPage.css';
import Cross2 from '../../img/cross2.svg';
import HeartIconPressed from "../../img/HeartIconPressed.svg";
import HeartIconUnpressed from "../../img/HeartIconUnpressed.svg";
import ProgressiveImage from "react-progressive-graceful-image";
import {Link} from "react-router-dom";

export function CardPage({handleClickHeart, clickedImageObj, setIsCardOpened, isCardOpened, isHeartError}) {

  const date = clickedImageObj.created_at.slice(0,10);//срезать лишние цифры из даты
  return (
    <>
        <div className={styles.cardPage}>
          <div className={styles.centralContainer}>
              <div className={styles.imageContainer}>
                <ProgressiveImage//загрузчик из https://www.npmjs.com/package/react-progressive-graceful-image
                  src={clickedImageObj.urls.regular}
                  placeholder={clickedImageObj.urls.thumb}
                >
                  {src => <img src={src} alt={clickedImageObj.alt_description} />}
                </ProgressiveImage>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.metaContainer}>
                  <div className={styles.authorContainer}>
                    <img
                      className={styles.avatarImg}
                      src={clickedImageObj.user.profile_image.small}
                      alt="avatar"
                    />
                    <a className={styles.avatarText} href={clickedImageObj.user.links.html}>{clickedImageObj.user.first_name}</a>
                  </div>
                  <span className={styles.createdAt}>{date}</span>
                </div>
                <div className={styles.likesContainer}>
                  <span className={styles.likesValue}>{clickedImageObj.likes}</span>
                  <button className={styles.button} onClick={()=>handleClickHeart(clickedImageObj.id)}>
                    {clickedImageObj.liked_by_user? <HeartIconPressed/>: <HeartIconUnpressed/>}
                  </button>
                  {isHeartError && (
                    <div className={styles.errorContainer}>
                      <span className={styles.errorValue}>You are not authorized</span>
                    </div>
                  )}
                </div>
              </div>
            <Link className={styles.exitButton} to={'/'} >
              <Cross2/>
            </Link>
          </div>
      </div>
    </>
  )
}
