/* eslint env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });

      it('can delete owned task', () => {
        // finds internal task method to test in isolation
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];

        // tricks the method invocation
        const invocation = { userId };

        // Runs method with 'this' set to fake invocation
        deleteTask.apply(invocation, [taskId]);

        // Verifies method acts as expected
        assert.equal(Tasks.find().count(), 0);
      });
    });
  });
}