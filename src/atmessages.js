//Global definitions
/* 
   Solicited messages 
   Example: 22*012**000*C*C01
*/

const solicitedMsgStructure = [
  { field: "messageClass", description: "Message class and sub-class" },
  { field: "atmCode", description: "Logical unit number" },
  { field: "reserved", description: "Reserved" },
  { field: "timeVariant", description: "Time variant number" },
  {
    field: "statusDescriptor",
    description: "Status descriptor",
    "8": { error: "Device fault" },
    "9": { error: "Ready" },
    "A": { error: "Command reject" },
    "B": { error: "Ready" },
    "C": { error: "Specific command reject" },
    "F": { error: "Terminal state" }
  },
  {
    field: "statusInformation",
    description: "Status information",
    "C": {
      "1": "MAC Failure",
      "2": "Time Variant Number Failure",
      "3": "Security Terminal Number Mismatch",
      "A01": "Message Format error: Message length error",
      "B02": "Field Value error: Illegal Message Class",
      "C01": "Illegal Message type for current mode: Message type only accepted while SST is In-Service",
      "C02": "Illegal Message type for current mode: Message not accepted while diagnostics is in progress"
    },
  }
];

//Functions
export function parseMessage(btn) {
  btn.addEventListener("click", () => {    // Get message
    const msg = document.querySelector("#input").value;
    // Split messages by field separator
    const msgBlock = msg.split("*");
    // Get message type
    const msgType = msgBlock[0].trim(); // 22, 11, 4
    // Process message type
    switch (msgType) {
      case "22":
        solicitedStatusMessages(msgBlock);
        break;
      case "11":
        console.log("is a transaction request");
        break;
      case "4":
        console.log("is a transaction reply");
        break;
      default:
        console.log("is a default message");
    }
  });
}

function solicitedStatusMessages(message) {
  // HTML output ID
  const output = document.querySelector("#output");
  output.innerHTML = "";

  //  22*010**000*C*C01
  for (let i = 0; i < message.length; i++) {
    let element = message[i];  // Get message
    let fieldStructure = solicitedMsgStructure[i]; //Get data from JSON

    if (!element) element = 'Empty';

    // Specific command reject
    let statusMessage;
    if (element === 'C' || element === '8' || element === 'F') {
      statusMessage = fieldStructure[element].error;
    }

    // 
    const err = fieldStructure['C'];
    console.log("err ", err);

    let result = `<p> <strong>${element}</strong> -> ${fieldStructure.description} - ${statusMessage || ''}</p>`;
    output.innerHTML += result;
  }
}
