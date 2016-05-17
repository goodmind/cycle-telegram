import {
  UpdateMessage,
  UpdateInlineQuery,
  Update
} from 'cycle-telegram'

import About from './plugins/about'
import CycleJS from './plugins/cycle'

export let plugins = [
  {
    type: UpdateMessage,
    name: 'about',
    path: /\/(about)(?:@yourbot)?(\s+(.+))?/,
    component: About},
  {
    type: UpdateMessage,
    name: 'help',
    path: /\/(help)(?:@yourbot)?(\s+(.+))?/,
    component: About},
  {
    type: UpdateMessage,
    name: 'start',
    path: /\/(start)(?:@yourbot)?(\s+(.+))?/,
    component: About},
  {
    type: UpdateInlineQuery,
    name: 'cyclejs',
    path: /inline query example/,
    component: CycleJS},
  {
    type: Update,
    name: 'not-found',
    path: /(?:[\s\S]*)/,
    component: () => {}}
]
