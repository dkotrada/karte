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
- https://docs.mongodb.com/getting-started/shell/import-data/
- `mongoimport --db karte_db --collection people --drop --file DATABASE_SEED.json --jsonArray`

### Verzeichnis für MongoDB angeben
- Neues kommando vor dem Start `mongod --dbpath mongodb/` im extra terminal


## Mongoose
Mongoose ist ein ODM Objekt-Datenbank-Management-System für Node.js

http://mongoosejs.com/

## Design mit Bootstrap Framework
Bootstrap ist ein Open-Source-Toolkit zur Entwicklung responsiver Designs mit HTML, CSS und JS.

http://getbootstrap.com/


# Dokumentation Quellcode des Projekts

Die Dokumentation ist in den Kommentaren im Quellcode nachzulesen.

