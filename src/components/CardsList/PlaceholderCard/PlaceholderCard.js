import React from 'react';
import styles from './placeholderCard.css';

export function PlaceholderCard() {
  return (
    <div className={styles.card}>
      <div className={styles.infoContainer}>
        <div className={styles.metaContainer}>
          <div className={styles.metaData}>
            <div className={styles.userLink}>
              <div className={styles.avatar}/>
              <div className={styles.userName}/>
            </div>
            <div className={styles.createdAt}/>
          </div>
        </div>
      </div>

      <div className={styles.previewContainerButton}></div>

      <div className={styles.controlsContainer}>
        <div className={styles.likesContainer}>
          <div className={styles.likesValue}/>
          <button className={styles.buttonHeart}>
          </button>
        </div>
      </div>
    </div>
  )
}
