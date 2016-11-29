import { TcombUpdate, TcombUpdatesState, Token } from './lib'
import { Stream } from 'most'
import { ComponentSinks, ComponentSources } from './lib/plugins'

declare module './lib' {
  interface DriverExecution {
    token: Token
    updates: Stream<TcombUpdatesState>
    responses: Stream<any>
    events (eventName: string): Stream<TcombUpdate>
    dispose (): void
  }
}

declare module './lib/plugins' {
  interface PluginsExecution {
    matchWith (this: Stream<TcombUpdate>,
               plugins: Plugin[],
               sources: ComponentSources,
               {dupe, sourceName}?: {dupe?: boolean, sourceName?: string}): Stream<ComponentSinks>

    matchStream (sourceObservable: Stream<TcombUpdate>,
                 ...args: any[]): Stream<ComponentSinks>
  }

  interface matchWith {
    (this: Stream<TcombUpdate>,
     plugins: Plugin[],
     sources: ComponentSources,
     {dupe, sourceName}?: {dupe?: boolean, sourceName?: string}): Stream<ComponentSinks> }

  interface matchStream {
    (sourceObservable: Stream<TcombUpdate>,
     ...args: any[]): Stream<ComponentSinks> }
}
