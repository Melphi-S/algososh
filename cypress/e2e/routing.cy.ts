describe('App', () => {
    it('should start', function () {
        cy.visit('/');
    });


    it('should open all pages', function () {
        const pages = ['recursion', 'fibonacci', 'sorting', 'stack', 'queue', 'list'];

        cy.visit('/');

        pages.forEach(page => {
            cy.get(`a[href*="${page}"]`).click()
            cy.get(`[data-testid="${page}"]`).should('exist')
            cy.go('back')
        })
    });
})