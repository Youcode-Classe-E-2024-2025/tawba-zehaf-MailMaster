# 📧 MailMaster API

MailMaster est une API RESTful développée avec Laravel, permettant de gérer des campagnes d'emailing sans passer par un service externe comme Mailchimp. Cette solution comprend la gestion des abonnés, des newsletters, des campagnes, et des statistiques de lecture.

---

## 🚀 Fonctionnalités

- **Gestion des Newsletters** : Créez, lisez, mettez à jour et supprimez des newsletters.
- **Gestion des Abonnés** : Gérez les abonnés avec des fonctionnalités comme l'inscription et la désinscription.
- **Gestion des Campagnes** : Associez des newsletters à des campagnes et suivez leur envoi.
- **API RESTful** : Toutes les fonctionnalités sont accessibles via des endpoints API.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- PHP >= 8.1
- Composer
- MySQL ou un autre système de gestion de base de données compatible
- Node.js et npm (pour gérer les dépendances front-end si nécessaire)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Youcode-Classe-E-2024-2025/tawba-zehaf-MailMaster.git
   cd mailmaster
2. Installez les dépendances PHP :
composer install
3. Configurez le fichier .env : Copiez le fichier .env.example en .env et configurez vos paramètres de base de données et autres variables d'environnement.
4. Générez la clé de l'application :
php artisan key:generate
5. Exécutez les migrations pour créer les tables nécessaires :
php artisan migrate
6. (Optionnel) Installez les dépendances front-end :
npm install && npm run dev
7. Lancez le serveur de développement :
php artisan serve
L'application sera accessible à l'adresse http://localhost:8000.


 ## 🔐 Authentification
Le projet utilise Laravel Sanctum pour gérer l’authentification API.

Endpoints disponibles :
POST /api/register — Inscription

POST /api/login — Connexion

GET /api/user — Infos utilisateur connecté (token requis)

 ## 📘 Documentation API
La documentation interactive est générée automatiquement avec Scribe.

Pour générer la doc :

bash
Copy
Edit
php artisan scribe:generate
Puis accès à :
http://localhost:8000/docs

✅ Stack Technique
PHP 8.2+

Laravel 11.x

Sanctum (auth API)

Scribe (doc API)

MySQL

##  📁 Structure prévue
app/Models : Entités principales (User, Newsletter, Subscriber, Campaign)

app/Http/Controllers : Contrôleurs API REST

routes/api.php : Routes de l’API

docs/ : Documentation générée

 ## 🔧 À venir
Envoi réel d’e-mails via Mailgun ou SendGrid

Statistiques de lecture (taux d’ouverture, clics)

Gestion de listes de diffusion personnalisées

Dashboard admin en React

## 🤝 Contribuer
Les contributions sont les bienvenues ! Crée une issue ou envoie une Pull Request 🚀

## 📝 Licence
Ce projet est sous licence MIT.




