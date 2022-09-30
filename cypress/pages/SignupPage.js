

class SignupPage {

    go() {
        cy.viewport(1440,900)
        cy.visit('https://buger-eats-qa.vercel.app')

        // -- Clicar no botão para se cadastrar.
        // -- Validar a nova pagina com o texto Cadastre-se para  fazer entregas.
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }


    fillForm(entregador) {

        // -- Preenchimendo dos dados pessoais do entregador.
        cy.get('input[name="fullName"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        // -- Preenchimento do CEP e buscando o endereço.
        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type="Button"][value="Buscar CEP"]').click()

        // -- Preenchimento do campo numero e complemento.
        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)


        // -- Validar se o endereço está correto de acordo com a massa de dados.
        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        // -- Clicar no campo Metodo de entrega de acordo com a massa de dado.
        cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        // -- Inserir uma imagem na CNH digital.
        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)

    }

    submit() {
        //clicar em Cadastrar para fazer entregas
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }


    alertMessageShouldBe(expectedMessage) {
        // -- Validar a mensagem de CPF errado.
        //cy.get('span.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

}

export default new SignupPage;