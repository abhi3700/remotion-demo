# Voiceover script (66 seconds)

| Time | Narration |
|---|---|
| 0–9s | Imagine proving you know a secret, without ever revealing what that secret is. That's the idea behind a zero-knowledge proof. |
| 9–21s | Alice is the prover. Bob is the verifier. Alice wants Bob to trust that her claim is true, but she doesn't want to hand over her private information. Instead, she sends a proof. |
| 21–32s | There are four pieces: the statement, or claim; the witness, which is private; the proof Alice creates; and the verifier, which checks that proof. |
| 32–44s | A proving system uses the private witness and public statement to create a proof that the circuit's constraints hold. Bob checks the proof using public inputs, without learning the witness. |
| 44–58s | ZK proofs power rollup verification, privacy-preserving identity, and applications that validate sensitive data without revealing it. Not every ZK application is private by default. |
| 58–66s | The key idea: prove correctness. Reveal nothing else beyond what the statement and public inputs disclose. |

**Implementation:** Narration is included as six clips under `public/voiceover/` and starts at the timestamps above. Regenerate the clips with `bash scripts/generate-voiceover.sh`.
