node {
    checkout scm
    def remote = [:]
    remote.name = '129.28.183.129'
    remote.host = '129.28.183.129'
    remote.port = 65500
    remote.allowAnyHosts = true
    remote.timeoutSec = 60  
    remote.retryCount = 3
    withCredentials([usernamePassword(credentialsId: '06416c52-21b1-4ea3-a6a9-8880a932ccf9', passwordVariable: 'password', usernameVariable: 'username')]) {
        remote.user = username
        remote.password = password
        stage('Build') { 
         sshCommand remote: remote, command: ". ~/.nvm/nvm.sh \
         && nvm use v10.15.3 \
         && cd /var/jenkins_node/workspace/create-react-app-typescript-itinerary \
         && npm install \
         && npm run build \
         && cp -r ./build/* ~/web/itinerary/front-end/"
        }
        stage('Test') { 
            echo 'test is running' 
            echo 'test is finished' 
        }
        stage('Deploy') { 
            sshCommand remote: remote, command: "docker stop itinerary-createreactapp-docker-container || true \
            && docker rm itinerary-createreactapp-docker-container || true \
            && cd ~/web/itinerary \
            && docker build --rm --no-cache=true -t itinerary-createreactapp-docker-image -f ~/web/itinerary/Dockerfile . \
            && docker rmi \$(docker images -f 'dangling=true' -q) \
            && docker run -d --name itinerary-createreactapp-docker-container -p 3333:3333 itinerary-createreactapp-docker-image"
        }
    }  
}