import { Base64DataBuffer } from "@mysten/sui.js";
import { Ed25519Keypair, JsonRpcProvider, RawSigner } from "@mysten/sui.js";
const TEST_MNEMONICS =
  "must woman material level please observe cinnamon copy metal lizard soldier alert";
// Create a keypair under Ed25519 scheme.
const keypair_ed25519 = Ed25519Keypair.deriveKeypair(
  TEST_MNEMONICS,
  "m/44'/784'/0'/0'/0'"
);
// load private key from keystore file

console.log(keypair_ed25519);



// Create a keypair under ECDSA secp256k1 scheme.
// const keypair_secp256k1 = Secp256k1Keypair.deriveKeypair(
//   TEST_MNEMONICS,
//   "m/54'/784'/0'/0/0"
// );
// Create a signer with the keypair with a provider.
const signer = new RawSigner(
  keypair_ed25519, // or use keypair_secp256k1 for ECDSA secp256k1
  new JsonRpcProvider("<https://gateway.devnet.sui.io:443>")
);
// Get the address.
const address = signer.getAddress();
console.log("address", address);
// Sign some random data.
const signData = new Base64DataBuffer(new TextEncoder().encode("hello world"));
const { signature, pubKey } = await signer.signData(signData);
console.log("signature", signature);
// Sign a typed data, i.e. a transfer object.
// const transferTxn = await signer.transferObject({
//   objectId: "0x5015b016ab570df14c87649eda918e09e5cc61e0",
//   gasBudget: 1000,
//   recipient: "0xd84058cb73bdeabe123b56632713dcd65e1a6c92",
// });
// console.log("transferTxn", transferTxn);
