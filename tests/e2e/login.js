import {onBeforeLoad} from './support/mock_chrome.js';
import { prepare,prepareEncryptedPrivateKey,ACCOUNT_PASSWORD } from './utils';

export const login = (customState) => {

    const state = prepareEncryptedPrivateKey(customState);
    cy
      .visit('/popup/popup.html',{onBeforeLoad:(contentWindow) => { onBeforeLoad(contentWindow,'account') }})
      .get('input[type=password]').type(ACCOUNT_PASSWORD)
      .get('button')
      .contains('Login')
      .click()
      
      .wait(2000)
      .get('.ae-card')
      .should('be.visible')
      .get('.ae-header')
      .should('have.class','logged');
    return state;
};

export const loginAndLogout = () => {
    login();
    cy
    .visit("popup/popup.html",{onBeforeLoad})
    .get('#settings')
    .click()
    .get('.dropdown-holder')
    .should('be.visible')
    .get('.dropdown-holder .toLogout')
    .click()
    .get('input[type="password"]')
    .should('be.visible')
    .get('button')
    .contains('Login')
    .should('be.visible')
    .get('input[type="password"]')
    .type("1234")
    .get('.ae-loader')
    .should('be.visible')
    .get('.ae-toolbar')
    .should('be.visible')
    .get('input[type="passwrod"]')
    .clear()
    .type(ACCOUNT_PASSWORD);
}