import { LitElement, html, css } from 'lit';

export class MyElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<p>Hello, My Element!</p>`;
  }
}

customElements.define('my-element', MyElement);
