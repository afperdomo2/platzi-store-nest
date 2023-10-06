pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh "docker --version"
                sh "docker-compose --version"
                sh "docker-compose down -v"
                sh "docker-compose up"
            }
        }
    }
}