const btn = document.getElementById("Translatebtn");

async function transatetext() {
    const inputtext = document.getElementById("inputText").value.trim();
    const sourcelng = document.getElementById("srclanguage").value.toLowerCase();
    const targetlng = document.getElementById("TergetLanguage").value.toLowerCase();
    const resultbox = document.getElementById("translatedText");

    if (inputtext === "") {
        resultbox.innerHTML = "Enter Text.";
        return;
    }

    try {
        resultbox.innerHTML = "Translating...";

        const res = await fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: inputtext,
                source: sourcelng,
                target: targetlng,
                format: "text"
            })
        });

        const data = await res.json();
        resultbox.innerHTML = data.translatedText || "No translation found.";
    } catch (error) {
        resultbox.innerText = "Error: Unable to translate.";
        console.error(error);
    }
}

btn.addEventListener("click", transatetext);
