BEGIN;

INSERT INTO "utilisateur"
  ("id", "email", "mot_de_passe")
VALUES
  ( 1, 'b.campbell@pet-smart.fr', '$2b$08$hKV4.9nQ2cch50Ub6DVhi.VRMaJVaVVtN5ivbfGVo/9VWt07LTE3e'),
  ( 2, 'j.lopez@mail.io', '$2b$08$IgpTOYSy6gqvFEiBTkEpy.R.UGbcKON/TvP5LLK9LYf7ZUTkutd76'),
  ( 3, 'j.venchi@maimail.io', '$2b$08$HTY4jfz8o5SmYfwnWGseb.CC9dWjO2umeuMRHXbCtYGPdHu0q.Rbq'),
  ( 4, 'c.pagrav@proton.fr', '$2b$08$EiGT8Z2c/xHKsZb/ofUJt.ostO/EwqlLx1c5E6pyAbPhx055CEq1S'),
  ( 5, 'llm@wanadoux.fr', '$2b$08$GqKC4IdBIWqFy/nHKZWgMOMyaDze383c7dpUpLYtWNEb9Lv1TxtoS'),
  ( 6, 'cha@perlipop.et', '$2b$08$xyziNtII/luJphK4Wv4QTuWcnMBzgfeSsPf.whw1H06O1rDRhFW2u'),
  ( 7, 'zeb@manege.com', '$2b$08$q2UqhQfdPDHL7C7bZCpNd.sq9PoQ5A0rDGjBQ6yaxCPgB.W1ozy2W')
;

INSERT INTO "association"
  ("id", "nom", "responsable", "rue", "commune", "code_postal", "pays", "siret", "telephone", "slug", "utilisateur_id")
VALUES
  ( 1, 'PetSmart', 'B. Campbell', '38 rue des pinèdes', 'Paris', '75020', 'France', '732 829 320 00074', '01 45 49 36 17', '75-pet-smart-1', 1),
  ( 2, 'SPB', 'J. Venchi', '60, place du capitole', 'Toulouse', '31000', 'France', '735 654 140 00072', '02 14 18 39 45', '31-spb-2', 3),
  ( 3, 'L''arche de Chloé', 'C. Pagrav', '145 avenue Eblé', 'Limoges', '87000', 'France', '722 344 180 00070', '01 59 64 14 15', '87-l-arche-de-chloe-3', 4)
;

INSERT INTO "famille"
  ("id", "nom", "telephone", "rue", "commune", "code_postal", "pays", "hebergement", "utilisateur_id")
VALUES 
  ( 1, 'Lopez', '02 48 37 14 15', '1 Place de la gare', 'Argelès', '66008', 'France', 'Maison', 2),
  ( 2, 'Martin', '04 24 32 78 46', '63, rue d''Avron', 'Clermont-Ferrand', '63113', 'France', 'Appartement', 5),
  ( 3, 'Chatmere', '03 28 56 89 45', '5 impasse de la tour', 'Niort', '79191', 'France', 'Maison', 6),
  ( 4, 'Zébulon', '06 01 45 59 56', '27 boulevard Colle', 'Metz', '57463', 'France', 'Maison', 7)
;

INSERT INTO "espece"
  ("id", "nom" )
VALUES
  (1, 'Chat' ),
  (2, 'Chien'),
  (3, 'Ornithorynque'),
  (4, 'Capybara'),
  (5, 'Champignon'),
  (6, 'Mystère'),
  (7, 'Oiseau'),
  (8, 'Reptile'),
  (9, 'Amphibien'),
  (10, 'Rongeur')
;

INSERT INTO "animal"
  ("id", "nom", "race", "couleur", "age", "sexe", "description", "statut", "slug", "association_id", "espece_id")
VALUES
  (2, 'Choupette', 'Siamois', 'Blanc',20,'Femelle','une petit choupette','En refuge','chat-choupette-2',1,1),
  (3, 'Léon', 'Bengal', 'Tigré',4,'Mâle','le professionnel','En refuge','chat-leon-3',1,1),
  (4, 'Boubou', 'Ragdoll', 'Crème',8,'Mâle','une boule de poils pleine de vie','En refuge','chat-boubou-4',1,1),
  (5, 'Pipou', 'Perruche', 'Bleu', 3,'Femelle','adore Earth, Wind & Fire','En refuge','oiseau-pipou-5',1,7),
  (6, 'Snoop', 'Chihuahua', 'Jaunâtre', 20,'Mâle','un chien très calme','En refuge','chien-snoop-6',1,2),
  (7, 'Capy','','Marron',5,'Inconnu','Cool Raoul','En refuge','capybare-capy-7',1,4),
  (8, 'Fun-Guy', 'Bolet', 'Blanc Gris',340,'Inconnu','Il porte des lunettes de soleil','En refuge','champignon-fun-guy-8',1,5),
  (9, 'Médor', 'Jack-russell', 'blanc et noir',4,'Mâle','Un ptit chien','Adopté','chien-medor-9',2,2),
  (10, 'Médou', 'Bichon frisé', 'blanc',1,'Mâle','Un jeune chien','Adopté','chien-medou-10',3,2),
  (11, 'Philippe', 'Corgi', 'Orange', 1,'Mâle','Un tout p''tit chien','Adopté','chien-philippe-11',2,2)
;

INSERT INTO "animal"
  ("id", "nom", "race", "couleur", "age", "sexe", "description", "statut", "slug", "association_id", "espece_id","famille_id")
  VALUES
  (1, 'Hades', 'Angora', 'Noir', 4, 'Mâle', 'Un bon gros chat', 'Accueilli', 'chat-hades-1', 1, 1, 1),
  (12, 'Ivan', 'Chat', 'Orange', 7, 'Mâle', 'C''est probablement un chat', 'Accueilli', 'chat-ivan-12', 1, 1, 2),
  (13, 'Princesse', 'Européen', 'Calico', 11, 'Femelle', 'Un peu craintive', 'Accueilli', 'chat-princesse-13', 1, 1, 1)
;

INSERT INTO "demande"
  ("id","famille_id","animal_id","statut_demande","date_debut","date_fin")
  VALUES
  (1,1,2,'En attente', TO_DATE('01/01/2000','DD/MM/YYYY'),TO_DATE('30/01/2010','DD/MM/YYYY')),
  (2,1,3,'En attente', TO_DATE('01/01/2000','DD/MM/YYYY'),TO_DATE('30/01/2010','DD/MM/YYYY')),
  (3,1,5,'En attente', TO_DATE('01/01/2000','DD/MM/YYYY'),TO_DATE('30/01/2010','DD/MM/YYYY')),
  (4,3,8,'En attente', TO_DATE('01/01/2000','DD/MM/YYYY'),TO_DATE('30/01/2010','DD/MM/YYYY')),
  (5,2,3,'En attente', TO_DATE('01/01/2000','DD/MM/YYYY'),TO_DATE('30/01/2010','DD/MM/YYYY')),
  (6,3,3,'En attente', TO_DATE('01/01/2000','DD/MM/YYYY'),TO_DATE('30/01/2010','DD/MM/YYYY')),
  (7,4,3,'En attente', TO_DATE('01/01/2000','DD/MM/YYYY'),TO_DATE('30/01/2010','DD/MM/YYYY')),
  (8,4,8,'En attente', TO_DATE('01/01/2000','DD/MM/YYYY'),TO_DATE('30/01/2010','DD/MM/YYYY'))
  ;

INSERT INTO "media"
  ("id", "url", "ordre", "animal_id", "association_id")
VALUES
  ( 1, '/images/animaux/Hades.webp', 1, 1, NULL ),
  ( 2, '/images/animaux/PFC.webp', 1, NULL, 1),
  ( 3, '/images/animaux/Siam.webp', 1, 2, NULL ),
  ( 4, '/images/animaux/Eurochat.webp', 1, 3, NULL ),
  ( 5, '/images/animaux/Challonge.webp', 1, 4, NULL ),
  ( 9, '/images/animaux/Perruche.webp', 1, 5, NULL ),
  ( 10, '/images/animaux/Capy.webp', 1, 7, NULL ),
  ( 11, '/images/animaux/Champi.webp', 1, 8, NULL ),
  ( 12, '/images/animaux/Jack.webp', 1, 9, NULL ),
  ( 13, '/images/animaux/Chiot.webp', 1, 10, NULL ),
  ( 14, '/images/animaux/Corgi.webp', 1, 11, NULL ),
  ( 15, '/images/animaux/Snoop.webp', 1, 6, NULL ),
  ( 16, '/images/animaux/Roux.webp', 1, 12, NULL ),
  ( 17, '/images/animaux/Calico.webp', 1, 13, NULL ),
  ( 18, '/images/animaux/PFC.webp', 1, NULL, 2 ),
  ( 19, '/images/animaux/PFC.webp', 1, NULL, 3 )
;

INSERT INTO "tag"
  ("id", "nom", "description")
VALUES
  ( 1,'Besoin spécifiques', 'Nécessite des ajustements particuliers'),
  ( 2,'Hargneux', 'Très méchant'),
  ( 3,'Propre', 'Super propre, va aux toilettes tout seul'),
  ( 4,'Mystique', 'Possède des pouvoirs psys !'),
  ( 5,'Maudit', 'Nécessite des ajustements particuliers')
;

INSERT INTO "animal_tag"
  ("id","animal_id","tag_id")
VALUES 
  (1,1,1),
  (2,8,5),
  (3,8,4),
  (4,8,3),
  (5,2,2),
  (6,3,4)
  ;

SELECT
    setval(
        'utilisateur_id_seq',
        (
            SELECT
                MAX(id)
            from
                "utilisateur"
        )
    );

SELECT
    setval(
        'association_id_seq',
        (
            SELECT
                MAX(id)
            from
                "association"
        )
    );

SELECT
    setval(
        'famille_id_seq',
        (
            SELECT
                MAX(id)
            from
                "famille"
        )
    );

SELECT
    setval(
        'espece_id_seq',
        (
            SELECT
                MAX(id)
            from
                "espece"
        )
    );

SELECT
    setval(
        'animal_id_seq',
        (
            SELECT
                MAX(id)
            from
                "animal"
        )
    );

SELECT
    setval(
        'media_id_seq',
        (
            SELECT
                MAX(id)
            from
                "media"
        )
    );


SELECT
    setval(
        'tag_id_seq',
        (
            SELECT
                MAX(id)
            from
                "tag"
        )
    );

SELECT
    setval(
        'animal_tag_id_seq',
        (
            SELECT
                MAX(id)
            from
                "animal_tag"
        )
    );

SELECT
    setval(
        'demande_id_seq',
        (
            SELECT
                MAX(id)
            from
                "demande"
        )
    );

COMMIT;