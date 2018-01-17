# Grundlagen der Webtechnologie

WS 17/18

## Projekt Karte
Kundenkartenverwaltungssystem

### Motivation
Ein Unternehmer z.B. Herr Feldherr möchte die Kundenbindung an sein Unternehmen erweitern und braucht dazu ein Kundenkartenverwaltungssystem.
Das System soll als eine Webseite erstellt werden. Ein Kunde z.B Herr Kunz, soll eine Möglichkeiten haben 
eine Kundenkarte zu beantragen, die Kartenpin zu ändern und die gespeicherten Kundendaten anzusehen. 
Herr Feldherr möchte die vorhandenen Kundendaten in das System übernehmen können. 
Herr Feldherr benötig für die Verwaltung der Karten einen geschützten Bereich.

### Implementierung
Das System ist als eine Webseite mit dem Datenbanksystem realisiert. Die Weboberfläche ist responsive. 
Daher ist die Benutzerfreundlich für mobile Geräte. Die Bedienung der Funktionen geschieht über das obere Menü.
Die erste Seite ist ein Webformular. Es gibt eine Seite für den Kunden, erreichbar über das Menü `Kunde`. 
Verwaltungsseiten sind über die Menüpunkte `Login`, `Abmelden`, `Adminin` und `Personen` erreichbar.
Herr Feldherr kann alle Kunden anschauen, PIN für die Person neu generieren, einzelne Personen löschen,
das gesamte Datenbestand löschen und die Datenbank mit Kunden aus einer Datei neu befüllen.

# Erste Schritte mit dem Projekt `karte`

## Benötigte Software (Windows und Ubuntu)

- YARN: https://yarnpkg.com/lang/en/
- NodeJS: https://nodejs.org/en/
- MongoDB: https://www.mongodb.com/download-center#community

## Projekt Quellcode herunterladen

- https://github.com/dkotrada/karte/archive/master.zip
- Nach dem entpacken: `cd karte-master`

##  Projekt initialisieren und Starten

1. in der konsole: `yarn` (Initialisieren)
2. in einer anderen Konsole: `mongod --dbpath mongodb` (Datenbankspeicherort angeben)
3. in der konsole: `yarn start` (Applikation starten)
4. Browser öffnen: `http://localhost:3131` alternativ `127.0.0.1:3113`


# Allgemeine Informationen zu benutzten Technologien

NodeJS Application mit Express, Bootstrap, MongoDB und Mongoose


## Node.js
Node.js ist ein in C++ geschriebene Laufzeitumgebung für Chrome V8 JavaScript Maschine. Es erlaubt den JavaScript Programmierern serverseitige Programme zu schreiben. Durch ereignisgesteuertes nicht blockierendes Eingabe/Ausgabe Model ist Node.js effizient und ressourcenschonend. Das npm Ökosystem von Node.js ist das größte Ökosystem von Open Source Bibliotheken in der Welt.

https://nodejs.org/de/

# Node.js Module
Die Projekte auf der Basis des Node.js sind modular aufgebaut. So übernimmt jedes Modul eine Bestimmte aufgabe.
Zum Beispiel Rendern der Templates oder verwalten von Cookies. Im weiteren werden die im Projekt eingesetzten Module
kurz beschreiben.

## Express.js
Express ist ein schnelles, offenes, unkompliziertes Web-Framework für Node.js.
http://expressjs.com/de/


## MongoDB
Eine der Führenden NoSQL Datenbanken. Ist eine Allzweckdatenbank mit offenem Quellcode. Sie hat u.a. folgende Merkmale:
- Dokumentdatenmodell mit dynamischen Schemata
- Umfassende, flexible Indexunterstützung und mächtige Abfragen
- Aggregation-Framework und MapReduce
- Auto-Sharding für horizontale Skalierbarkeit
- Eingebaute Replikation für Hochverfügbarkeit
- Textsuche
- Erweiterte Sicherheit (z.B. Kerberos Unterstützung)
- Speicherung großer Dateien mit GridFS

https://www.mongodb.com/de

### MongoDB Installation
Um MongoDB zu installieren einfach den Anleitungen auf den folgenden Webseiten folgen:
- https://docs.mongodb.com/manual/administration/install-community/
- https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

### Mongo Consolen Bedienung
- https://docs.mongodb.com/manual/reference/mongo-shell/
- Shell starten: `mongo --shell`
- Zeige Datenbanken: `show dbs`
- Auswählen des Datenbankes: `use databasename`
- Kollektionen anzeigen: `show collections` oder `show tables`
- Inhalt aller Daten in der Kollektion anzeigen: `db.collectioname.find()`
- Gesamten Inhalt aus der Kollektion entfernen: `db.collectionname.remove({})` https://docs.mongodb.com/getting-started/shell/remove/

### MongoDB befüllen des Datenbanks mit Beispieldaten
- Dokument: `karte_db`
- Kollektion: `people`
- `mongoimport --db karte_db --collection people --drop --file DATABASE_SEED.json --jsonArray`
- https://docs.mongodb.com/getting-started/shell/import-data/

### Verzeichnis für MongoDB angeben
- Ein extra Terminalfenster öffnen und folgendes Kommando ausführen: `mongod --dbpath mongodb/`


## Mongoose
Mongoose ist ein ODM Objekt-Datenbank-Management-System für Node.js. Erlaubt uns das Arbeiten mit der MongoDB.

http://mongoosejs.com/

## Hilfsmodule

- body-parser.js (Anfragebody verarbeiten)
- cookie-parser.js  (Cookies verarbeiten)
- cookie-session.js (Sessionen verarbeiten)
- path.js   (Pfade im Projekt setzen)
- shelljs.js    (Ausführen der Schellbefehle)

## Design mit Bootstrap Framework
Bootstrap ist ein Open-Source-Toolkit zur Entwicklung responsiver Designs mit HTML, CSS und JS.

http://getbootstrap.com/


# Projekterstelung und Entwicklung

Um das Projekt zu Kompilieren und den Entwickler zu unterstützen werden zusätzliche
Module eingesetzt. Diese sind in der Datei `packages.json` im Bereich `devDependencies`
aufgeführt.

## Babeljs Kompiler
Ermöglicht das Benutzen von Ecma Script 2015 im Projekt.

## Yarn
Manager der Node.js Module, initialisieren des Projekts und starten des Servers.

## Nodemon
Überwachung der Änderungen des Quellcodes und automatisches Recompilieren 
der Quelldateien.


# Eigen erstellte Module

- dbcontroller.js
- personcontroller.js
- routescontroller.js
- config.js


# Dokumentation Quellcode des Projekts

Die Dokumentation zur Quellcode ist in den Kommentaren in den jeweiligen Dateien nachzulesen.

## Datenbank Eintrag Beispiel


```json
  {
    "title": "Dr.",
    "name": "Jung",
    "vorname": "Julia",
    "strasse": "Verwalter",
    "hausnummer": "33",
    "stadt": "Superstadt",
    "postleitzahl": "37877",
    "telefon": "5572136578",
    "email": "julia@karte.de",
    "card": {
      "pin": 0,
      "uuid": 123456
    }
  }
```

## Projektstruktur nach der Installation

- **mongodb** (Ordner für die Dokumentendatenbank)
- **node_modules** (NodeJS notwendige Module "Bibliotheken")
- **server** (Applikationsquellcode, Logik, Design)
    - **controller** (MVC Applikationslogik)
    - **model** (MVC Datenbank)
    - **public** (Statische Dateien)
    - **views** (MVC Darstellung)
        - **pages** (Templates für die einzelne Seiten)
        - **partials** (Template Blöcke für Wiederverwendung)
    - **config.js** ( Port und Host Einstellungen )
    - **index.js** ( Applikationseinstiegspunkt )
- **.babelrc** (Konfiguration für den Babeljs Kompiler "es2015")
- **.gitignore** (Versionsverwaltungsdatei für das GIT Repositorium)
- **DATABASE_SEED.json** (Beispieldaten für den Datenbank)
- **package.json** (Projektkonfigurationsdatei)
- **README.md** (Information zum Projekt)
- **yarn.lock** (Persistieren der Modulabhängigkeiten für das Projekt "karte")