import { KeyAlgorithm, PrivateKey } from "casper-js-sdk";
import fs from "fs/promises";

export const getSenderKey = async (filePath: string, algo: string) => {
  const pem = await fs.readFile(filePath);
  const keyAlgo =
    algo == "ed25519" ? KeyAlgorithm.ED25519 : KeyAlgorithm.SECP256K1;
  return PrivateKey.fromPem(pem.toString(), keyAlgo);
};
