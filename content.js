console.debug("FasterClaude: Keyboard Shortcuts loaded");

function moveCursorToEnd(editableDiv) {
    const lastParagraph = editableDiv.lastElementChild;
    if (lastParagraph) {
        const range = document.createRange();
        range.setStartAfter(lastParagraph);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

document.addEventListener('keydown', function (e) {
    // Cmd + L to focus the editable div
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        const editableDiv = document.querySelector('div.ProseMirror[contenteditable="true"]');
        if (editableDiv) {
            moveCursorToEnd(editableDiv);
        }
    }

    // Cmd + Shift + L to copy selected text to the editable div
    if (e.metaKey && e.shiftKey && e.key === 'l') {
        e.preventDefault();
        const selectedText = window.getSelection().toString();
        const editableDiv = document.querySelector('div.ProseMirror[contenteditable="true"]');
        if (editableDiv && selectedText) {
            // add a paragraph node to the editable div
            const paragraphs = editableDiv.querySelectorAll('p');
            if (paragraphs.length === 1 && paragraphs[0].innerHTML === '<br class="ProseMirror-trailingBreak">') {
                // Replace the existing paragraph
                paragraphs[0].textContent = selectedText;
            } else {
                // Add a new paragraph
                const paragraph = document.createElement('p');
                paragraph.textContent = selectedText;
                editableDiv.appendChild(paragraph);
            }

            // Focus on the textarea
            moveCursorToEnd(editableDiv);
            editableDiv.focus();
        }
    }

    // Ctrl + N to click the new chat button
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        // Using multiple classes to ensure uniqueness
        const newChatButton = document.querySelector('button[class*="bg-accent-main-100"][class*="rounded-full"] svg');
        if (newChatButton) {
            newChatButton.closest('button').click();
        }
    }
});