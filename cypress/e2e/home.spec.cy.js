describe('home page', ()=>{
    it('App deve está online', ()=>{
        // A janela aberta deverá ter as dimensões de 1440/900
        cy.viewport(1440, 900)
        //Deverá visitar o site "https://buger-eats.vercel.app"
        cy.visit('https://buger-eats.vercel.app')
        //Deverá Validar se a aplicação está online buscando o texto abaixo.
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    })
})