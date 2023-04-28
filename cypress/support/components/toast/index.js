import { el } from './elements'

class Toast {

    shouldHavetext(expectText) {
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }
}

export default new Toast()