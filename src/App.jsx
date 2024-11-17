import Page from "~/components/structure/Page";
import { useCallback, useMemo, useState } from "react";

import "./style.scss";

const methods = {
  none: "none",
  encode: "encode",
  decode: "decode",
};

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function App() {
  const [rawPhrase, setRawPhrase] = useState("");
  const [rawPassphrase, setRawPassphrase] = useState("");
  const [method, setMethod] = useState(methods.none);
  const phrase = useMemo(() => rawPhrase.toLowerCase(), [rawPhrase]);
  const passphrase = useMemo(
    () => rawPassphrase.toLowerCase().match(/[a-z]/g)?.join("") || "",
    [rawPassphrase]
  );

  const encoded = useMemo(() => {
    if (!phrase || !passphrase)
      return "Phrase and passphrase required to encode.";
    return phrase
      .split("")
      .map((letter, index) =>
        alphabet.includes(letter)
          ? alphabet[
              (alphabet.indexOf(letter) +
                1 +
                alphabet.indexOf(passphrase[index % passphrase.length]) +
                1) %
                alphabet.length
            ]
          : letter
      )
      .join("");
  }, [passphrase, phrase]);

  const decoded = useMemo(() => {
    if (!phrase || !passphrase)
      return "Phrase and passphrase required to decode.";
    return phrase
      .split("")
      .map((letter, index) =>
        alphabet.includes(letter)
          ? alphabet[
              ((alphabet.indexOf(letter) -
                alphabet.indexOf(passphrase[index % passphrase.length]) -
                1 +
                alphabet.length) %
                alphabet.length) -
                1
            ]
          : letter
      )
      .join("");
  }, [passphrase, phrase]);

  const handleUpdateMethod = useCallback((newMethod) => {
    return () => setMethod(newMethod);
  }, []);

  return (
    <Page name="Encypherable">
      <p>
        Look, I&apos;m gonna be real with you: I forgot what kind of cipher this
        is. I was looking over my Google Sheets projects and found this one
        lurking in the background. Before I delete it, I figured I&apos;d make
        this site to do the same thing.
      </p>
      <p>I think it&apos;s a Vignette cipher?</p>
      <p>
        Enter the phrase you&apos;d like to encode, along with the passphrase,
        then hit either encode or decode.
      </p>
      <label>
        Phrase
        <input
          type="text"
          placeholder="Phrase to encode/decode."
          value={rawPhrase}
          onChange={(e) => setRawPhrase(e.currentTarget.value)}
        />
      </label>
      <label>
        Passphrase
        <input
          type="text"
          placeholder="The key to encode/decode with."
          value={rawPassphrase}
          onChange={(e) => setRawPassphrase(e.currentTarget.value)}
        />
      </label>
      <div role="group">
        <button onClick={handleUpdateMethod(methods.encode)}>Encode</button>
        <button
          onClick={handleUpdateMethod(methods.decode)}
          className="secondary"
        >
          Decode
        </button>
      </div>
      {method === methods.decode && (
        <label>
          Decode Results
          <input readOnly value={decoded} />
        </label>
      )}
      {method === methods.encode && (
        <label>
          Encode Results
          <input readOnly value={encoded} />
        </label>
      )}
    </Page>
  );
}

export default App;
