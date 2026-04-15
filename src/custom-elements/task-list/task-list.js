import { LitElement, html, css } from 'lit';

import '../task-card/task-card';

export class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array },
  };

  constructor() {
    super();
    this.tasks = [];
  }

  render() {
    return html`<ul>
      ${this.tasks.map((task) => html`<task-card .task=${task}></task-card>`)}
    </ul>`;
  }
}

customElements.define('task-list', TaskList);
