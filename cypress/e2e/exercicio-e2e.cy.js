/// <reference types="cypress" />
import produtosPage from "../support/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

     
const perfil = require('../fixtures/perfil.json')
const example = require('../fixtures/example.json')

  beforeEach(() => {
    // acessar a Loja EBAC 
    cy.visit('minha-conta')    
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      // Entrar na conta
    cy.fixture('perfil').then( dados => {
    cy.get('#username').type(dados.usuario, { log: false })
    cy.get('#password').type(dados.senha , { log: false })
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, aluno_ebac-7841 (não é aluno_ebac-7841? Sair)')
    })
      //fazer um pedido de 4 produtos
    cy.visit('produtos')
      
      for (let i = 0; i < 4; i++) {
      cy.fixture('produtos').then(dados => {          
         produtosPage.buscarProduto(dados[i].nomeProduto)
         produtosPage.addProdutoCarrinho(
            dados[i].tamanho, 
            dados[i].cor,
            dados[i].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[i].nomeProduto)
         
    })
    }
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()  
    //cy.visit('checkout')

//      Preenchendo todas opções no checkout
        cy.fixture('example').then( dados => {
        cy.get('#billing_first_name').clear().type(dados.nome, {log: true})
        cy.get('#billing_last_name').clear().type(dados.sobrenome, {log: true})
        cy.get('#billing_company').clear().type(dados.empresa, {log: true})
            // Selecionando o país.
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-search__field').type(dados.país, {log: true}).type('{enter}')
            // Continuando o preenchimento.
        cy.get('#billing_address_1').clear().type(dados.endereço1, {log: true})
        cy.get('#billing_address_2').clear().type(dados.endereço2, {log: true})
        cy.get('#billing_city').clear().type(dados.cidade, {log: true})
            // Selecionando o Estado.
        cy.get('#select2-billing_state-container').click()
        cy.get('.select2-search__field').type(dados.estado, {log: true}).type('{enter}')
            // Continuando o preenchimento.
        cy.get('#billing_postcode').clear().type(dados.cep, {log: true})
        cy.get('#billing_phone').clear().type(dados.telefone, {log: true})
        cy.get('#billing_email').clear().type(dados.email, {log: true})
        cy.get('#order_comments').clear().type(dados.info, {log: true})
        // Aceitando os termos
        cy.get('#terms').click()
        // forçando o carregamento:
        cy.get('#place_order').click({force: true})
        cy.get('.woocommerce-notice', { timeout: 10000 }).should('be.visible')
        // Validando o pedido:
        cy.get('.woocommerce-notice').should('have.text', 'Obrigado. Seu pedido foi recebido.')

    })
  });


})