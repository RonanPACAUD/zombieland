import './AdminMessage.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const cloudBaseUrl = import.meta.env.VITE_REACT_CLOUD_BASE_URL;

export default function AdminMessage() {
  const dispatch = useDispatch();

  const messagesList = useSelector((state) => state.message.messagesList);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_MESSAGES' });
  }, []);

  return (
    <div className="admin-message">
      <h2>Message</h2>
      <div className="admin-message__null-message">
        {messagesList.length === 0 && <h3>Aucun message</h3>}
      </div>
      <div className="admin-message__list-container">
        {messagesList &&
          messagesList.map((message) => (
            <div
              key={message.id}
              className="admin-message__list-container__item"
            >
              {message.closed && <div className='admin-message__list-container__item__after'></div>}
              <div className="admin-message__list-container__item__user">
                {message.sender.first_name} {message.sender.last_name} <br />
                {message.sender.email} <br />
                {message.sender.address} <br />
                {message.sender.city} <br />
                {message.sender.country}
              </div>
              <div className="admin-message__list-container__item__message">
                <div className="admin-message__list-container__item__message__subject">
                  <span>Objet: </span> <br />
                  {message.subject}
                </div>
                <div className="admin-message__list-container__item__message__content">
                  <span>Message: </span> <br />
                  {message.content}
                </div>
              </div>
              <div className="admin-message__list-container__item__buttons">
                <button
                  className="admin-message__list-container__item__buttons__classified"
                  value={message.id}
                  onClick={(e) => {
                    dispatch({
                      type: 'MODIFY_MESSAGE_TO_API',
                      payload: {
                        id: e.target.value,
                        closed: !message.closed,
                      }
                    })
                  }}
                >
                  Classer
                </button>
                <button
                  className=""
                  value={message.id}
                  onClick={(e) => {
                    dispatch({
                      type: 'DELETE_MESSAGE',
                      payload: e.target.value,
                    });
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
