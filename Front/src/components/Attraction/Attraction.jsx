import './Attraction.scss';

import { Carousel } from 'react-responsive-carousel';

export default function Attraction({
  name,
  description,
  category,
  pictures,
  tags,
}) {

  return (
    <div className="attraction">
      <div className="attraction__carousel">
        <Carousel
          showThumbs={false}
          autoPlay
          interval="4000"
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          emulateTouch={true}
          stopOnHover={true}
        >
          {pictures &&
            pictures.map((picture) => (
              <div key={picture.id} className="attraction__pictures">
                <img src={`https://res.cloudinary.com/dqi53fnvz/image/upload/v1731763052/${picture.pictures_url}`} />
              </div>
            ))}
        </Carousel>
      </div>
      <div className="attraction__info">
        <div className="attraction__info__name">
          <h2>{name}</h2>
          <p>{category.name}</p>
        </div>
        <div className="attraction__info__description">
          <p>{description}</p>
        </div>
        <div className="attraction__info__tag">
          {tags && tags.map((tag) => <div key={tag.id}>{tag.name}</div>)}
        </div>
      </div>
    </div>
  );
}
