import copy from './modules/copy';
import emojis from './modules/emojis';
import { animateButton, handleSubmit } from './modules/form';
import theming from './modules/theming';

copy();
emojis();
theming();

const button = document.getElementById("say-hi");
if (button) button.addEventListener('click', animateButton, false);

const form = document.querySelector("form");
if (form) form.addEventListener("submit", handleSubmit);