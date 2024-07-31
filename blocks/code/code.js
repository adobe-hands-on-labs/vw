export default async function decorate(block) {
  // fetch aside content
  const classList = block.className.split(" ");
  const languageClass = classList.find((cls) => cls.startsWith("language-"));

  if (languageClass) {
    // Find the <pre> and <code> elements within the block
    const preElement = block.querySelector("pre");
    const codeElement = block.querySelector("code");

    if (preElement && codeElement) {
      // Apply the language class to the <pre> and <code> elements
      preElement.classList.add(languageClass);
      codeElement.classList.add(languageClass);

      Prism.highlightElement(codeElement);
    }
  }
}

// Prism JS for styling the code
