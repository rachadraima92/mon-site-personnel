<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$serveur = "localhost";
$login = 'root';
$pass = '';

$nom = valid_donnees($_POST["nom"]);
$email = filter_var(valid_donnees($_POST["email"]), FILTER_VALIDATE_EMAIL);
$objet = valid_donnees($_POST["objet"]);
$note = valid_donnees($_POST["note"]);



function valid_donnees($donnees)
{
    $donnees = trim($donnees);
    $donnees = stripslashes($donnees);
    $donnees = htmlspecialchars($donnees);
    return $donnees;
}
// var_dump($email);
// var_dump($objet);
// var_dump($note);
// die();
if (
    !empty($nom) && strlen($nom) <= 20 && preg_match("#^[A-Za-z-]+$#", $nom) != false
    && !empty($email) && !empty($note) && strlen($note) <= 500
) {



    try {
        // Connexion à la base de données
        $connexion = new PDO("mysql:host=$serveur;dbname=abdev", $login, $pass);
        $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Insertion des données reçues
        $ajout = "INSERT INTO Visiteurs(nom, email, objet, note)
        VALUES(:nom, :email, :objet, :note)";

        $requete = $connexion->prepare($ajout);

        $requete->bindParam(":nom", $nom);
        $requete->bindParam(":email", $email);
        $requete->bindParam(":objet", $objet);
        $requete->bindParam(":note", $note);

        $requete->execute();

        // Redirection vers la page de remerciement
        header("Location: index.php");
    } catch (PDOException $e) {
        echo 'Erreur : ' . $e->getMessage();
    }
} else {
    header("Location: form_echec.php");
}
