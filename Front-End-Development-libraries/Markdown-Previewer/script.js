const { useState, useEffect } = React;

function App() {
  const defaultMarkdown = `
# Welcome to the Markdown Previewer!
## This is a sub-heading...
[Google](https://www.google.com)
\`Inline code\`
\`\`\`
Code block here
\`\`\`
- List item 1
- List item 2
> Blockquote
![Image](https://via.placeholder.com/150)
**Bold text!**
`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleEditorChange = (e) => {
    setMarkdown(e.target.value);
  };

  useEffect(() => {
    const previewElement = document.getElementById('preview');
    previewElement.innerHTML = marked.parse(markdown); // use .parse()
  }, [markdown]);

  return (
    <div className="markdown-previewer">
      <div className="editor-container">
        <h3>Editor</h3>
        <textarea
          id="editor"
          rows="10"
          value={markdown}
          onChange={handleEditorChange}
        />
      </div>
      <div className="preview-container">
        <h3>Preview</h3>
        <div id="preview"></div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
