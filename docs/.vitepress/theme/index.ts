import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import FigurePlate from './components/FigurePlate.vue'
import ResearchPlot from './components/ResearchPlot.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FigurePlate', FigurePlate)
    app.component('ResearchPlot', ResearchPlot)
  }
} satisfies Theme
