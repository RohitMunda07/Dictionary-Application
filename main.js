document.querySelector("#search").addEventListener('click', () => {
    const searchBox = document.querySelector("#searchBox").value;
    if (!searchBox) {
        alert('Input Empty!!')
        return
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchBox}`
    const response = fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("fail to find!!")
            }
            return response.json()
        })
        .then((data) => {
            //  changing url
            const word = document.querySelector("#word")
            const meaning1 = document.querySelector("#meaning1")
            const meaning2 = document.querySelector("#meaning2")
            const meaning3 = document.querySelector("#meaning3")

            // Update the word display
            word.innerHTML = searchBox;

            // Clear all previous meanings
            meaning1.innerHTML = "";
            meaning2.innerHTML = "";
            meaning3.innerHTML = "";

            // Populate meanings (up to 3 definitions if available)
            const definitions = data[0]?.meanings?.[0]?.definitions || [];

            if (definitions.length === 0) {
                meaning1.innerHTML = "No definitions available for this word.";
            }
            if (definitions.length > 0) {
                meaning1.innerHTML = `1. ${definitions[0].definition || "No definition available"}`;
                // console.log(`${definitions[0].definition || "No definition available"}`);

            }
            if (definitions.length > 1) {
                meaning2.innerHTML = `2. ${definitions[1].definition || "No definition available"}`;
                // console.log(`${definitions[1].definition || "No definition available"}`);
            }
            if (definitions.length > 2) {
                meaning3.innerHTML = `3. ${definitions[2].definition || "No definition available"}`;
                // console.log(`${definitions[2].definition || "No definition available"}`);
            }
        })
        .catch((error) => {
            const wordElement = document.querySelector("#word");
            const meaning1 = document.querySelector("#meaning1");
            const meaning2 = document.querySelector("#meaning2");
            const meaning3 = document.querySelector("#meaning3");

            // Display error message
            wordElement.innerHTML = "Error!";
            meaning1.innerHTML = error.message;
            meaning2.innerHTML = "";
            meaning3.innerHTML = "";
        })
})
