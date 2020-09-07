use sodiumoxide::crypto::pwhash::argon2id13;

// Returns a string version of the hash generated for passwd. Removes null byte chars.
pub fn hash(passwd: &str) -> String {
    sodiumoxide::init().unwrap();
    let hash = argon2id13::pwhash(
        passwd.as_bytes(),
        argon2id13::OPSLIMIT_INTERACTIVE,
        argon2id13::MEMLIMIT_INTERACTIVE,
    )
    .unwrap();
    std::str::from_utf8(&hash.0)
        .unwrap()
        .trim_end_matches('\u{0}')
        .to_string()
}

// Verifies the binary representation of a hash against a password.
fn verify_u8(hash: [u8; 128], passwd: &str) -> bool {
    sodiumoxide::init().unwrap();
    match argon2id13::HashedPassword::from_slice(&hash) {
        Some(hp) => argon2id13::pwhash_verify(&hp, passwd.as_bytes()),
        _ => false,
    }
}

// Adds null byte chars to hashed_psw before verifying it against passwd.
pub fn verify(hashed_psw: &str, passwd: &str) -> bool {
    let mut padded = [0u8; 128];
    hashed_psw
        .to_string()
        .as_bytes()
        .iter()
        .enumerate()
        .for_each(|(i, val)| {
            padded[i] = val.clone();
        });
    verify_u8(padded, passwd)
}
