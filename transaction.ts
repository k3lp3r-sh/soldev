import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const ipPubkey = process.argv[2] || null;

if (!ipPubkey) {
  console.log('Please Provide a public key to send to');
  process.exit(1);
}

const Pubkey = getKeypairFromEnvironment("SECRET_KEY");
const fromPubkey = getKeypairFromEnvironment("SECRET_KEY").publicKey;

console.log(`supplied toPubkey:  ${ipPubkey}`);

const toPubkey = new PublicKey(ipPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const transaction = new Transaction()

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: fromPubkey,
  toPubkey,
  lamports: LAMPORTS_PER_SOL * 0.69
})

transaction.add(sendSolInstruction)

const signature = await sendAndConfirmTransaction(connection, transaction, [
  Pubkey,
]);

console.log(
  `💸 Finished! Sent 0.69 SOL to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);
