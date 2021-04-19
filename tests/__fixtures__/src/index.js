function component() {
    // eslint-disable-next-line no-undef
    const element = document.createElement('div');

    element.innerHTML = `<div>Hello fancy webpack example!</div>`;

    return element;
}

// eslint-disable-next-line no-undef
document.body.appendChild(component());
