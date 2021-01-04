# Semesterproject WiSe 2020 Integration Archtecture Hochschule Bonn Rhein-Sieg

Team: Tim Oelrichs, Max Höfer

Assignment No. 4.2

Für die Systeme openCRX und OrangeHRM haben wir Services erstellt, welche auf die vorhandenen REST-APIs mittels axios zugreifen.

Ist bei Start des Servers die MongoDB leer, werden über die Services die Daten automatisch importiert und in der MongoDB gespeichert. Bitte vorab sicherstellen, dass eine Verbindung zu den H-BRS-Systemen, z.B. über VPN, möglich ist.

Des Weiteren werden die Services wie folgt genutzt:

1.  über den Endpunkt POST /evaluationrecord/publish um das BonusSalary in OrangeHRM zu speichern (In Angular FrontEnd Angebunden)
2.  über den Endpoint GET /Sales um Sales aus openCRX neu abzufragen. (In Frontend wenn eine Perfomance Record mit FAB-Button manuell hinzugefügt wird)

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
