export function removeTones(text) {
    let newText = "";
    let newLetter = "";
    const tones = {
        "á": "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",
        "ü": "u",
        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U",
        "Ü": "U",
        "ά" : "α",
        "έ" : "ε",
        "ή" : "η",
        "ί" : "ι",
        "ό" : "ο",
        "ύ" : "υ",
        "ώ" : "ω",
        "Ά" : "Α",
        "Έ" : "Ε",
        "Ή" : "Η",
        "Ί" : "Ι",
        "Ό" : "Ο",
        "Ύ" : "Υ",
        "Ώ" : "Ω",
        "ϊ" : "ι",
        "ϋ" : "υ",
        "ΐ" : "ι",
        "ΰ" : "υ",
        "¨" : "",
        "΅" : "",
    };


    for (let letter of text) {
        newLetter = tones[letter];
        if (newLetter === undefined) {
            newText += letter;
        }
        else {
            newText += newLetter;
        }
    }

    return newText;
}
