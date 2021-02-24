# Semesterproject WiSe 2020 Integration Archtecture Hochschule Bonn Rhein-Sieg

Team: Tim Oelrichs, Max Höfer

Finale Abgabe

Für die Systeme openCRX und OrangeHRM haben wir Services erstellt, welche auf die vorhandenen REST-APIs mittels axios zugreifen.

Ist bei Start des Servers die MongoDB leer, werden über die Services die Daten automatisch importiert und in der MongoDB gespeichert. Bitte vorab sicherstellen, dass eine Verbindung zu den H-BRS-Systemen, z.B. über VPN, möglich ist.

Des Weiteren werden die Services wie folgt genutzt:

1.  über den Endpunkt POST /evaluationrecord/publish um das BonusSalary in OrangeHRM zu speichern (In Angular FrontEnd Angebunden)
2.  über den Endpoint GET /Sales um Sales aus openCRX neu abzufragen. (In Frontend wenn eine Perfomance Record mit FAB-Button manuell hinzugefügt wird)

Achtung: Die Employee Photos werden mit Pupetter gescrapt. Puppeter benötigt etwas Zeit bei npm install

Es wird eine User-DB mit User für die Salesmen, die HR-Mitarbeitern und dem CEO angelegt. Das Default-Password ist "password" und wird gehashed gespeichert.

Beispiel: Login Daten:

CEO
user: 98777
password: password

HR
user: 90133
passord: password

Bei dem Client handelt es sich um eine Angular App

Anwendung starten

```console
mongod
cd backend
npm install
npm run start
cd ..
cd client
npm install
ng serve
```
