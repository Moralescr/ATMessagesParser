import "./style.css";
import { parseMessage } from "./atmessages.js";

document.querySelector("#app").innerHTML = `
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Mensajes de Cajeros Automáticos</h1>
        <p class="text-gray-600">Parser de mensajes ATM</p>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Input Section -->
        <div class="mb-6">
          <label for="input" class="block text-sm font-medium text-gray-700 mb-2">
            Mensaje del ATM
          </label>
          <textarea 
            id="input" 
            class="w-full px-4 py-3 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
            rows="4"
            placeholder="Ej: 22*012**000*C*C01"
          >22*012**000*C*C01</textarea>
        </div>
        
        <!-- Button -->
        <div class="mb-6">
          <button 
            id="btn" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            type="button"
          >
            Analizar Mensaje
          </button>
        </div>

        <!-- Output Section -->
        <div class="border-t pt-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Resultados</h2>
          <div id="output" class="space-y-2 text-sm text-gray-600">
            <p class="text-gray-400 italic">Esperando mensaje para analizar...</p>
          </div>
        </div>
      </div>

      <!-- Info Footer -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <p>Formatos soportados: 22 (estado), 11 (transacción), 4 (respuesta)</p>
      </div>
    </div>
  </div>
`;

const buttonEvent = document.querySelector("#btn");
parseMessage(buttonEvent);
