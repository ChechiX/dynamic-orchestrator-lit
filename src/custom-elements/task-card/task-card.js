import { LitElement, html, css } from 'lit';

export class TaskCard extends LitElement {
  static properties = {
    task: { type: Object },
  };

  render() {
    return html`<li>
      ${this.task.priority} - ${this.task.content.title} -
      ${this.task.content.description}
    </li>`;
  }
}

customElements.define('task-card', TaskCard);
