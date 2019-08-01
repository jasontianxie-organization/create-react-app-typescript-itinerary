node {
    checkout scm
    def remote = [:]
    remote.name = '129.28.183.129'
    remote.host = '129.28.183.129'
    remote.user = 'root'
    remote.password = '1986TIGER_snake'
    remote.allowAnyHosts = true  
    stage('Build') { 
         sshCommand remote: remote, command: ". ~/.nvm/nvm.sh \
         && nvm use v10.15.3 \
         && cd /var/jenkins_node/workspace/create-react-app-typescript-itinerary \
         && npm install \
         && npm run build"
    }
    stage('Test') { 
        echo 'test is running' 
        echo 'test is finished' 
    }
    stage('Deploy') { 
         sshCommand remote: remote, command: "docker stop itinerary-createreactapp-docker-container || true \
         && docker rm itinerary-createreactapp-docker-container || true \
         && cd /var/jenkins_node/workspace/create-react-app-typescript-itinerary/build \
         && docker build --rm --no-cache=true -t itinerary-createreactapp-docker-image -f /var/jenkins_node/workspace/create-react-app-typescript-itinerary/build \
         && docker rmi \$(docker images -f \"dangling=true\" -q) \
         && docker run -d --name itinerary-createreactapp-docker-container -p 3333:3333 itinerary-createreactapp-docker-image"
    }
}