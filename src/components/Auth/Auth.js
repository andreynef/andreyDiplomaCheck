import React from 'react';
import styles from './auth.css';
import loader from "../../img/Gear.gif";

export function Auth() {

  return (
    <div className={styles.authContainer}>
        <img src={loader} alt={'loader'} className={styles.loader}/>
        <div className={styles.authTextContainer}>
          <span className={styles.authText}>
            Authorizing...
          </span>
        </div>
    </div>
  )
}


// <>
//   {unsplash.users._bearerToken===null||undefined
//     ? <img src={loader} alt={'loader'} className={styles.loader}/>
//     : <span> You are authorized. Going back to homepage...</span>
//   }
// </>
