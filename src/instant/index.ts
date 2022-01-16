import buildMakeInstant from "./instant";

function isFileFormatValid(fileName: string) {
    return [".png", ".jpeg", ".jpg"].some(format => fileName.includes(format))
}

const makeInstant = buildMakeInstant({ isFileFormatValid });

export default makeInstant