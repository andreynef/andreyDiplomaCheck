import React from 'react';
import styles from './header.css';

export function Header({goToAuthorizePage, isAuth, devBtn, toLogout, userProfile}) {
  const userName=capitalizeFirstLetter(`${userProfile.first_name}`);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.centralContainer}>
        <div className={styles.logoContainer}>
          <img src={'https://www.flaticon.com/svg/static/icons/svg/1/1394.svg'} alt={'logo'}/>
        </div>
        {devBtn &&(
          <button
          type="button"
          onClick={devBtn}
          >
          dev button (show states in console)
          </button>
        )}
        <div className={styles.userContainer}>
          {isAuth && (
            <>
              <button className={styles.button} type="button" onClick={toLogout}>
                <span className={styles.logoutText}>Logout</span>
              </button>
              <img
                className={styles.avatarImg}
                src={userProfile.profile_image.small}
                alt="avatar"
              />
              <button className={styles.button} type="button">
                <a className={styles.avatarText} href={userProfile.links.html}> {userName}</a>
              </button>
            </>
          )}
          {!isAuth && (
            <button className={styles.button} type="button" onClick={goToAuthorizePage}>
              <span className={styles.avatarText}>Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}





