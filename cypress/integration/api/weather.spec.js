/// <reference types="cypress" />

describe('Get weather', () => {
    it('Get current weather data for Campinas', () => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('url')}weather?q=${Cypress.env('location')}&appid=${Cypress.env('app_id')}`,
        }).then((response) => {
          console.log(response);
          expect(response.status).to.eq(200);
          expect(response.isOkStatusCode).to.eq(true);
        })
    })

    it('Get weather data for a Location invalid', () => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('url')}weather?q=Invalid&appid=${Cypress.env(
            'app_id'
          )}`,
          failOnStatusCode: false,
        }).then((response) => {
          console.log(response);
          expect(response.status).to.eq(404);
          expect(response.body.message).to.eq('city not found');
          expect(response.statusText).to.eq('Not Found');
        });
    });

    it('Get weather Unauthorized', () => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('url')}weather?q=${Cypress.env('location')}&appid=Invlaid`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body.message).to.eq(
            'Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.');
          expect(response.statusText).to.eq('Unauthorized');
        });
      });

    it('Get weather data without a location', () => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('url')}weather?&appid=${Cypress.env('app_id')}`,
          failOnStatusCode: false,
        }).then((response) => {
          console.log(response);
          expect(response.status).to.eq(400);
          expect(response.body.message).to.eq('Nothing to geocode');
          expect(response.statusText).to.eq('Bad Request');
        });
    });
})