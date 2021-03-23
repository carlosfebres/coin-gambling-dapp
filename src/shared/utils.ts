export function formatEthersReturnMessage(message: string) {
  const errorPrefixes = [
    "VM Exception while processing transaction: revert ",
    "MetaMask Tx Signature: ",
  ];
  const errorPrefix = errorPrefixes.find((error) => message.includes(error));
  if (!errorPrefix) return message;
  const index = message.indexOf(errorPrefix);
  if (index < 0) return message;
  return message.substr(index + errorPrefix.length);
}
