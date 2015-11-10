import invariant from 'invariant'
import { isFSA } from 'flux-standard-action'

export default function dispatch(reactor, action) {
  invariant(
    'object' === typeof reactor,
    'dispatch(): expected reactor to be %s, got %s',
    'object',
    typeof reactor
  )

  invariant(
    isFSA(action),
    'dispatch(): expected action to be %s, got %s',
    'flux-standard-action',
    typeof action
  )

  reactor.dispatch(action.type, action.payload)
}
