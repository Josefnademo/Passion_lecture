-- Inserting into t_utilisateur
INSERT INTO t_utilisateur (hashed_password, username, date_creation, is_admin) VALUES
('hashed_pass1', 'user1', '2025-02-26 10:00:00', false),
('hashed_pass2', 'user2', '2025-02-25 11:00:00', true),
('hashed_pass3', 'user3', '2025-02-24 12:00:00', false),
('hashed_pass4', 'user4', '2025-02-23 13:00:00', false),
('hashed_pass5', 'user5', '2025-02-22 14:00:00', true),
('hashed_pass6', 'user6', '2025-02-21 15:00:00', false),
('hashed_pass7', 'user7', '2025-02-20 16:00:00', true),
('hashed_pass8', 'user8', '2025-02-19 17:00:00', false),
('hashed_pass9', 'user9', '2025-02-18 18:00:00', false),
('hashed_pass10', 'user10', '2025-02-17 19:00:00', true);

-- Inserting into t_ecrivain
INSERT INTO t_ecrivain (prenom, nom_de_famille) VALUES
('J.K.', 'Rowling'),
('George', 'Orwell'),
('Mark', 'Twain'),
('F. Scott', 'Fitzgerald'),
('Hemingway', 'Ernest'),
('Jane', 'Austen'),
('Charles', 'Dickens'),
('Leo', 'Tolstoy'),
('Agatha', 'Christie'),
('J.R.R.', 'Tolkien');

-- Inserting into t_categorie
INSERT INTO t_categorie (nom) VALUES
('Fantasy'),
('Science Fiction'),
('Mystery'),
('Romance'),
('Historical'),
('Horror'),
('Thriller'),
('Adventure'),
('Biography'),
('Non-fiction');

-- Inserting into t_livre
INSERT INTO t_livre (titre, annee_edition, lien_image, lien_pdf, resume, editeur, nombre_de_page, utilisateur_fk, ecrivain_fk, categorie_fk) VALUES
('Harry Potter and the Sorcerer\'s Stone', '1997-06-26', 'image1.jpg', 'pdf1.pdf', 'A young boy discovers he is a wizard.', 'Bloomsbury', 320, 1, 1, 1),
('1984', '1949-06-08', 'image2.jpg', 'pdf2.pdf', 'A dystopian novel about totalitarianism.', 'Secker & Warburg', 328, 2, 2, 2),
('The Adventures of Tom Sawyer', '1876-01-01', 'image3.jpg', 'pdf3.pdf', 'A story about the adventures of a young boy in the 19th century.', 'American Publishing Company', 250, 3, 3, 3),
('The Great Gatsby', '1925-04-10', 'image4.jpg', 'pdf4.pdf', 'A story of the American dream and tragedy.', 'Charles Scribner\'s Sons', 180, 4, 4, 4),
('The Old Man and the Sea', '1952-09-01', 'image5.jpg', 'pdf5.pdf', 'A man struggles to catch a giant fish.', 'Charles Scribner\'s Sons', 127, 5, 5, 5),
('Pride and Prejudice', '1813-01-28', 'image6.jpg', 'pdf6.pdf', 'A romantic novel that critiques society.', 'T. Egerton', 279, 6, 6, 6),
('A Tale of Two Cities', '1859-04-30', 'image7.jpg', 'pdf7.pdf', 'A story set in London and Paris during the French Revolution.', 'Chapman & Hall', 341, 7, 7, 7),
('War and Peace', '1869-01-01', 'image8.jpg', 'pdf8.pdf', 'A historical novel set during the Napoleonic wars.', 'The Russian Messenger', 1225, 8, 8, 8),
('Murder on the Orient Express', '1934-01-01', 'image9.jpg', 'pdf9.pdf', 'A mystery novel set aboard the famous train.', 'Collins Crime Club', 265, 9, 9, 3),
('The Lord of the Rings: The Fellowship of the Ring', '1954-07-29', 'image10.jpg', 'pdf10.pdf', 'The first book in the epic fantasy series.', 'Allen & Unwin', 423, 10, 10, 1);

-- Inserting into t_evaluer
INSERT INTO t_evaluer (utilisateur_fk, livre_fk, commentaire, note) VALUES
(1, 1, 'Amazing story!', '5'),
(2, 2, 'A chilling portrayal of a dystopian future.', '4'),
(3, 3, 'A classic coming-of-age story.', '5'),
(4, 4, 'Beautifully tragic.', '5'),
(5, 5, 'A timeless masterpiece.', '5'),
(6, 6, 'Love the romance and wit.', '4'),
(7, 7, 'A great tale of sacrifice and revolution.', '4'),
(8, 8, 'Epic in scope and depth.', '5'),
(9, 9, 'Classic murder mystery, loved it.', '5'),
(10, 10, 'Incredible fantasy adventure.', '5');
