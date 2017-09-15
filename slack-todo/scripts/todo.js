// Description:
//   TODO を管理することができるボットです
// Commands:
//   ./bin/hubot --adapter slack - 起動コマンド
//   koji-hubot-study todo     - TODO を作成
//   koji-hubot-study done     - TODO を完了にする
//   koji-hubot-study del      - TODO を消す
//   koji-hubot-study list     - TODO の一覧表示
//   koji-hubot-study donelist - 完了した TODO の一覧表示
//

'use strict';
const todo = require('todo');


module.exports = (robot) => {
    robot.respond(/todo (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.todo(task);
        msg.send('追加しました: ' + task);
    });
     robot.respond(/done (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send('完了にしました: ' + task);
    });
    robot.respond(/del (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send('削除しました: ' + task);
    });
    robot.respond(/list/i, (msg) => {
        msg.send(todo.list().join('\n'));
    });
    robot.respond(/donelist/i, (msg) => {
        msg.send(todo.donelist().join('\n'));
    });
};

