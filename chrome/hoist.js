let githubCodeOwnerHoistAppendHr = true;

const githubCodeOwnerHoistNodes = (nodes) => {
    if (nodes.length > 0 && githubCodeOwnerHoistAppendHr) {
        githubCodeOwnerHoistAppendHr = false;
        const parent = nodes[0].parentElement.parentElement.parentElement.parentElement.parentElement;
        const hr = document.createElement("hr");
        parent.prepend(hr);
    }
    for (const el of nodes.toReversed()) {
        const child = el.parentElement.parentElement.parentElement.parentElement;
        const parent = child.parentElement;
        parent.prepend(child);
    }
}


new MutationObserver((mutations) => {
    for (const mutationRecord of mutations) {
        if (mutationRecord.addedNodes.length > 0) {
            for (const addedNode of mutationRecord.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.matches('span[role="tooltip"]') && addedNode.textContent.trimStart().startsWith('Owned by you')) {
                    githubCodeOwnerHoistNodes([addedNode]);
                }
            }
        }
    }
}).observe(document.body, {childList: true, subtree: true});

githubCodeOwnerHoistNodes([...document.querySelectorAll('span[role="tooltip"]')]
    .filter(el => el.textContent.trimStart().startsWith('Owned by you')));
