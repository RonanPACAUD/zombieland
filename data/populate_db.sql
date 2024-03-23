BEGIN;

INSERT INTO "user" ("first_name", "last_name", "address", "city", "country", "email", "password", "role") VALUES
('Ronan', 'PACAUD', '12 rue des arbres', 'super-city', 'super-land', 'ronan.pacaud@gmail.com', '$2b$10$JLNU4cNSiazHLBiACdzEgekzoCmr0HbRKAC1D00KzovL3teY5Xsxq', 'admin');

INSERT INTO "category" ("name") VALUES
('Restaurant'),
('Expérience immersive'),
('Rollercoaster');

INSERT INTO "attraction" ("name", "description", "category_id") VALUES
('Dead Encounter', 'Plongez dans l''horreur avec "Dead Encounter," une expérience cauchemardesque qui vous emmènera au plus profond de vos frayeurs. Cette maison d''horreur interdite aux moins de 18 ans vous mettra au défi de survivre à une série de scènes terrifiantes. Des monstres sanguinaires aux apparitions effrayantes, chaque coin cache une horreur inimaginable. Oserez-vous affronter vos pires cauchemars ?', 2),
('Feast of shadows','Bienvenue à "Feast of Shadows", le restaurant qui repousse les limites de la créativité culinaire. Vous serez plongé dans un univers sombre et mystérieux où les plats prennent vie sous une lumière tamisée. Notre menu propose une délicieuse sélection de mets horrifiques qui vous surprendront à chaque bouchée. Des plats étonnants, inspirés de l''univers macabre, vous attendent pour une expérience gastronomique inoubliable.',1),
('Undead Plunge','Préparez-vous à vivre une aventure époustouflante avec "Undead Plunge". Ce rollercoaster extrême, doté de 20 loopings à couper le souffle, est conçu pour les amateurs de sensations fortes en quête d''adrénaline. Montez à bord de votre wagon et préparez-vous à être propulsé à travers des boucles spectaculaires, des vrilles effrayantes et des descentes à grande vitesse. "Undead Plunge" vous promet une expérience de montagnes russes inoubliable que vous n''oserez pas oublier.', 3),
('Zombie parade', 'Bienvenue dans "Zombie Parade", une expérience immersive où le cauchemar devient réalité. Alors que vous explorez le parc, des hordes de zombies affamés font leur apparition et vous traquent. Votre survie dépendra de votre capacité à échapper aux morsures des morts-vivants. Plongez dans l''horreur avec cette aventure effrayante où l''adrénaline monte à chaque coin. Oserez-vous survivre à la "Zombie Parade" ?', 2),
('Zombie thrill', 'Préparez-vous à une expérience de montagnes russes comme aucune autre avec "Zombie Thrill". Ce rollercoaster ultra rapide vous propulse à des vitesses vertigineuses atteignant 300 km/h. Vous ressentirez l''adrénaline monter en 3 flèche tandis que vous survolez le parc à une vitesse fulgurante, enchaînant des virages serrés et des descentes à couper le souffle. "Zombie Thrill" est conçu pour les amateurs de sensations fortes en quête d''une montée d''adrénaline inoubliable.', 3),
('Pink elegance bistro', 'Bienvenue au "Pink Elegance Bistro", un lieu où l''élégance rencontre la féminité dans une ambiance rose chatoyante. Notre restaurant girly friendly vous invite à plonger dans un monde de sophistication et de convivialité. Le décor rose, les détails élégants et une cuisine délicieuse créent une atmosphère chaleureuse et accueillante pour toutes les occasions. Que ce soit pour un déjeuner entre amies, un rendez-vous romantique ou une journée spéciale, "Pink Elegance Bistro" vous offre une expérience gastronomique exceptionnelle.', 1);

INSERT INTO "picture" ("pictures_url", "attraction_id") VALUES
('dead-encounter-1.png', 1),
('dead-encounter-2.png', 1),
('dead-encounter-3.png', 1),
('feast-of-shadows-1.png', 2),
('feast-of-shadows-2.png', 2),
('feast-of-shadows-3.png', 2),
('feast-of-shadows-4.png', 2),
('undead-plunge-1.png', 3),
('undead-plunge-2.png', 3),
('zombie-parade-1.png', 4),
('zombie-parade-2.png', 4),
('zombie-parade-3.png', 4),
('zombie-thrill-1.png', 5),
('zombie-thrill-2.png', 5),
('Firefly_bistrot_(4).jpg', 6),
('Firefly_bistrot_28965.jpg', 6);
('Firefly_bistrot_28965(1).jpg', 6);
('Firefly_bistrot_36542.jpg', 6);
('Firefly_bistrot_46849.jpg', 6);
('Firefly_bistrot_46849(1).jpg', 6);

INSERT INTO "tag" ("name") VALUES
('Sensation Forte'),
('Nouveauté'),
('Terrifiant');

INSERT INTO "price" ("hotel", "duration", "price") VALUES
(false, 1, 65),
(false, 2, 110),
(false, 3, 150),
(false, 4, 185),
(true, 1, 0),
(true, 2, 210),
(true, 3, 385),
(true, 4, 560);

COMMIT;