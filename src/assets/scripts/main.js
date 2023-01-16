import copy from './modules/copy';
import { animateButton, handleSubmit } from './modules/form';
import './modules/speedlify';

copy();

const button = document.getElementById("say-hi");
if (button) button.addEventListener('click', animateButton, false);

const form = document.querySelector("form");
if (form) form.addEventListener("submit", handleSubmit);