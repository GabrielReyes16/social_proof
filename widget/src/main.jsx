import { render } from 'preact';
import { App } from './app';
import './index.css';

function initWidget() {
    const targets = document.querySelectorAll('.social-proof-widget');

    targets.forEach(target => {
        const userId = target.getAttribute('data-user-id');

        if (userId) {
            render(<App userId={userId} />, target);
        }
    });
}

initWidget();
window.initSocialProofWidget = initWidget;