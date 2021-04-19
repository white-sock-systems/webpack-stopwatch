function component() {
    // eslint-disable-next-line no-undef
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = `<div>Hello fancy webpack example!</div>`;

    return element;
}

// eslint-disable-next-line no-undef
document.body.appendChild(component());
