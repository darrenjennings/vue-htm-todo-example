import {
  html,
  Component,
  render
} from 'https://unpkg.com/htm/preact/standalone.mjs'
import 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      vueDoCount: 0,
      totalCount: 0,
      vueDoText: ''
    }
  }

  addTodo() {
    this.setState({ vueDoCount: this.state.vueDoCount + 1 }, () => {
      vueDo(this.state.vueDoText, increment => {
        this.setState({
          totalCount: this.state.totalCount + increment,
          vueDoCount:
            increment <= 0 ? this.state.vueDoCount - 1 : this.state.vueDoCount
        })
      }).$mount('ul')
    })
  }

  render({ page }) {
    return html`
      <div>
        <${Header} name=${`${page}'s Vuedo`} />
        <p>
          No build step, modules in the browser, preact+htm rendering little vue
          apps that maintain their own internal state.
        </p>
        <h2>
          Total Vuedos: ${this.state.vueDoCount}, Count:
          ${this.state.totalCount}
        </h2>
        <input
          type="text"
          onInput=${e => this.setState({ vueDoText: e.target.value })}
        /><br />
        <button onClick=${() => this.addTodo()}>Add Vuedo</button>
        <ul>
          ${/* vuedos go here */ ``}
        </ul>
      </div>
    `
  }
}

const vueDo = (todoNumber, updateTodos) =>
  new Vue({
    data: {
      message: `Item ${todoNumber}`,
      count: 0
    },
    methods: {
      delete() {
        this.$destroy()
        this.$el.remove()
        updateTodos(this.count * -1)
      },
      increment() {
        this.count = this.count + 1
        updateTodos(1)
      }
    },
    render(h) {
      return h('div', [
        h('label', this.message + ', count: ' + this.count),
        h(
          'button',
          {
            on: {
              click: this.increment
            }
          },
          'increment'
        ),
        h('button', { on: { click: this.delete } }, 'delete')
      ])
    }
  })

const Header = ({ name }) =>
  html`
    <h1>${name} List</h1>
  `

render(
  html`
    <${App} page="Vue+HTM" />
  `,
  document.getElementById('htm')
)
