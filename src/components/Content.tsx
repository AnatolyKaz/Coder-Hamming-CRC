import React from 'react'

export const Content: React.FC = () => {
    return (
        <div>
            <hr />
            Для работы приложения введите сообщение в поле выше и нажмите
            "кодировать". <br />
            Для имитации ошибки при передаче сообщения активируйте
            соответствующую галочку.
            <br />
            Подробную информацию о том как реализуется кодировка Хэмминга вы
            можете узнать <a href="https://clck.ru/TajiJ">здесь(Wiki)</a> и{" "}
            <a href="https://habr.com/ru/post/140611/">здесь(habr)</a>. <br />
            Так же вы можете узнать больше о кодировке CRC по{" "}
            <a href="https://clck.ru/TajeS">этой(Wiki)</a> и{" "}
            <a href="https://clck.ru/Tajt4">этой</a> ссылкам.
        </div>
    )
}