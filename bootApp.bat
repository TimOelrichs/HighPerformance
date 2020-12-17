
start "mongodb" mongod
cd backend && start "backend" npm run start
cd ..
cd client && start "client" ng serve
cd ..