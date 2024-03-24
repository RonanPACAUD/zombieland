import './Greeting.scss';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Greeting() {
  const dispatch = useDispatch();

  const priceList = useSelector((state) => state.price.priceList);

  useEffect(() => {
    dispatch({ type: 'GET_PRICES_FROM_API' });
  }, []);

  return (
    <div className="greeting">
      <img
        src={'https://storage.googleapis.com/zombieland-assets/dead-encounter-retouche_03.png'}
        alt="Zombie"
        className="greeting__picture main-picture"
      ></img>
      <div className="greeting__main-title main-title">
        <h1>Bienvenue à ZombieLand</h1>
        <img
          src={'https://storage.googleapis.com/zombieland-assets/dual-underline.png'}
          alt="underline"
          className="greeting__main-title__underline underline"
        />
        <p>
          ZombieLand est bien plus qu'un simple parc d'attractions, c'est une
          expérience terrifiante, palpitante et mémorable qui plonge les
          visiteurs au cœur d'un univers post-apocalyptique où les zombies
          règnent en maîtres.
        </p>
      </div>
      <div className="greeting__presentation">
        <h2>L'Horreur Épique</h2>
        <p>
          Dès que les visiteurs franchissent les portes de ZombieLand, ils sont
          transportés dans un monde en ruines, rempli d'ombres lugubres et de
          créatures en quête de chair fraîche. Les décors, soigneusement conçus
          pour créer une ambiance terrifiante, plongent les visiteurs dans un
          scénario apocalyptique où chaque coin peut cacher un danger mortel.
        </p>
        <h2>Les Attractions à Couper le Souffle</h2>
        <p>
          ZombieLand propose une gamme d'attractions et de manèges à couper le
          souffle qui plairont aux amateurs de sensations fortes. Montez à bord
          de montagnes russes effrayantes qui traversent des cimetières hantés,
          affrontez des zombies dans des jeux interactifs et parcourez un
          labyrinthe terrifiant infesté de morts-vivants.
        </p>
        <h2>Les Spectacles Époustouflants</h2>
        <p>
          Nos spectacles en direct vous feront vivre des moments palpitants
          alors que des acteurs talentueux interagissent avec des zombies et des
          effets spéciaux à couper le souffle. Danse macabre, combats épiques et
          histoires sinistres vous tiendront en haleine tout au long de votre
          visite.
        </p>
      </div>

      <img src={'https://storage.googleapis.com/zombieland-assets/parkMap.jpg'} className="greeting__park-map" />

      <div className="greeting__under-presentation">
        <div className="greeting__security">
          <h2>Sécurité Avant Tout</h2>
          <p>
            La sécurité de nos visiteurs est notre priorité absolue. Une équipe
            de professionnels expérimentés veille à ce que chaque attraction
            soit sûre tout en offrant des sensations fortes. ZombieLand
            Adventure Park, où l'horreur rencontre l'aventure, et où chaque
            visiteur devient un survivant. Réservez votre billet pour une
            expérience inoubliable, mais n'oubliez pas : dans ZombieLand, chaque
            coin sombre peut cacher un secret terrifiant.
          </p>
        </div>
        <div className="greeting__practical-info">
          <h2>Infos Pratiques</h2>
          <div className="greeting__practical-info__info-container">
            <div className="greeting__practical-info__info-container__opening-location">
              <h3>Horaires d'ouverture</h3>
              Le parc est ouvert tous les jours, du lundi au dimanche, de 9h à
              18h
              <h3>Emplacement</h3>
              ZombieLand Amusement Park
              <br />
              3 Chemin de la tombe
              <br />
              77 118 La Tombe <br />
              Seine-et Marne
              <br />
              <h3>Tarifs</h3>
              <div className="greeting__practical-info__info-container__opening-location__rate">
                <div className="without-hotel">
                  {priceList.map((price) => {
                    if (price.hotel === false) {
                      return (
                        <div key={price.id}>
                          Pass {price.duration} journée : {price.price} €<br />
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="with-hotel">
                  Avec hotel le prix est de :<br />
                  {priceList.map((price) => {
                    if (price.hotel === true) {
                      return (
                        <div key={price.id}>
                          {price.duration} jours et {price.duration - 1} nuit :{' '}
                          {price.price} €<br />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="greeting__practical-info__info-container__location-map-container">
              <img
                src={'https://storage.googleapis.com/zombieland-assets/image.png'}
                alt="Map Location"
                className="greeting__practical-info__info-container__location-map-container__location-map"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
