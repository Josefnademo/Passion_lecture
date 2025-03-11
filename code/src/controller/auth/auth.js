//les imports
import jwt from "jsonwebtoken";
import { privateKey } from "./private_key.js";

//déclaration de la fonction auth qui va permettre de vérifier le token donné par l'utilisateur avant de laisser une requête s'executer avec la fonction next();
const auth = (req, res, next) => {
  //place le Bearer +token fourni dans le header de la requête
  const authorizationHeader = req.headers.authorization;
  //si pas de Bearer, génére une erreur
  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    //retourne une erreur 401 avec un message indiquant que l'utilisateur n'a pas fourni de jeton d'authentification
    return res.status(401).json({ message });
  }
  //si il y a un Bearer, vérifie qu'il corresponde au token d'un user déja contenu dans la db
  else {
    //prends juste le token et pas le mot "Bearer" contenu dans le header
    const token = authorizationHeader.split(" ")[1];
    //vérifie la validité du token + la privatekey et les place dans la variable decodedTocken qu'elle va utiliser pour détérminer si le user n'a pas donné le bon nom ou le bon mdp ou si il y a une erreur
    jwt.verify(token, privateKey, (error, decodedToken) => {
      //si une erreur survient, renvoie une erreur 401 et indique que l'utilisateur n'a pas le droit d'accéder à une certaine ressource
      if (error) {
        const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
        return res.status(401).json({ message, data: error });
      }

      //vérifie que la requête ne comprenne pas de userId ou que ce userId ne corresponde pas à celui du token et si c'est le cas, renvoie une erreur d'Invalid User
      if (req.body.userId && req.body.userId !== decodedToken.userId) {
        const message = `L'identifiant de l'utisateur est invalide`;
        return res.status(401).json({ message });
      } else {
        //continue la requête qui a lancé la vérification car la vérification est passée
        next();
      }
    });
  }
};
export { auth };
