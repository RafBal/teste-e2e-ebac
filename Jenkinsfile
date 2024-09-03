pipeline {
    agent any

    stages {
        stage('Clonar o reposiório') {
            steps {
                git branch: 'main', url: 'https://github.com/RafBal/teste-api-ebac.git'
            }
        }
        stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }
        stage('Executar Testes') {
            steps {
                bat '''set NO_COLOR=1 
npm run cy:run'''
            }
        }
    }
}