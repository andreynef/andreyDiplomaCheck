import React from 'react';
import styles from './cardList.css';
import {Card} from "./Card/Card";
import Loader from '../../../src/img/3.svg'
import {PlaceholderCard} from "./PlaceholderCard/PlaceholderCard";

export function CardList({add,clickedImageObj,images, handleClickPreview, handleClickHeart, isAuth, setIsCardOpened, isHeartError, setIsHeartError}) {
  const loadMoreBtn = images.length ? <Card add={add} whoIs={'moreButton'}/> : null;
  let cardList;

  if (!images.length) {
    cardList=
      <>
        <div className={styles.loader}>
          <Loader/>
        </div>
        <PlaceholderCard/>
        <PlaceholderCard/>
        <PlaceholderCard/>
        <PlaceholderCard/>
        <PlaceholderCard/>
        <PlaceholderCard/>
      </>
  } else {
    cardList = images.map((item, i) => {
      return (
          <Card
            key={item.id}
            id={item.id}
            created={item.created_at}
            name={item.user.first_name}
            profile={item.user.links.html}
            likes={item.likes}
            url={item.urls.thumb}
            ava={item.user.profile_image.small}
            handleClickPreview={handleClickPreview}
            handleClickHeart={handleClickHeart}
            isLiked={item.liked_by_user}
            isAuth={isAuth}
            setIsCardOpened={setIsCardOpened}
            setIsHeartError={setIsHeartError}
            isHeartError={isHeartError}
            clickedImageObj={clickedImageObj}
          />
      )
    })}

    return (
      <main className={styles.mainContainer}>
        <section className={styles.centralContainer}>
          <ul className={styles.cardList}>
            {cardList}
            {loadMoreBtn}
          </ul>
        </section>
        {/*<button*/}
        {/*  className={styles.button}*/}
        {/*  type="button"*/}
        {/*  onClick={add}*/}
        {/*>*/}
        {/*  Загрузить еще*/}
        {/*</button>*/}
      </main>
    )
}
