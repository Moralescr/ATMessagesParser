//Global definitions
const solicitedMsgStructure = [
  { description: "Message class and sub-class" },
  { description: "Logical unit number" },
  { description: "N/A" },
  { description: "Time variant number" },
  {
    description: "Status descriptor",
    status: {
      "8": "Device fault",
      "9": "Ready",
      "A": "Command reject",
      "B": "Ready",
      "C": "Specific command reject",
      "F": "Terminal state",
    },
  },
];

//Functions
export function parseMessage(btn) {
  btn.addEventListener("click", () => {
    // Get message
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
  // Get status descriptor field from message
  const statusDescriptor = message[4];
  // HTML render 
  for(let i = 0; i < message.length; i++){
    output.innerHTML += `<p>${message[i]} -> ${solicitedMsgStructure[i].description}</p>`;
  }
}
