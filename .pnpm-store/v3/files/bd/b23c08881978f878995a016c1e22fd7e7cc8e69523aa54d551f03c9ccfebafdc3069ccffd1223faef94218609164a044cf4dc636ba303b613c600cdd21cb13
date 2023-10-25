export async function parseDOM(input, querySelector) {
    if (typeof DOMParser !== "undefined") {
        const doc = new DOMParser().parseFromString(input, "text/html");
        const element = doc.querySelector(querySelector);
        if (!element) {
            throw new Error("Expected elemenet");
        }
        return {
            title: doc.title,
            innerHTML: element.innerHTML,
        };
    }
    else {
        const Cheerio = await import("cheerio");
        if (!Cheerio.load)
            throw new Error("Could not parse html");
        const $ = Cheerio.load(input);
        return {
            title: $("title").text() ?? "",
            innerHTML: $("main").html() ?? "",
        };
    }
}
//# sourceMappingURL=parse-dom.js.map