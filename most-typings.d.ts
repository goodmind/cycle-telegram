import { TcombUpdate, TcombUpdatesState, Token } from './lib'
import { Stream } from 'most'

declare module './lib' {
  interface DriverExecution {
    token: Token
    updates: Stream<TcombUpdatesState>
    responses: Stream<any>
    events (eventName: string): Stream<TcombUpdate>
    dispose (): void
  }
}
