import { assert } from 'chai'
import { Reactor, Store } from 'nuclear-js'

import mayorDispatch from '../src'


describe('dispatch', () => {
  it('throws when there is no reactor', () => {
    let reactor = new Reactor
    assert.throws(() => {
      mayorDispatch()
    }, /expected reactor to be object/)
  })

  it("throws if given is not a flux standard action", () => {
    // https://github.com/acdlite/flux-standard-action

    let fsaAction = {
      type: 'FLUX_STANDARD_ACTION',
      payload: { hello: 'world' }
    }

    let nonFsaAction = {
      hello: 'world'
    }

    let reactor = new Reactor

    assert.throws(() => mayorDispatch(reactor, nonFsaAction), /expected action to be flux-standard-action/)
    assert.doesNotThrow(() => mayorDispatch(reactor, fsaAction))
  })

  it('accepts action as object', () => {
    let reactor = new Reactor

    let store = new Store({
      getInitialState() { return false },
      initialize() { this.on('AWESOME_ACTION', handler) }
    })

    let handler = function(state, payload) {
      assert(payload.awesome === true)
    }

    reactor.registerStores({awesome: store})

    let action = {
      type: 'AWESOME_ACTION',
      payload: {
        awesome: true
      }
    }

    mayorDispatch(reactor, action)
  })
})
