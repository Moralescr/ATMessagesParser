import "./style.css";
import { parseMessage } from "./atmessages.js";

document.querySelector("#app").innerHTML = `
  <div>
    <h1 class="mt-4 ml-4 font-bold">Mensajes de cajeros automáticos</h1>
    <textarea id="input" class="ml-4 text-sm bg-gray-300 rounded"> </textarea>
    <div class="">
      <button id="btn" class="ml-4 pl-1 pr-1 bg-blue-400 hover:bg-blue-500 rounded" type="button">Boton</button>
    </div>
    <div id="output" class="ml-4"></div>
  </div>
`;

const buttonEvent = document.querySelector("#btn");
parseMessage(buttonEvent);
