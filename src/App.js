import React, {useEffect, useState} from 'react';
import './main.global.css';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "./components/CardsList/CardList";
import {Route, Switch} from "react-router-dom";
import {Header} from "./components/Header/Header.js";
import {Footer} from "./components/Footer/Footer";
import {CardPage} from "./components/CardPage/CardPage";

const App= () => {
  const accessKey = process.env.REACT_APP_ACCESSKEY;//ключ прячем в рут (файл .env) + плагин dotenv-webpack в клиентской части конфиг файла. + gitignore. В create-react-app автомат.
  const secret = process.env.REACT_APP_SECRET;
  const callbackUrl = process.env.REACT_APP_CALLBACKURL;
  const bearerToken = localStorage.accessTokenForUnsplash;//берем из локала. Если нет то устанавливается на null.
  // const bearerToken = 'u9cltpdaekYTys_6i6twxgdnLT2W69GbEPQVMYollUg';//Andrey
  const AMOUNT_ON_PAGE = 10;
  const INITIAL_PAGE = 100;
  const unsplash = new Unsplash({//с ключом или без неважно. Будет использоваться только один unsplash без обновлений.
    accessKey: accessKey,
    secret: secret,
    callbackUrl: callbackUrl,
    bearerToken: bearerToken,
  });

  const [images, setImages] = useState([]);//стейт списка фоток
  const [clickedImageObj, setClickedImageObj] = useState({});//обьект на кот ткнули
  const [isCardOpened, setIsCardOpened] = useState(false);//стейт отображения картинки в подробном виде
  const [page, setPage] = useState(INITIAL_PAGE);//для слежки посл открытой страницы из запроса
  const [isAuth, setIsAuth] = useState(false);//статус авторизации
  const [userProfile, setUserProfile] = useState('');//информация о пользователе
  const [isHeartError, setIsHeartError] = useState(false);//информация о пользователе


  const getBearerTokenFromUrlCode =()=> {
    const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...

    if (codeFromUrl) {//если код в строке есть.
      unsplash.auth.userAuthentication(codeFromUrl)//отправляем запрос на получение токена
        .then(toJson)
        .then(json => {
          setBearerTokenToLocalStorage(json.access_token);
          window.location.assign('https://jsdiploma.nef-an.ru');// Перезагружаем гл страницу.
        })
    }
  }

  const getUserProfile =()=> {
    if (bearerToken) {//если в стейте есть ключ
      unsplash.currentUser.profile()
        .then(toJson)
        .then(json => {// json обьект = {id: "Rc7GH-2FKsU", name: "andrey nefedyev", first_name: "andrey"}
          setUserProfile(json);
          setIsAuth(true);
        });
    }
  };

  const setBearerTokenToLocalStorage= (bearerToken) => {
    localStorage.setItem('accessTokenForUnsplash', JSON.stringify(bearerToken));
  };

  const deleteAccessTokenFromLocalStorage= () => {
    localStorage.removeItem('accessTokenForUnsplash');
  };

  const toLogout= () => {
    setIsAuth(false);
    deleteAccessTokenFromLocalStorage();
  };

  const goToAuthorizePage=()=>{
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([// Генерируем адрес страницы аутентификации на unsplash.com
      "public",// и указываем требуемые разрешения (permissions)
      "write_likes",
    ]);
    window.location.assign(authenticationUrl);// Отправляем пользователя на авторизацию Unsplash а потом он пепенаправит на - callbackUrl
  };

  const getFirstTenPhotos = ()=>{
    if (images.length === 0) {//только когда список пуст.
      unsplash.photos.listPhotos(page, AMOUNT_ON_PAGE, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
        .then(toJson)
        .then(json => {//json это ответ в виде массива обьектов
          setImages([...json]);//установка нов стейта списка фоток (после этой ф).
        });
    }else {
    }

  };

  const addPhotos = () => {
    unsplash.photos.listPhotos(page+1, AMOUNT_ON_PAGE, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
      .then(toJson)
      .then(json => {//json это ответ в виде массива обьектов в количестве указанном в переменной amountOfItemsOnPage.
        const newImagesArr = [...images, ...json];//создаем новый массив добавляя к старым новые фотки.
        setImages(newImagesArr);//обновляем стейт списка картинок.
        setPage(page + 1);//сохраняем стейт последней запрашиваемой страницы.
      });
  };

  const likePhotoRequest =(id)=> {
    unsplash.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
      .then(toJson)
      .then(json => {//json это ответ в виде одного обьекта {photo:{}, user:{}}
        //ничего не делать чтобы не нагружать сервер лишними запросами на загрузку.
      })
  };

  const unlikePhotoRequest =(id)=> {
    unsplash.photos.unlikePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
      .then(toJson)
      .then(json => {//json это ответ в виде одного обьекта {photo:{}, user:{}}
        //ничего не делать чтобы не нагружать сервер лишними запросами на загрузку.
      })
  };

  const handleClickPreview = (id) => {//повешен на preview
    const clickedObj = images.find(item => item.id === id);//найти итем с нужным айди в стейте
    setClickedImageObj(clickedObj);//установить стейт открытой картинки, кот потом будет передавать всю инфу при детальном просмотре.
    setIsCardOpened(true);//установить стейт булинь статуса открытости картинки
  };

  const handleClickHeart = (id) => {
    const clickedObj = images.find(item => item.id === id);//найти итем с нужным айди в стейте
    setClickedImageObj(clickedObj);//установить стейт открытой картинки, кот потом будет передавать всю инфу при детальном просмотре.
    const clickedObjLikesAmount = clickedObj.likes;//вытащить число лайков из обьекта для дальнейшего их изменения ниже.

    if(isAuth) {
      if (clickedObj.liked_by_user === false) {//если у выбранного итема стоит like=false...
        likePhotoRequest(id);//...то запрос на сервер на лайк.
        const localFilteredImages = images.filter(item =>//создать копию стейта списка изменяя нужные данные у одного выбранного элемента
          item.id === id
            ? (item.liked_by_user=true, item.likes=clickedObjLikesAmount+1)
            : item
        );
        setImages(localFilteredImages);//установить нов фильтрованый список с измененным итемом.
      } else {//иначе, тобишь true...
        unlikePhotoRequest(id);//...запрос на сервер на анлайк
        const localFilteredImages = images.filter(item =>//создать копию стейта списка изменяя нужные данные у одного выбранного элемента
          item.id === id
            ? (item.liked_by_user=false, item.likes=clickedObjLikesAmount-1)
            : item
        );
        setImages(localFilteredImages);//установить нов фильтрованый список с измененным итемом.
      };
    }else{
      setIsHeartError(true);
      setTimeout(()=>setIsHeartError(false), 2000);
    };
  };

  useEffect(() => {
    getBearerTokenFromUrlCode();//is it auth url? true  -> setBearerTokenToLocalStorage and reload.
    getUserProfile();//is unsplash has code? true -> setUserProfile,setIsAuth.
    getFirstTenPhotos();//are images empty? true  -> setImages.
  }, []);//= componentDidMount, componentWillUpdate. Выполняется 1 раз при монтаже и кажд раз при изменении []. Если в [] пусто то просто 1 раз при монтаже.


  return (
    <>
      <Header
        goToAuthorizePage={goToAuthorizePage}
        toLogout={toLogout}
        isAuth={isAuth}
        userProfile={userProfile}
        devBtn={devBtn}
      />
      <Switch>{/*рендерится в зависимости от Route path*/}
        <Route exact path={'/'}
               component={() =>
                 <CardList
                   add={addPhotos}
                   handleClickHeart={handleClickHeart}
                   images={images}
                   handleClickPreview={handleClickPreview}
                   isAuth={isAuth}
                   isHeartError={isHeartError}
                   setIsHeartError={setIsHeartError}
                   clickedImageObj={clickedImageObj}
                 />
               }
        />
        <Route exact path={'/cardpage'}
               component={() =>
                 <CardPage
                   clickedImageObj={clickedImageObj}
                   handleClickHeart={handleClickHeart}
                   images={images}
                   isAuth={isAuth}
                   setIsCardOpened={setIsCardOpened}
                   isCardOpened={isCardOpened}
                   isHeartError={isHeartError}
                 />
               }
        />
        <Route exact path={'/auth'} component={() => <Auth unsplash={unsplash}/>}/>
      </Switch>
      {!isCardOpened &&(
        <Footer/>
      )}
    </>
  );

}


export default App;
