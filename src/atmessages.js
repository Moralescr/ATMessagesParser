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
    "C": {
      error: "Specific command reject",
      "01": "Message type only accepted while SST is In-Service",
      "02": "Message not accepted while diagnostics is in progress"
    },
    "F": { error: "Terminal state" }
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
  let statusMessage;
  message.forEach((element, index) => {
    const fieldStructure = solicitedMsgStructure[index]; // Get fields from the JSON    
    // Reserved values
    if(!element){
      element = "Empty"
    }
    // 22*010**000*C*01
    if(fieldStructure.field === "statusDescriptor" && element){
      console.log("element ", element);//C
      const code = fieldStructure[element]; 
      statusMessage = code.error;
      /*console.log("code", code); // 
      console.log("dat1 ", code.error); // Specific command reject
      console.log("dat2 ", code["01"]); // Message type only accepted while SST is In-Service*/
    }
    let result = `<p> <strong>${element}</strong> -> ${fieldStructure.description} -> ${statusMessage || ''}</p>`;
    output.innerHTML += result;
  });
}
