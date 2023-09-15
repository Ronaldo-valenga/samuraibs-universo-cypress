

it('webapp deve estar online', function(){
    //um simples comentário dez
    cy.visit('/')

    cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')
})
