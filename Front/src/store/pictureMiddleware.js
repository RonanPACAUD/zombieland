const pictureMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'GET_ALL_PICTURES') {
    fetch('http://localhost:3000/picture')
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updateAttractionList(data));
      });
  }


  if (action.type === 'UPLOAD_PICTURE_TO_MULTER') {

    const formData = new FormData();
    formData.append('photo', action.payload);

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {

      });
  }

  if (action.type === 'UPLOAD_PICTURE_TO_API') {
    console.log(action.payload.name);

    fetch('http://localhost:3000/picture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        attraction_id: action.payload.id,
        pictures_url: action.payload.name,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        store.dispatch({
          type: 'GET_ONE_ATTRACTION',
          payload: action.payload.id
        });
      });
  }

  if (action.type === 'DELETE_PICTURE') {
    fetch(`http://localhost:3000/picture/${action.payload.picture_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch({
          type: 'GET_ONE_ATTRACTION',
          payload: action.payload.attraction_id
        });
      });
  }

  next(action);
};

export default pictureMiddleware;
