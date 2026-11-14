const fs = require('fs');
const assert = require('assert');
const YAML = require('../../frontend/node_modules/yaml');
const root = '.github/workflows/';
const docs = {};
for (const file of fs.readdirSync(root)) {
  docs[file] = YAML.parse(fs.readFileSync(root + file, 'utf8'));
  assert(docs[file].on && docs[file].jobs, file);
}
assert.deepEqual(docs['release.yml'].jobs.staging.needs, ['frontend', 'backend']);
assert.equal(docs['release.yml'].jobs.production.needs, 'staging');
assert.equal(docs['deploy.yml'].jobs.deploy.environment, '${{ inputs.environment }}');
for (const part of ['frontend', 'backend']) {
  const workflow = docs[part + '.yml'];
  assert(workflow.on.workflow_call !== undefined);
  const publish = workflow.jobs['publish-' + part];
  assert.equal(publish.needs, part);
  assert(publish.if.includes("github.ref == 'refs/heads/main'"));
  assert(publish.steps.some(s => s.with?.tags?.includes('value=${{ github.sha }}')));
}
const compose = YAML.parse(fs.readFileSync('deploy/compose.yml', 'utf8'), {merge: true});
assert.equal(Object.keys(compose.services).length, 9);
for (const service of Object.values(compose.services)) assert(service.healthcheck);
for (const [name, service] of Object.entries(compose.services)) {
 if(name !== 'frontend') assert(!service.ports, name);
}
console.log('PASS: workflow gates, immutable tags, environment selection, Compose healthchecks and private ports');
