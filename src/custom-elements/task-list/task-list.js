import { LitElement, html, css } from 'lit';

import { HasAnalytics } from '../shared/analytics-mixin';

import '../task-card/task-card';

export class TaskList extends HasAnalytics(LitElement) {
  static properties = {
    tasks: { type: Array },
  };

  constructor() {
    super();
    this.tasks = [];
  }

  render() {
    return html`<ul>
      ${this.tasks.map((task) => this._renderTemplate(task))}
    </ul>`;
  }

  _emitToggleCheck(taskId, itemId) {
    this.logInteraction('toggle-check', { taskId, itemId });
    window.dispatchEvent(
      new CustomEvent('toggle-check', { detail: { taskId, itemId } }),
    );
  }

  _renderTemplate(task) {
    switch (task.type) {
      case 'text':
        return html`
          <li>
            <task-card .task=${task}>
              <h3>${task.content.title}</h3>
              <p>${task.content.description}</p>
            </task-card>
          </li>
        `;
      case 'checklist':
        return html`
          <li>
            <task-card .task=${task}>
              <h3>${task.content.title}</h3>
              <div class="checklist">
                ${task.content.items.map(
                  (item) => html`
                    <div class="checklist-item">
                      <label>
                        <input
                          type="checkbox"
                          .checked=${item.completed}
                          @change=${() =>
                            this._emitToggleCheck(task.id, item.id)}
                        />
                        ${item.label}
                      </label>
                    </div>
                  `,
                )}
              </div>
            </task-card>
          </li>
        `;
      case 'alert':
        return html`
          <li>
            <task-card .task=${task}>
              <h3>${task.content.title}</h3>
              <p>${task.content.message}</p>
              <small>${task.content.errorCode}</small>
            </task-card>
          </li>
        `;
      default:
        return html`
          <li>
            <task-card .task=${task}>
              <p>Tipo desconocido: ${task.type}</p>
            </task-card>
          </li>
        `;
    }
  }
}

customElements.define('task-list', TaskList);
