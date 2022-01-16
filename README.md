# Come eseguire il progetto #

1. Inserire il file .env nella root di questo progetto.
2. Lanciare il comando docker-compose up
3. Da browser collegarsi a localhost:8080 ed eseguire l'accesso come root (la password si trova all'interno del file .env)
4. Importare create-user.sql
5. Effettuare il logout e loggarsi come nodeclient (la password si trova sempre all'interno del file .env)
6. Importare schema.sql
7. Da terminale eseguire i seguenti comandi
    - npm install
    - npm run build
    - npm start
8. Clonare il progetto https://bitbucket.org/Bl00dyShark/image-resizing/src/main/
9. Aggiungere il file .env alla root del progetto
10.  Eseguire
    - npm install
    - npm run build
    - npm start

# API # 

1. Post Instant:
    - localhost:3000/instant
    - body (con il campo file si intende di allegare un file):
        {
            height:123
            latitude:111.12345
            longitude:90.12345
            user:1333
            width:100
            weight:150
            file:tree.jpg

        }

2. Get all instants: 
    - localhost:3000/instants

3. Get instant by id:                
    - localhost:3000/instant?id=16

# Test #
Per eseguire i test è necessario che nella cartella downloads sia presente un'immagine chiamata tree.png e assicurarsi che sia in esecuzione solamente backend-instants, successivamente si puuò lanciare il comando 
    npm run test



