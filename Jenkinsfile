pipeline{
    agent any
    stages{
        stage('Build'){
            sh "docker-compose down -v"
            sh "docker-compose up"
        }
    }
}