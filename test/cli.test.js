'use strict'

const tape = require('tape')
const test = require('tape-promise').default(tape)
const { getOptions } = require('../lib/cli')

test('passing no arguments should fail', t => {
  t.plan(1)
  t.rejects(getOptions([]))
})

test('--github-token is required on github-issue', t => {
  t.plan(1)
  getOptions([
    '--npm-token=token1',
    '--notifier=github-issue'
  ]).then(t.fail, err =>
    t.ok(err.output.match(/--github-token is required with `github-issue` notifier/))
  )
})

test('passing all arguments should succeed', async t => {
  const args = await getOptions([
    '--npm-user=user',
    '--npm-token=token1',
    '--github-token=token2',
    '--version-url=httpsurl',
    '--notifier=console',
    '--actor=me',
    '--release-team=team'
  ])
  t.equal(args.npmUser, 'user')
  t.equal(args.npmToken, 'token1')
  t.equal(args.githubToken, 'token2')
  t.equal(args.versionUrl, 'httpsurl')
  t.equal(args.notifier, 'console')
  t.equal(args.actor, 'me')
  t.equal(args.releaseTeam, 'team')
})

test('passing invalid arguments to notifier should fail', t => {
  t.plan(1)
  t.rejects(getOptions([
    '--npm-user=user',
    '--npm-token=token1',
    '--github-token=token2',
    '--version-url=httpsurl',
    '--notifier=invalid'
  ]))
})
