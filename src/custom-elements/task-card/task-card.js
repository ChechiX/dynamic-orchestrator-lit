import { LitElement, html, css } from 'lit';

export class TaskCard extends LitElement {
  static properties = {
    task: { type: Object },
  };

  render() {
    if (!this.task) return html``;

    return html` <article>
      <div class="priority">Priority: ${this.task.priority}</div>
      <slot></slot>
    </article>`;
  }
}

customElements.define('task-card', TaskCard);
