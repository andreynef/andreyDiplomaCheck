import React from 'react';//импорт реакт библиотеки для работы с этим файлом
import ReactDOM from 'react-dom';//импорт реактдом библиотеки для работы с этим файлом (только в том файле где находится строчка ReactDOM.render)
import App from './App.js';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render (//отрендерить/отрисовать
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")//куда
);

