export const HasAnalytics = (BaseClass) =>
  class extends BaseClass {
    logInteraction(action, detail = {}) {
      window.dispatchEvent(
        new CustomEvent('analytics-event', {
          detail: { action, ...detail },
        }),
      );
    }
  };
