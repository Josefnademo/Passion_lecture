CREATE TABLE t_utilisateur(
   utilisateur_id INT AUTO_INCREMENT,
   hashed_password VARCHAR(500) NOT NULL,
   username VARCHAR(50) NOT NULL,
   date_creation DATETIME NOT NULL,
   is_admin BOOLEAN NOT NULL,
   PRIMARY KEY(utilisateur_id),
   UNIQUE(hashed_password),
   UNIQUE(username)
);

CREATE TABLE t_ecrivain(
   ecrivain_id INT AUTO_INCREMENT,
   prenom VARCHAR(30),
   nom_de_famille VARCHAR(30),
   PRIMARY KEY(ecrivain_id)
);

CREATE TABLE t_categorie(
   categorie_id INT AUTO_INCREMENT,
   nom VARCHAR(50) NOT NULL,
   PRIMARY KEY(categorie_id),
   UNIQUE(nom)
);

CREATE TABLE t_livre(
   livre_id INT AUTO_INCREMENT,
   titre VARCHAR(250) NOT NULL,
   annee_edition DATE,
   lien_image VARCHAR(150),
   lien_pdf VARCHAR(150),
   resume TEXT,
   editeur VARCHAR(50),
   nombre_de_page INT NOT NULL,
   utilisateur_fk INT NOT NULL,
   ecrivain_fk INT NOT NULL,
   categorie_fk INT NOT NULL,
   PRIMARY KEY(livre_id),
   UNIQUE(titre),
   UNIQUE(lien_pdf),
   FOREIGN KEY(utilisateur_fk) REFERENCES t_utilisateur(utilisateur_id),
   FOREIGN KEY(ecrivain_fk) REFERENCES t_ecrivain(ecrivain_id),
   FOREIGN KEY(categorie_fk) REFERENCES t_categorie(categorie_id)
);

CREATE TABLE t_evaluer(
   utilisateur_fk INT,
   livre_fk INT,
   commentaire VARCHAR(500),
   note VARCHAR(5),
   PRIMARY KEY(utilisateur_fk, livre_fk),
   FOREIGN KEY(utilisateur_fk) REFERENCES t_utilisateur(utilisateur_id),
   FOREIGN KEY(livre_fk) REFERENCES t_livre(livre_id)
);
